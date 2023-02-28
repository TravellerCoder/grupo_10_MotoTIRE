const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routers/mainRouter');
const productsRouter = require('./routers/productsRouter');
const authRouter = require('./routers/authRouter');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const cookies = require('cookie-parser');
const session = require('express-session');
const acceso = require('./middlewares/access');
const db = require('../src/database/models')

app.use(session({
  secret: 'admin',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(acceso);
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: false})); //Para poder trabajar con los datos del JSON
app.use(express.json())
app.use(cookies());

app.use(express.static('public')); // Carpeta publica 'public'

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