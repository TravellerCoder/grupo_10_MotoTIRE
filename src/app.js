const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routers/mainRouter');
const productsRouter = require('./routers/productsRouter');
const authRouter = require('./routers/authRouter');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const cookies = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv')

const db = require('../src/database/models')
const userLoggedMidleware = require('../src/middlewares/users/userLoggedMidleware')

dotenv.config();

app.use(session({
  secret: 'admin',
  resave: false,
  saveUninitialized: false,
  
}));




app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: false})); //Para poder trabajar con los datos del formulario.
app.use(express.json())
app.use(cookies());
app.use(userLoggedMidleware);
app.use(express.static('public')); // Carpeta publica 'public'
app.use(morgan('dev'));

/* CONFIGURACION VIEW ENGINE A EJS */
app.set('view engine','ejs');

/* CONFIGURACION PARA PUERTO RANDOM O PUERTO 2000 - PARA PODER RENDERIZAR */
const port = process.env.PORT || 3000;

app.listen(port, () => 
console.log('***** SERVER UP! @PORT: ' + port + ' *****'),
);

app.use(mainRouter);

app.use(productsRouter);

app.use(authRouter);

