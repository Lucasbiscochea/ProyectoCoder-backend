import express from "express";
import ProductManager from "../dao/mongomanagers/productManagerMongo.js";
import CartManager from "../dao/mongomanagers/cartManagerMongo.js";

const router = express.Router();
const PM = new ProductManager();
const CM = new CartManager();

router.get("/", async (req, res) => {
  const products = await PM.getProducts(req.query);
  res.render("home", { products });
});

router.get("/products", async (req, res) => {
  const products = await PM.getProducts(req.query);
  res.render("products", { products });
});

router.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await PM.getProductById(pid);

  res.render("product", { product });
});

router.get("/cart", async (req, res) => {
  const cid = req.params.cid;
  const cart = await CM.getCart(cid);
  res.render("products", { cart });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/profile", async (req, res) => {
  res.render("profile");
});

router.get("/restore", async (req, res) => {
  res.render("restore");
});

router.get("/faillogin", async (req, res) => {
  res.send({ status: "error", message: "Login inválido!" });
});

router.get("/failregister", async (req, res) => {
  res.send({
    status: "error",
    message: "Error! No se pudo registar el Usuario!",
  });
});

export default router;
