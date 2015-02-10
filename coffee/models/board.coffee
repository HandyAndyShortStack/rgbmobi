square = LCM.square

LCM.board = ->
  squares: (square() for i in [1..9])
  lcm: ->
    primes = Object.create(null)
    for _square in this.squares
      for prime, exponent of _square.primes
        if !primes[prime] or exponent > primes[prime]
          primes[prime] = exponent
    Object.keys(primes).reduce ((accum, current) ->
      parseInt(current) ** primes[current] * accum
    ), 1
