app.service("tournamentService", function($q, $http){
	this.generateBracketservice = function(tournament){
		console.log(tournament)
		return $http.post('/api/tournament', tournament)
	}
})