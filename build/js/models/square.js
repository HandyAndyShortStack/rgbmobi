// Generated by CoffeeScript 1.9.0
(function() {
  LCM.square = function() {
    var key, primes;
    primes = {
      2: 0,
      3: 0,
      5: 0
    };
    for (key in primes) {
      primes[key] = Math.round(Math.random() * 4);
    }
    return {
      primes: primes
    };
  };

}).call(this);