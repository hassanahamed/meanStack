var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var emailExistence = require('email-existence');
var db = mongojs('contactList', ['contactList']);







app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req, res) {

    db.contactList.find(function(err, docs) {




        console.log(docs);
        res.json(docs);
    });
});

app.get('/contactList/:id', function(req, res) {
	var id = req.params.id;

    db.contactList.findOne({
        _id: mongojs.ObjectId(id)
    },function(err, docs) {




        console.log(docs);
        res.json(docs);
    });
});


app.post('/contactList', function(req, parentRes) {

    console.log('heyy'+ req.body.email);

    var emailCheck = req.body.email;
    emailExistence.check(emailCheck, function(err,res){
		console.log('res: '+res);
		if(res){

			 db.contactList.insert(req.body, function(err, doc) {
        parentRes.json(doc);
        console.log('here', +doc);

    });
		} else{
			parentRes.status(400).send('Bad Request');
				
		}
	});
   

});


app.delete('/contactList/:id', function(req, res) {

    var id = req.params.id;
    console.log(id);
    db.contactList.remove({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);

    });

});
app.put('/contactList/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactList.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8887);

console.log("server running at 8887");