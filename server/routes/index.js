(function() {
 
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('meanTodo', ['todos']);
 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });
 
  router.get('/api/todos', function(req, res) {
    db.todos.find(function(err, data) {
      res.json(data);
    });
  });
 
  router.post('/api/todos', function(req, res) {
    db.todos.insert(req.body, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.put('/api/todos', function(req, res) {
		var _id = req.body._id;
    var todo = req.body; 
		delete todo._id;

    db.todos.update({
      _id: mongojs.ObjectId(_id)
    }, todo, {}, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.delete('/api/todos/:_id', function(req, res) {
    db.todos.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });
 
  });
 
  module.exports = router;
 
}());
