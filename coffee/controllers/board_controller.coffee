LCM.controller 'BoardController', ($scope) ->
  animationInProgress = false
  board = $scope.board = LCM.board()
  
  $scope.o =
    1:1
    2:2
    3:3

  applyCancellations = $scope.applyCancellations = ->
    cancels = board.cancels()
    while cancels.length > 0
      cancel = cancels[0]
      for i in cancel.row
        for k, v of cancel.primes
          board.squares[i].primes[k] -= v
      cancels = board.cancels()
  applyCancellations()

  rotate = $scope.rotote = (direction) ->
    if direction is 'cw'
      squareDirections = {right: [0, 1], down: [2, 5], left: [7, 8], up: [3, 6]}
    else if direction is 'ccw'
      squareDirections = {right: [6, 7], down: [0, 3], left: [1, 2], up: [5, 8]}
    else
      return

    startTime = null
    initialValue = 0
    change = 100
    duration = 600
    step = (timeStamp) ->
      animationInProgress = true
      startTime = timeStamp unless startTime
      progress = timeStamp - startTime
      value = easeInOutQuad progress, initialValue, change, duration
      updateSquarePositions value
      if progress < duration
        requestAnimationFrame(step)
      else
        updateSquarePositions 100
        animationInProgress = false
        board.rotate direction
        applyCancellations()
        $scope.$apply()
        $('.outer-square').css 'transform', ''
    updateSquarePositions = (value) ->
      for i in squareDirections.right
        squareEl = $('.outer-square')[i]
        $(squareEl).css 'transform', "translateX(#{value}%)"
      for i in squareDirections.down
        squareEl = $('.outer-square')[i]
        $(squareEl).css 'transform', "translateY(#{value}%)"
      for i in squareDirections.left
        squareEl = $('.outer-square')[i]
        $(squareEl).css 'transform', "translateX(-#{value}%)"
      for i in squareDirections.up
        squareEl = $('.outer-square')[i]
        $(squareEl).css 'transform', "translateY(-#{value}%)"

    requestAnimationFrame step

  $ ->
    Hammer($('.board')[0])
        .on 'swiperight', (event) -> swipe(event)
        .on 'swipedown', (event) -> swipe(event)
        .on 'swipeleft', (event) -> swipe(event)
        .on 'swipeup', (event) -> swipe(event)
        .get('swipe').set({direction: Hammer.DIRECTION_ALL})
  
  swipe = (event) ->
    bigSquare = $(event.target).parents('.outer-square')[0]
    squareIndex = $('.outer-square').index(bigSquare)
    if event.type is 'swiperight'
      rotate 'cw' if squareIndex in [0, 1, 2]
      rotate 'ccw' if squareIndex in [6, 7, 8]
    if event.type is 'swipedown'
      rotate 'cw' if squareIndex in [2, 5, 8]
      rotate 'ccw' if squareIndex in [0, 3, 6]
    if event.type is 'swipeleft'
      rotate 'cw' if squareIndex in [6, 7, 8]
      rotate 'ccw' if squareIndex in [0, 1, 2]
    if event.type is 'swipeup'
      rotate 'cw' if squareIndex in [0, 3, 6]
      rotate 'ccw' if squareIndex in [2, 5, 8]

easeInOutQuad = (t, b, c, d) ->
  if (t /= d / 2) < 1
    return c / 2 * t * t + b
  -c / 2 * (--t * (t - 2) - 1) + b
