module.exports = function(app, db) {

    //read comment info
    var ObjectID = require('mongodb').ObjectID;
    app.get('/comments/:id', (req,res) => {

      const id = req.params.id;
      const details = { '_id' : new ObjectID(id) };

      db.collection('comments').findOne(details, (err, item) => {
        if(err){
          res.send({ 'error' : 'An error occured' });
        }
        else{
          res.send(item);
        }
      });

    });

    //insert meeting to db
    app.post('/comments', (req, res) => {
      
      const note = { meetingId: req.body.meetingId, userId: req.body.userId, date: req.body.date, commentBody: req.body.commentBody };

      db.collection('comments').insert(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });

    //delete meeting
    app.delete('/comments/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('comments').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('Comment ' + id + ' deleted!');
        } 
      });
    });

    //update meeting
    app.put('/comments/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const note = { meetingId: req.body.meetingId, userId: req.body.userId, date: req.body.date, commentBody: req.body.commentBody };
      db.collection('comments').update(details, note, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        } 
      });
    });

  };