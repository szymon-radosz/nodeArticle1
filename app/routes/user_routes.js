qs = require("qs");

module.exports = function(app, db) {

     //get all records/users
     app.get('/users', (req,res) => {

      db.collection('users').find({}).toArray(function(err, item){
        if(err){
          res.send({ 'error' : 'An error occured' });
        }
        else{
          res.send(item);
        }
      });

    });

    //read user info
    var ObjectID = require('mongodb').ObjectID;
    app.get('/users/:id', (req,res) => {

      const id = req.params.id;
      const details = { '_id' : new ObjectID(id) };

      db.collection('users').findOne(details, (err, item) => {
        if(err){
          res.send({ 'error' : 'An error occured' });
        }
        else{
          res.send(item);
        }
      });

    });

    //insert user to db
    app.post('/users', (req, res) => {
      
      const user = { firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age, photo: req.body.photo, email: req.body.email, description: req.body.description, hobbies: req.body.hobbies, location: req.body.location, password: req.body.password, passwordConfirmation: req.body.passwordConfirmation };

      db.collection('users').insert(user, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });

    //delete user
    app.delete('/users/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('users').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('User ' + id + ' deleted!');
        } 
      });
    });

    //update user
    app.put('/users/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const note = { firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age, photo: req.body.photo, email: req.body.email, description: req.body.description, hobbies: req.body.hobbies, location: req.body.location };
      db.collection('users').update(details, note, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        } 
      });
    });

  };