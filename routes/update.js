var express = require('express');
var router = express.Router();


/* GET session testing. */
router.get('/', function(req, res, next) {


    var request = req.query.result;
  
    if(request === "win"){
      if(!req.session.wins){
           req.session.wins=1;
           if(!req.session.losses){
            req.session.losses=0;
           }
        }
        else{
            req.session.wins++;
        }
        res.send(JSON.stringify({
        "wins":req.session.wins,
        "losses":req.session.losses
        }));
  
    }
    else{
        if(!req.session.losses){
            req.session.losses=1;
            if(!req.session.wins){
                req.session.wins=0;
            }
        }
        else{
            req.session.losses++;
        }
        res.send(JSON.stringify({
            "wins":req.session.wins,
            "losses":req.session.losses
          }));
  
    }
});

module.exports = router;
