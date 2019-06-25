var express = require('express');
var router = express.Router();
var LivroDAO = require('../dao/LivroDAO');
var Livro = require('../models/Livro');

var livroDAO = new LivroDAO();

// GET - retorna todos livros
router.get('/livros', function(req, res, next) {
    res.send(livroDAO.getAll());
  });

// GET - retorna um  livro
router.get('/livros/:id', function(req, res, next) {
  var id = req.params.id;

  if (isNaN(id)) {
    res.statusCode = 400;
    res.send({message:'id deve ser um número'});
  } else {

	  let temp = livroDAO.get(id);

	  if (temp === null) {
		res.statusCode = 404;
		res.send({message:'Livro com id: ' + id + ' não encontrado'});  
	  } else {
		res.send(temp);
	  }
  }
});

// POST - cria um livro
router.post('/livros', function(req, res, next) {
  var body = req.body;

  if(typeof(body.titulo) !== 'string') {
    res.statusCode = 400;
    res.send({message:'titulo deve ser uma string'});
	return;
  }
  if(typeof(body.isbn) !== 'string') {
    res.statusCode = 400;
    res.send({message:'isbn deve ser uma string'});
	return;
  }
  if(typeof(body.editora) !== 'string') {
    res.statusCode = 400;
    res.send({message:'editora deve ser uma string'});
	return;
  }
  if(typeof(body.autor) !== 'string') {
    res.statusCode = 400;
    res.send({message:'autor deve ser uma string'});
	return;
  }
  if(typeof(body.descricao) !== 'string') {
    res.statusCode = 400;
    res.send({message:'descricao deve ser uma string'});
	return;
  }
  if(typeof(body.lancamento) !== 'string') {
    res.statusCode = 400;
    res.send({message:'lancamento deve ser uma string'});
	return;
  }

  var livro = new Livro(
      livroDAO.getNextID(),
      body.titulo,
      body.isbn,
      body.editora,
      body.autor,
      body.descricao,
      body.lancamento
    );

  livroDAO.add(livro);
  
  res.statusCode = 201;
  res.send(livro)
});

// PUT - atualiza um livro
router.put('/livros/:id', function(req, res, next){
  var id = req.params.id;

  if (isNaN(id)) {
    res.statusCode = 400;
    res.send({message:'id deve ser um número'});
  }

  let temp = livroDAO.get(id);

  if (temp === null) {
    res.statusCode = 404;
    res.send({message:'Livro com id: ' + id + ' não encontrado'});  
  }

  var body = req.body;

  if(typeof(body.titulo) !== 'string') {
    res.statusCode = 400;
    res.send({message:'titulo deve ser uma string'});
  }
  if(typeof(body.isbn) !== 'string') {
    res.statusCode = 400;
    res.send({message:'isbn deve ser uma string'});
  }
  if(typeof(body.editora) !== 'string') {
    res.statusCode = 400;
    res.send({message:'editora deve ser uma string'});
  }
  if(typeof(body.autor) !== 'string') {
    res.statusCode = 400;
    res.send({message:'autor deve ser uma string'});
  }
  if(typeof(body.descricao) !== 'string') {
    res.statusCode = 400;
    res.send({message:'descricao deve ser uma string'});
  }
  if(typeof(body.lancamento) !== 'string') {
    res.statusCode = 400;
    res.send({message:'lancamento deve ser uma string'});
  }

  var livro = new Livro(
    id,
    body.titulo,
    body.isbn,
    body.editora,
    body.autor,
    body.descricao,
    body.lancamento
  );

  livroDAO.update(livro);
  res.send(livro);
});

// DELETE - deleta um livro
router.delete('/livros/:id', function(req, res, next) {
  var id = req.params.id;

  if (isNaN(id)) {
    res.statusCode = 400;
    res.send({message:'id deve ser um número'});
  } else {

	  let temp = livroDAO.get(id);

	  if (temp === null) {
		res.statusCode = 404;
		res.send({message:'Livro com id: ' + id + ' não encontrado'});  
	  } else {
		livroDAO.delete(id);
		res.send(temp);
	  }
  }
});

module.exports = router;
