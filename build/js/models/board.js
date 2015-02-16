// Generated by CoffeeScript 1.9.0
(function() {
  var shuffleArray;

  RGB.board = function() {
    var color, colors, columns, rows;
    colors = ['red', 'red', 'red', 'green', 'green', 'green', 'blue', 'blue', 'blue'];
    colors = shuffleArray(colors);
    rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    columns = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    return {
      squares: (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = colors.length; _i < _len; _i++) {
          color = colors[_i];
          _results.push(RGB.square(color));
        }
        return _results;
      })(),
      rotate: function(direction) {
        var i, newIndicies;
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
      },
      shift: function(direction) {
        var i, newIndicies;
        if (direction === 'right') {
          newIndicies = [2, 0, 1, 5, 3, 4, 8, 6, 7];
        } else if (direction === 'down') {
          newIndicies = [6, 7, 8, 0, 1, 2, 3, 4, 5];
        } else if (direction === 'left') {
          newIndicies = [1, 2, 0, 4, 5, 3, 7, 8, 6];
        } else if (direction === 'up') {
          newIndicies = [3, 4, 5, 6, 7, 8, 0, 1, 2];
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
      },
      isSolved: function() {
        var column, columnsSolved, row, rowsSolved, _i, _j, _len, _len1, _ref, _ref1;
        rowsSolved = true;
        columnsSolved = true;
        for (_i = 0, _len = rows.length; _i < _len; _i++) {
          row = rows[_i];
          if (rowsSolved) {
            rowsSolved = (this.squares[row[0]].color === (_ref = this.squares[row[1]].color) && _ref === this.squares[row[2]].color);
          }
        }
        for (_j = 0, _len1 = columns.length; _j < _len1; _j++) {
          column = columns[_j];
          if (columnsSolved) {
            columnsSolved = (this.squares[column[0]].color === (_ref1 = this.squares[column[1]].color) && _ref1 === this.squares[column[2]].color);
          }
        }
        return rowsSolved || columnsSolved;
      }
    };
  };

  shuffleArray = function(array) {
    var i, j, temp;
    i = array.length - 1;
    while (i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i--;
    }
    return array;
  };

}).call(this);
