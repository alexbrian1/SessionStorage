//Clase 2 -- Cookies session y storage 2.

// Recordemos: Una session es un vinculo que se genera entre el cliente y el servidor, la data se guarda en el servidor pero el cliente almacena el SessionId.

// Practicamos Memory Storage: almacenaje en el espacio volatil del servidor.

// File Storage:
//1) Intalamos: npm i session-file-store
//2) Importamos el modulo
//3) Lo inicializamos conectandolo a la session.

//Despues de ver las desventajas de file Storage, vamos a trabajar con mongodb

// 1) Instalamos: npm i connect-mongo
// 2) Importamos MongoStore
// 3) Lo usamos a nivel middleware


import express from "express";
const app = express();
const PUERTO = 8080;

import session from "express-session";

import FileStore from "session-file-store";
// no se olviden inicarlizarlo
// const fileStore = FileStore(session);
import { engine } from "express-handlebars";

import MongoStore from "connect-mongo";
import "./database.js";
import viewsRouter from "./router/views.router.js";
import sessionsRouter from "./router/sessions.router.js"



//Middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    //1) Creamos una session con Memory Storage
    secret:"secretCoder",
    resave:true,
    saveUninitialized:true,

    //2) Utilizando File Storage
    // store: new fileStore({path:"./src/sessions", ttl:1000, retries:1})
    //Path: la ruta donde se guardan los archivos de session
    //ttl: Time to live
    //retries: Cantidad de veces que el servidor va a tratar de leer el archivo.

    ///
    //3) Utilizando MongoStorage:
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://alexblans:coderhouse@cluster0.iuzk6.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 100
    })

    // mongodb+srv://alexblans:<db_password>@cluster0.iuzk6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
}));

///// Rutas
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);

//Login simple de usuario;
// app.get("/login", (req,res)=>{
//     let usuario = req.query.usuario;

//     req.session.usuario = usuario;
//     res.send("Guardamos el usuario por una query");
// });

//Verificamos el usuario
// app.get("/usuario", (req,res)=>{
//     if (req.session.usuario) {
//         return res.send(`El usuario registrado es ${req.session.usuario}`);
//     }
//     res.send("No tenemos un usuario registrado");
// });

app.listen(PUERTO, ()=> console.log(`escuchando en el puerto ${PUERTO}`));