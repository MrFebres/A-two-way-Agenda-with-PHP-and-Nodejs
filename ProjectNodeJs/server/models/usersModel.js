const mongoose = require('mongoose'),
      schema   = mongoose.Schema;

// Esquema de usuario.

let userSchema = new schema({
  user: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {
  collection: 'users'
});

let usersModel = mongoose.model('user', userSchema);

module.exports = usersModel;

// Creación de usuarios base.
let test = new usersModel({
  email: 'test@mail.com',
  user: "test",
  password: "1234"
});

let admin = new usersModel({
 email: 'febres@mail.com',
 user: "febres",
 password: "1234"
});
