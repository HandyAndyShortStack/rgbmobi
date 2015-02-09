LCM.square = ->
  primes =
    2: 0
    3: 0
    5: 0
  primes[key] = Math.round(Math.random() * 4) for key of primes

  primes: primes
