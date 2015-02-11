LCM.board = ->
  squares: (LCM.square() for i in [1..9])
  rows: [
    [0, 1, 2]
    [3, 4, 5]
    [6, 7, 8]
    [0, 3, 6]
    [1, 4, 7]
    [2, 5, 8]
    [0, 4, 8]
    [6, 4, 2]
  ]
  lcm: ->
    primes = {}
    for square in @squares
      for prime, exponent of square.primes
        if !primes[prime] or exponent > primes[prime]
          primes[prime] = exponent
    value = Object.keys(primes).reduce ((accum, current) ->
      parseInt(current) ** primes[current] * accum
    ), 1
    {value: value, factorization: primes}
  cancels: ->
    result = []
    allPrimes = (parseInt(key) for key in Object.keys(@squares[0].primes))
    for row in @rows
      report = {row: row, primes: {}}
      squares = (@squares[i] for i in row)
      for prime in allPrimes
        lowest = squares[0].primes[prime]
        for square in squares[1..]
          lowest = square.primes[prime] if square.primes[prime] < lowest
        report.primes[prime] = lowest if lowest > 0
      if Object.keys(report.primes).length > 0
        result.push(report)
    result
        
