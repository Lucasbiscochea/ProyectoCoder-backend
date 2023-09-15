import mongoose from "mongoose"

const URI = "mongodb+srv://luckscardozo19:tl9nSzHK5ElH7EaE@cluster0.vytxhyv.mongodb.net/prohardware?retryWrites=true&w=majority";

await mongoose.connect(URI,{
    serverSelectionTimeoutMS:5000,
})
console.log("Entraste a la base de datos....")
