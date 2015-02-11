// Generated by CoffeeScript 1.9.0
(function() {
  var square;

  square = LCM.square;

  LCM.board = function() {
    var i;
    return {
      squares: (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; _i <= 9; i = ++_i) {
          _results.push(square());
        }
        return _results;
      })(),
      lcm: function() {
        var exponent, prime, primes, value, _i, _len, _ref, _ref1, _square;
        primes = {};
        _ref = this.squares;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          _square = _ref[_i];
          _ref1 = _square.primes;
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
      }
    };
  };

}).call(this);
