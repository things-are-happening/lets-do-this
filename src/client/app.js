var app = angular.module("tournament", ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider){

  // $urlRouterProvider.otherwise('/dashboard');
 	$stateProvider

    .state('home', {
      url: '/',
      views: {
        "content": {
          controller: 'dashboardCtrl',
          templateUrl: './templates/home/home.html'
        }
      }
    })

    .state('dashboard', {
      url: '/dashboard',
      views: {
        "content":{
          controller: 'dashboardCtrl',
          templateUrl: './templates/user/dashboard.html'
        }
      },
      resolve: {
        tournamentsList: function(tournamentService){
          return tournamentService.getTournaments();
        }
      }
    })

    /**
      NOTE: Change app states to become child of 'app' for Auth
    **/

    .state('tournament', {
      url: '/tournament',
      views: {
        "content@" :{
          controller: 'tournamentCtrl',
          templateUrl: './templates/tournament/view.html'
        }
      }
    })

    .state('addTournament', {
      url: '/add',
      views: {
        "content@" : {
          controller: 'addTournamentCtrl',
          templateUrl: './templates/tournament/add.html'
        }
      }
    })

    .state('viewTournament', {
      url: '/view',
      views: {
        "content@" : {
          controller: 'viewTournamentCtrl',
          templateUrl: './templates/tournament/view.html'
        }
      }
    })

    .state('login', {
      url: '/login',
      views: {
        "content@" : {
          templateUrl: './templates/tournament/home.html'
        }
      }
    })

    .state('signup', {
      url: '/signup',
      views: {
        "content@" : {
          templateUrl: './templates/tournament/signup.html'
        }
      }
    })

})
