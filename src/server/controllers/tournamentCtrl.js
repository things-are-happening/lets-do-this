var Tournament = require('./../models/Tournament');
var User = require('./../models/User');
//post query:
var handlePost = function(req, res) {
	console.log(req.body);
    new Tournament(req.body).save(function(err, res) {
    	if(err) {
            res.status(500).json(err)
        }
        console.log("response", res);
            var newTournament = res._id;
        // console.log("error", err);
        // console.log(3428934, req.params.id);
        User.findById(req.params.id).then(function(response, error) {
        if(error) {
           return res.status(500).json(error);
        } else {
            var user = response;
       		 user.tournament.push(newTournament);
       		 // console.log('user', user);
       		 user.save();
        }
    })  
})
 return res.status(200).end();    
}

var getAll = function(req, res){
	console.log(11111, req.params);
	User.findById(req.params.id).populate('tournament').then(function(response, error) {
			console.log(response);
		if (error) {
			return res.status(500).send(error);
		}

		return res.send(response);
	})
}
	// Tournament.find({ userId: req.user._id }, function(err, response){
	// 	if (err) {
	// 		return res.status(500).send(err);
	// 	}
	// 	res.send(response)
	// })
// }
/////
//find one query:
var handleGetOne = function(req, res) {
	Tournament.find({ userId: req.user._id, _id: req.params.tounament_id }, function(err, response) {
		if(error) {
			res.status(500).json(err)
		} else {
			res.json(response)
		}
	})
}
/////
// update query:
var handlePut = function(req, res) {
	Tournament.update({ userId: req.user._id, _id: req.params.tounament_id }, /*{ quantity: req.body.quantity },*/ function(err, response) {
		if(error) {
			res.status(500).json(err)
		} else {
			res.json(response)
		}
	})
}

// var handlePut = function(req, res) {
// 	Tournament.update({ userId: req.user._id, _id: req.params.tounament_id }, { quantity: req.body.quantity }, function(err, num, raw) {
// 		if (err)
// 			res.send(err);

//     // Update the existing tournament quantity
//     // tournament.quantity = req.body.quantity;

//     // Save the beer and check for errors
//     tournament.save(function(err) {
//     	if (err)
//     		res.send(err);

//     	res.json(beer);
//     });
// });
// };
/////
var handleDelete = function(req, res) {
	Tournament.remove({ userId: req.user._id, _id: req.params.tournament_id }, function(err) {
		if(error) {
			res.status(500).json(err)
		} else {
			res.json({ message: 'Tournament removed from the locker room!' })
		}
	})
}
////

/////
var deleteTournament = function(req, res){
	Tournament.findByIdAndRemove(req.params.id, function(error, response){
		if(error){
			res.status(500).json(error)
		} else {
			res.json(response)
		}
	})
}

module.exports = {
	get: getAll,
	getOne: handleGetOne,
	post: handlePost,
	put: handlePut,
	delete: handleDelete,
	delete: deleteTournament
};