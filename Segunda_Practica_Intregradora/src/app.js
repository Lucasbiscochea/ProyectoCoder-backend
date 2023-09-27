import express from "express";
import __dirname from "./utils.js";
import expressHandlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { Server } from "socket.io";
import mongoose from "mongoose";
import ProductManager from "./dao/mongomanagers/productManagerMongo.js";
import ChatManager from "./dao/mongomanagers/messagerManagerMongo.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.routes.js";
import sessionsRouter from "express-session";
import cookieParser from "cookie-parser";
// import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import session from "express-session";

const app = express();
const puerto = 8080;
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

const httpServer = app.listen(puerto, () => {
    console.log("Servidor Activo en el puerto: " + puerto);
});
const socketServer = new Server(httpServer);
const PM = new ProductManager();
const CM = new ChatManager();

app.set("views", __dirname + "/views");
app.engine('handlebars', expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/api/sessions/", sessionsRouter);
app.use("/", viewsRouter);

mongoose.connect(
  "mongodb+srv://luckscardozo19:tl9nSzHK5ElH7EaE@cluster0.vytxhyv.mongodb.net/prohardware?retryWrites=true&w=majority"
);

socketServer.on("connection", async (socket) => {
  console.log("client connected con ID:", socket.id);
  const products = await PM.getProducts();
  socketServer.emit("realTimeProducts", products);

  socket.on("nuevoProducto", async (obj) => {
    await PM.addProduct(obj);
    const products = await PM.getProducts();
    socketServer.emit("realTimeProducts", products);
  });

  socket.on("deleteProduct", async (id) => {
    console.log(id);
    await PM.deleteProduct(id);
    const products = await PM.getProducts({});
    socketServer.emit("realTimeProducts", products);
  });

  socket.on("newMessage", async (data) => {
    CM.createMessage(data);
    const messages = await CM.getMessages();
    socket.emit("messages", messages);
  });
});
