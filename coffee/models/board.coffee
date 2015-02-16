LCM.board = ->
  colors = ['red', 'red', 'red', 'green', 'green', 'green', 'blue', 'blue', 'blue']
  colors = shuffleArray colors

  squares: (LCM.square(color) for color in colors)

  rotate: (direction) ->
    if direction is 'cw'
      newIndicies = [3, 0, 1, 6, 4, 2, 7, 8, 5]
    else if direction is 'ccw'
      newIndicies = [1, 2, 5, 0, 4, 8, 3, 6, 7]
    else
      return
    @squares = (@squares[i] for i in newIndicies)

  shift: (direction) ->
    if direction is 'right'
      newIndicies = [2, 0, 1, 5, 3, 4, 8, 6, 7]
    else if direction is 'down'
      newIndicies = [6, 7, 8, 0, 1, 2, 3, 4, 5]
    else if direction is 'left'
      newIndicies = [1, 2, 0, 4, 5, 3, 7, 8, 6]
    else if direction is 'up'
      newIndicies = [3, 4, 5, 6, 7, 8, 0, 1, 2]
    else
      return
    @squares = (@squares[i] for i in newIndicies)

shuffleArray = (array) ->
  i = array.length - 1
  while i > 0
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
    i--
  array
