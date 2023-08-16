import { Router } from "express";
import CartManager from "../manager/cartManager.js";
import { __dirname } from "../utils.js";
const manager = new CartManager(__dirname + "/files/carts.json");
const router = Router();

router.get("/carts", async (req, res) => {
  const carrito = await manager.getCarts();
  res.json({ carrito });
});

router.get("/carts/:cid", async (req, res) => {
  const carritofound = await manager.getCartbyId(req.params);
  res.json({ status: "success", carritofound });
});

router.post("/carts/", async (req, res) => {
  const newcart = await manager.addCart();
  res.json({ status: "Éxito", newcart });
});

router.post("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    await manager.addProductToCart(cid, pid);
    res.json({
      status: "Éxito",
      message: "Producto añadido al carrito con éxito.",
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "No se pudo agregar el producto al carrito.",
      });
  }
});

export default router;
