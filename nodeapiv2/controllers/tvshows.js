//File: controllers/tvshows.js
var mongoose = require('mongoose');  
var TVShow  = mongoose.model('TVShow');

//GET - Return all tvshows in the DB
exports.findAllTVShows = function(req, res) {  
    TVShow.find(function(err, tvshows) {
    if(err) res.send(500, err.message);

    console.log('GET /tvshows')
        res.status(200).jsonp(tvshows);
    });
};

exports.findById = function(req, res) {  
    TVShow.findById(req.params.id, function(err, tvshow) {
    if(err){
    	return res.send(500, err.message);	
    } 

    console.log('GET /tvshow/' + req.params.id);
        res.status(200).jsonp(tvshow);
    });
};
exports.addTVShow = function(req, res) {
	console.log('POST');
	console.log(req.query);

	var tvshow = new TVShow({
		title:    req.query.title,
		year: 	  req.query.year,
		country:  req.query.country,
		poster:   req.query.poster,
		seasons:  req.query.seasons,
		genre:    req.query.genre,
		summary:  req.query.summary
	});

	tvshow.save(function(err, tvshow) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(tvshow);
	});
};
exports.updateTVShow = function(req, res) {  
    TVShow.findById(req.params.id, function(err, tvshow) {
        tvshow.title   = req.query.petId;
        tvshow.year    = req.query.year;
        tvshow.country = req.query.country;
        tvshow.poster  = req.query.poster;
        tvshow.seasons = req.query.seasons;
        tvshow.genre   = req.query.genre;
        tvshow.summary = req.query.summary;

        tvshow.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(tvshow);
        });
    });
};

exports.deleteTVShow = function(req, res) {  
    TVShow.findById(req.params.id, function(err, tvshow) {
        tvshow.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};