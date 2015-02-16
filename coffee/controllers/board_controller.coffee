LCM.controller 'BoardController', ($scope) ->
  animationInProgress = false
  board = $scope.board = LCM.board()

  rotate = $scope.rotote = (direction) ->
    return if animationInProgress
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
        board.rotate direction
        $scope.$apply()
        $('.outer-square').css 'transform', ''
        animationInProgress = false
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

  shift = $scope.shift = (direction) ->
    return if animationInProgress
    if direction is 'right'
      endSquareIndicies = [2, 5, 8]
      otherSquareIndicies = [0, 1, 3, 4, 6, 7]
      translatePrefix = 'X('
      endTranslatePrefix = 'X(-'
    else if direction is 'down'
      endSquareIndicies = [6, 7, 8]
      otherSquareIndicies = [0, 1, 2, 3, 4, 5]
      translatePrefix = 'Y('
      endTranslatePrefix = 'Y(-'
    else if direction is 'left'
      endSquareIndicies = [0, 3, 6]
      otherSquareIndicies = [1, 2, 4, 5, 7, 8]
      translatePrefix = 'X(-'
      endTranslatePrefix = 'X('
    else if direction is 'up'
      endSquareIndicies = [0, 1, 2]
      otherSquareIndicies = [3, 4, 5, 6, 7, 8]
      translatePrefix = 'Y(-'
      endTranslatePrefix = 'Y('
    else
      return

    allSquares = $('.outer-square')
    endSquares = $(allSquares[i] for i in endSquareIndicies)
    otherSquares = $(allSquares[i] for i in otherSquareIndicies)
    
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
        board.shift direction
        $scope.$apply()
        allSquares.css 'transform', ''
        allSquares.css 'z-index', 1
        animationInProgress = false
    updateSquarePositions = (value) ->
      endSquares.css 'transform', "translate#{endTranslatePrefix}#{value * 2}%)"
      otherSquares.css 'transform', "translate#{translatePrefix}#{value}%)"
    
    endSquares.css 'z-index', -1
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
      shift 'right' if squareIndex in [3, 4, 5]
    if event.type is 'swipedown'
      rotate 'cw' if squareIndex in [2, 5, 8]
      rotate 'ccw' if squareIndex in [0, 3, 6]
      shift 'down' if squareIndex in [1, 4, 7]
    if event.type is 'swipeleft'
      rotate 'cw' if squareIndex in [6, 7, 8]
      rotate 'ccw' if squareIndex in [0, 1, 2]
      shift 'left' if squareIndex in [3, 4, 5]
    if event.type is 'swipeup'
      rotate 'cw' if squareIndex in [0, 3, 6]
      rotate 'ccw' if squareIndex in [2, 5, 8]
      shift 'up' if squareIndex in [1, 4, 7]

easeInOutQuad = (t, b, c, d) ->
  if (t /= d / 2) < 1
    return c / 2 * t * t + b
  -c / 2 * (--t * (t - 2) - 1) + b
