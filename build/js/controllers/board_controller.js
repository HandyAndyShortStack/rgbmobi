// Generated by CoffeeScript 1.9.0
(function() {
  var easeInOutQuad;

  LCM.controller('BoardController', function($scope) {
    var animationInProgress, applyCancellations, board, rotate, swipe;
    animationInProgress = false;
    board = $scope.board = LCM.board();
    $scope.o = {
      1: 1,
      2: 2,
      3: 3
    };
    applyCancellations = $scope.applyCancellations = function() {
      var cancel, cancels, i, k, v, _i, _len, _ref, _ref1, _results;
      cancels = board.cancels();
      _results = [];
      while (cancels.length > 0) {
        cancel = cancels[0];
        _ref = cancel.row;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          _ref1 = cancel.primes;
          for (k in _ref1) {
            v = _ref1[k];
            board.squares[i].primes[k] -= v;
          }
        }
        _results.push(cancels = board.cancels());
      }
      return _results;
    };
    applyCancellations();
    rotate = $scope.rotote = function(direction) {
      var change, duration, initialValue, squareDirections, startTime, step, updateSquarePositions;
      if (direction === 'cw') {
        squareDirections = {
          right: [0, 1],
          down: [2, 5],
          left: [7, 8],
          up: [3, 6]
        };
      } else if (direction === 'ccw') {
        squareDirections = {
          right: [6, 7],
          down: [0, 3],
          left: [1, 2],
          up: [5, 8]
        };
      } else {
        return;
      }
      startTime = null;
      initialValue = 0;
      change = 100;
      duration = 600;
      step = function(timeStamp) {
        var progress, value;
        animationInProgress = true;
        if (!startTime) {
          startTime = timeStamp;
        }
        progress = timeStamp - startTime;
        value = easeInOutQuad(progress, initialValue, change, duration);
        updateSquarePositions(value);
        if (progress < duration) {
          return requestAnimationFrame(step);
        } else {
          updateSquarePositions(100);
          animationInProgress = false;
          board.rotate(direction);
          applyCancellations();
          $scope.$apply();
          return $('.outer-square').css('transform', '');
        }
      };
      updateSquarePositions = function(value) {
        var i, squareEl, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _results;
        _ref = squareDirections.right;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          squareEl = $('.outer-square')[i];
          $(squareEl).css('transform', "translateX(" + value + "%)");
        }
        _ref1 = squareDirections.down;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          i = _ref1[_j];
          squareEl = $('.outer-square')[i];
          $(squareEl).css('transform', "translateY(" + value + "%)");
        }
        _ref2 = squareDirections.left;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          i = _ref2[_k];
          squareEl = $('.outer-square')[i];
          $(squareEl).css('transform', "translateX(-" + value + "%)");
        }
        _ref3 = squareDirections.up;
        _results = [];
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          i = _ref3[_l];
          squareEl = $('.outer-square')[i];
          _results.push($(squareEl).css('transform', "translateY(-" + value + "%)"));
        }
        return _results;
      };
      return requestAnimationFrame(step);
    };
    $(function() {
      return Hammer($('.board')[0]).on('swiperight', function(event) {
        return swipe(event);
      }).on('swipedown', function(event) {
        return swipe(event);
      }).on('swipeleft', function(event) {
        return swipe(event);
      }).on('swipeup', function(event) {
        return swipe(event);
      }).get('swipe').set({
        direction: Hammer.DIRECTION_ALL
      });
    });
    return swipe = function(event) {
      var bigSquare, squareIndex;
      bigSquare = $(event.target).parents('.outer-square')[0];
      squareIndex = $('.outer-square').index(bigSquare);
      if (event.type === 'swiperight') {
        if (squareIndex === 0 || squareIndex === 1 || squareIndex === 2) {
          rotate('cw');
        }
        if (squareIndex === 6 || squareIndex === 7 || squareIndex === 8) {
          rotate('ccw');
        }
      }
      if (event.type === 'swipedown') {
        if (squareIndex === 2 || squareIndex === 5 || squareIndex === 8) {
          rotate('cw');
        }
        if (squareIndex === 0 || squareIndex === 3 || squareIndex === 6) {
          rotate('ccw');
        }
      }
      if (event.type === 'swipeleft') {
        if (squareIndex === 6 || squareIndex === 7 || squareIndex === 8) {
          rotate('cw');
        }
        if (squareIndex === 0 || squareIndex === 1 || squareIndex === 2) {
          rotate('ccw');
        }
      }
      if (event.type === 'swipeup') {
        if (squareIndex === 0 || squareIndex === 3 || squareIndex === 6) {
          rotate('cw');
        }
        if (squareIndex === 2 || squareIndex === 5 || squareIndex === 8) {
          return rotate('ccw');
        }
      }
    };
  });

  easeInOutQuad = function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t + b;
    }
    return -c / 2 * (--t * (t - 2) - 1) + b;
  };

}).call(this);
