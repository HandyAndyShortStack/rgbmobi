square = LCM.square

LCM.board = ->
  squares: (square() for i in [1..9])
  rows: [
    [0, 1, 2]
    [3, 4, 5]
    [6, 7, 8]
    [0, 3, 6]
    [1, 4, 7]
    [2, 5, 8]
    [0, 4, 8]
    [6, 4, 7]
  ]
  lcm: ->
    primes = {}
    for _square in @squares
      for prime, exponent of _square.primes
        if !primes[prime] or exponent > primes[prime]
          primes[prime] = exponent
    value = Object.keys(primes).reduce ((accum, current) ->
      parseInt(current) ** primes[current] * accum
    ), 1
    {value: value, factorization: primes}
