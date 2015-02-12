LCM.controller 'BoardController', ($scope) ->
  
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
