module.exports = function(app, db) {

    //get all records/meetings
    app.get('/meetings', (req,res) => {

      db.collection('meetings').find({}).toArray(function(err, item){
        if(err){
          res.send({ 'error' : 'An error occured' });
        }
        else{
          res.send(item);
        }
      });

    });

    //read meeting info
    var ObjectID = require('mongodb').ObjectID;
    app.get('/meetings/:id', (req,res) => {

      const id = req.params.id;
      const details = { '_id' : new ObjectID(id) };

      db.collection('meetings').findOne(details, (err, item) => {
        if(err){
          res.send({ 'error' : 'An error occured' });
        }
        else{
          res.send(item);
        }
      });

    });

    //insert meeting to db
    app.post('/meetings', (req, res) => {
      
      const note = { title: req.body.title, description: req.body.description, author: req.body.author, lattitude: req.body.lattitude, longitude: req.body.longitude, date: req.body.date, time: req.body.time };

      db.collection('meetings').insert(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });

    //delete meeting
    app.delete('/meetings/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('meetings').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('Meeting ' + id + ' deleted!');
        } 
      });
    });

    //update meeting
    app.put('/meetings/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const note = { title: req.body.title, description: req.body.description, author: req.body.author, lattitude: req.body.lattitude, longitude: req.body.longitude, date: req.body.date };
      db.collection('meetings').update(details, note, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        } 
      });
    });

  };