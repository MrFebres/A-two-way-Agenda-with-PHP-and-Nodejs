const mongoose      = require('mongoose'),
      usersModel   = require('../models/usersModel.js');

const usersCRUD = {};

// Párametros CRUD, para los usuarios.
  // Encontrar usuarios en la base de datos.
  usersCRUD.getUsers      = (req, res) => {
    usersModel.find({}).exec((error, docs) => {
      if (error) {
        res.status(500);
        res.json(error);
        // console.log(error);
      }
      res.json(docs);
      // console.log(docs);
    })
  };

  // Validar el log in del usuario.
  usersCRUD.validateUser  = (req, res) => {
    // return console.log(req.body.user, req.body.pass);

    let user = req.body.user,
        pass = req.body.pass;

    usersModel.findOne({user: user, password: pass}, (err, response) => {
  		if (err) {
          	res.status(500)
          	res.json(err)
      	}
      	// console.log(response);
      	if(response!="") {
      		res.send("Validado");
          idSesion = response._id;
      	} else {
      		res.send("no existe usuario");
      	}
    });
  };

module.exports = usersCRUD;
