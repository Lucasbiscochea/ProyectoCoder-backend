import { Router, query } from "express";
import { __dirname } from "../utils.js";

import ProductManager from "../manager/productManager.js";

const manager = new ProductManager(__dirname + "/files/products.json");
const router = Router();

router.get("/products", async (req, res) => {
  const listproducts = await manager.getProducts(req, query);
  res.json({ message: "Éxito", listproducts });
});

router.get("/products/:pid", async (req, res) => {
  const productfind = await manager.getProductbyId(req.params);
  res.json({ status: "Éxito", productfind });
});

router.post("/products", async (req, res) => {
  const newProduct = await manager.addProduct(req.body);
  res.json({ status: "Éxito", newProduct });
});

router.put("/products:pid", async (req, res) => {
  const updatedProduct = await manager.updateProduct(req.params,req.body);
  res.json({ status: "Éxito", updatedProduct });
});

router.delete("/products:pid", async (req, res) => {
  const deleteProduct = await manager.deleteProduct(req.params);
  res.json({ status: "Éxito", deleteProduct });
});

export default router;
