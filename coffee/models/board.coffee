square = LCM.square

LCM.board = ->
  squares: (square() for i in [1..9])
  factorization: {}
  lcm: ->
    primes = {}
    for _square in @squares
      for prime, exponent of _square.primes
        if !primes[prime] or exponent > primes[prime]
          primes[prime] = exponent
    @factorization = primes unless _.isEqual(primes, @factorization)
    window.thing = this
    Object.keys(primes).reduce ((accum, current) ->
      parseInt(current) ** primes[current] * accum
    ), 1

