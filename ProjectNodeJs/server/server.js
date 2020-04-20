// Creación de servidor.
// Módulos requeridos.
const http          = require('http'),
      path          = require('path'),
      express       = require('express'),
      bodyParser    = require('body-parser'),
      cors          = require('cors'),
      mongoose      = require('mongoose');

// Rutas.
const Routing       = require('./routes.js'),
      usersModel    = require('./models/usersModel'),
      usersCRUD     = require('./CRUD/usersCRUD');

// Base de datos a utilizar.
mongoose.connect('mongodb://localhost:27017/agenda_db', {
  useNewUrlParser: true,    // Configuraciones en orden de
  useUnifiedTopology: true  // mantener la integridad del proyecto.
})
        .then(() =>  console.log('Conexion con la base de datos Exitosa'))
        .catch((error) => console.error(`No se ha podido establecer la conexion: ${error}`));

// Puerto y Aplicación.
const port    = 3000,
      app     = express(),
      server  = http.createServer(app);

app.use(cors());

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', Routing);

server.listen(port, () => console.log(`Server is running in http://localhost:${port}`));
