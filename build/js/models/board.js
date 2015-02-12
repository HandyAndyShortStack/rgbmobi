// Generated by CoffeeScript 1.9.0
(function() {
  LCM.board = function() {
    var i;
    return {
      squares: (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; _i <= 9; i = ++_i) {
          _results.push(LCM.square());
        }
        return _results;
      })(),
      rows: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]],
      lcm: function() {
        var exponent, prime, primes, square, value, _i, _len, _ref, _ref1;
        primes = {};
        _ref = this.squares;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          square = _ref[_i];
          _ref1 = square.primes;
          for (prime in _ref1) {
            exponent = _ref1[prime];
            if (!primes[prime] || exponent > primes[prime]) {
              primes[prime] = exponent;
            }
          }
        }
        value = Object.keys(primes).reduce((function(accum, current) {
          return Math.pow(parseInt(current), primes[current]) * accum;
        }), 1);
        return {
          value: value,
          factorization: primes
        };
      },
      cancels: function() {
        var allPrimes, key, lowest, prime, report, result, row, square, squares, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        result = [];
        allPrimes = (function() {
          var _i, _len, _ref, _results;
          _ref = Object.keys(this.squares[0].primes);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            _results.push(parseInt(key));
          }
          return _results;
        }).call(this);
        _ref = this.rows;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          report = {
            row: row,
            primes: {}
          };
          squares = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
              i = row[_j];
              _results.push(this.squares[i]);
            }
            return _results;
          }).call(this);
          for (_j = 0, _len1 = allPrimes.length; _j < _len1; _j++) {
            prime = allPrimes[_j];
            lowest = squares[0].primes[prime];
            _ref1 = squares.slice(1);
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              square = _ref1[_k];
              if (square.primes[prime] < lowest) {
                lowest = square.primes[prime];
              }
            }
            if (lowest > 0) {
              report.primes[prime] = lowest;
            }
          }
          if (Object.keys(report.primes).length > 0) {
            result.push(report);
          }
        }
        return result;
      },
      rotate: function(direction) {
        var newIndicies;
        if (direction === 'cw') {
          newIndicies = [3, 0, 1, 6, 4, 2, 7, 8, 5];
        } else if (direction === 'ccw') {
          newIndicies = [1, 2, 5, 0, 4, 8, 3, 6, 7];
        } else {
          return;
        }
        return this.squares = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = newIndicies.length; _i < _len; _i++) {
            i = newIndicies[_i];
            _results.push(this.squares[i]);
          }
          return _results;
        }).call(this);
      }
    };
  };

}).call(this);
