const Router      = require('express').Router(),
      usersCRUD   = require('./CRUD/usersCRUD.js'),
      eventsCRUD  = require('./CRUD/eventsCRUD.js');

var   ObjectId    = require('mongodb').ObjectID;

// Cierre de sesión, enviar a página de log in.
Router.route('/', (req, res) => {
  res.sendFile('index.html');
})

// Obtención de usuarios.
Router.route('/all').get((req, res) => {
  usersCRUD.getUsers(req, res);
});

// Validación de formulario de inicio de sesión.
Router.route('/login').post((req, res) => {
  usersCRUD.validateUser(req, res);
  // console.log(req.body);
});

// Obtención de eventos de usuario en sesión.
Router.route('/load-event').get((req, res) => {
  if (typeof(idSesion) === 'undefined') {
    res.send('0');
  } else {
      eventsCRUD.getEvents(idSesion, (error, response) => {
      if (error) {
        throw error;
      } else {
        res.json(response);
      }
    });
  }
});

// Petición para creación de nuevos eventos.
Router.route('/create-event').post((req, res) => {
  req.body.user = idSesion;

  eventsCRUD.createEvent(req.body, (error, response) => {
    if (error) {
      throw error;
    } else {
      res.json(response);
    }
  });
});

// Petición para eliminar un evento según id.
Router.route('/delete-event').post((req, res) => {
  // let id = req.body._id;
  // eventsCRUD.deleteEvent(id);

  let title = req.body.title;
  // console.log(title);
  eventsCRUD.deleteEvent(title, (error, response) => {
    if (error) {
      throw error;
    } else {
      res.json(response);
    }
  });
});

// Petición de actualización de eventos.
Router.route('/update-event').put((req, res) => {
  let eventId = req.body._id,
      doc     = req.body;

  eventsCRUD.updateEvent(eventId, doc, (error, response) => {
    if (error) {
      throw error
    } else {
      res.json(response)
    }
  });
});

module.exports = Router;
