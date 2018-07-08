module.exports = function(app, db) {

    //read  event/take part info
    var ObjectID = require('mongodb').ObjectID;
    app.get('/takePart/:id', (req,res) => {

      const id = req.params.id;
      const details = { '_id' : new ObjectID(id) };

      db.collection('takePart').findOne(details, (err, item) => {
        if(err){
          res.send({ 'error' : 'An error occured' });
        }
        else{
          res.send(item);
        }
      });

    });

    //insert event/take part to db
    app.post('/takePart', (req, res) => {
      
      const note = { meetingId: req.body.meetingId, userId: req.body.userId };

      db.collection('takePart').insert(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });

  };