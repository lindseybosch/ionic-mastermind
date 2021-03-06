angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal) {

  // These icon classes are for mapping the selected guesses to the UI
  $scope.icons = ['ion-social-apple', 'ion-social-android','ion-social-angular','ion-social-html5'];

  // The current selected icon to assign to any clicked position.
  // TODO: Needs to be set when buttons in menu.html are clicked.
  $scope.selectedIcon = 0;
  $scope.turns = 1;
  $scope.solution = [];
  $scope.guesses = [];
  $scope.score = [];


  // Initialize game state
  $scope.newGame = function() {
    // TODO: Set all data properties/structures to their beginning state
    var placeOne = Math.floor(Math.random() * 4);
    var placeTwo = Math.floor(Math.random() * 4);
    var placeThree = Math.floor(Math.random() * 4);
    var placeFour = Math.floor(Math.random() * 4);
    $scope.solution = [placeOne, placeTwo, placeThree, placeFour];
    $scope.turns = 1;
    $scope.guesses = [[1,1,1,1]];
    $scope.score = [[]];
    console.log($scope.solution);
  };

  // Run newGame() upon loading
  $scope.newGame();
  $scope.changeIcon = function(val){
    $scope.selectedIcon = val;
    console.log($scope.selectedIcon);
  }

  /*
  TODO: Call this function when the user clicks a 'score' button.
        The 'score' button should remain disabled until all positions have a value.
        Maybe a button with an icon of a checkmark would be a good UI choice? Or,
        just use a small button with text of 'Score'?
  */
  $scope.scoreTurn = function() {
// $scope.solution = [1,3,0,1];
// $scope.guess    = [0,1,0,1];

//    guess = $scope.guesses[$scope.guesses.length-1];
    var x = $scope.score.length-1;
    var isWinner = 0;

    var guess = $scope.guesses[x].slice();
    var solution = $scope.solution.slice();

    guess.forEach(function(myguess,idx){
      if (myguess === $scope.solution[idx])
      {
        guess[idx] = 'y'
        solution[idx] = 'y'
        $scope.score[x].push('y');
        isWinner++;
      }
    })
    guess.forEach(function(myguess,idx){
      if (myguess !== 'y' )
      {
        if (solution.indexOf(myguess) >= 0 )
        {
          guess[idx] = 'a';
          $scope.score[x].push('a');
        }
        else
        {
          guess[idx] = 'n';
        }
      }
    })
    // console.log($scope.solution);
    // console.log($scope.guess);
    // TODO: Show winModal IF turn has cracked the code. Put below line in an if statement.
    if (isWinner === 4)
    {
      $scope.winModal.show();
    }
    else
    {
      $scope.guesses.push([]);
      $scope.score.push([]);
    }
  };

  $scope.scoreTurn();


  // Create the winner modal. Save on $scope and show when there's a chicken dinner!
  $ionicModal.fromTemplateUrl('templates/winner.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.winModal = modal;
  });

  // TODO: Call this function from the 'Play Again!' button in winModal's html (winner.html)
  $scope.playAgain = function() {
    $scope.newGame();
    $scope.winModal.hide();
  };

});

