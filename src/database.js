import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alexblans:coderhouse@cluster0.iuzk6.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Conectados con exito"))
    .catch((error)=> console.log("Tenemos error", error))