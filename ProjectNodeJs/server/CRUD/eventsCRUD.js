const mongoose    = require('mongoose'),
      eventsModel = require('../models/eventsModel.js'),
      usersModel  = require('../models/usersModel.js');

const eventsCRUD  = {};

// Párametros CRUD para los eventos.
  // Obtener todos los eventos.
  eventsCRUD.getEvents   = (id, callback) => {
    eventsModel.find({_id: id}, (error, docs) => {
      if (error) {
        callback(error);
      } else {
        // console.log(docs);
        callback(null, docs);
      }
    })
  };

  // Crear un nuevo evento.
  eventsCRUD.createEvent = (doc, callback) => {
    // console.log(doc);
    let nuevoEvento = new eventsModel(doc)

    nuevoEvento.save((error, response) => {
      if (error) {
        // console.log(response);
        callback(error);
      } else {
        callback(null, response);
      }
    })
    // eventsModel.insert(doc, (error, doc) => {
    //   if (error) {
    //     callback(error);
    //   } else {
    //     callback(null, {id: doc.insertedIds[0], total: doc.insertedCount});
    //   }
    // })
  };

  // Eliminar Evento.
  eventsCRUD.deleteEvent = (title, callback) => {
    try {
        eventsModel.deleteOne({ title: title }, (error, response) => {
          if (error) {
            callback(error)
            console.log(error);
          } else {
            callback(null, response);
            console.log('Se elimino el registro correctamente.')
          }
        });
        // console.log('Se elimino el registro correctamente.');
    } catch (e) {
      callback(e)
      // console.log('Se genero un error al eliminar el registro.');
    }
    // eventsModel.remove({_id: id}, (error, doc) => {
    //   if (error) {
    //     callback(error);
    //   } else {
    //     console.log('Registro eliminado correctamente.');
    //   }
    // });


  };

  // Actualización de evento.
  eventsCRUD.updateEvent = (id, doc, res) => {
    let nuevoEvento = new eventsModel(doc)

    eventsModel.update({_id: id}, nuevoEvento, error => {
      if (error) {
        res.status(500);
        res.json(error);
      }
      else {
        res.json(nuevoEvento);
        console.log('Evento actualizado correctamente.', nuevoEvento);
      }
    })
  };


module.exports = eventsCRUD;
