import { Router } from "express";
import MessageService from "../dao/database/services/message.service.js";
import ProductService from "../dao/database/services/product.service.js";
import {
  validateGetCartById,
  validateGetProducts,
} from "../middlewares/validate.js";
import CartService from "../dao/database/services/carts.service.js";

const router = Router();

router.get("/", async (_req, res) => {
  const products = await ProductService.getAllProducts();
  return res.render("home", {
    products: products.map((p) => {
      return p.toJSON();
    }),
  });
});

router.get("/realTimeProducts", async (_req, res) => {
  const products = await ProductService.getAllProducts();
  return res.render("realTimeProducts", {
    products: products.map((p) => {
      return p.toJSON();
    }),
  });
});

router.get("/chat", async (_req, res) => {
  const messages = await MessageService.getAllMessages();
  return res.render("chat", {
    messages,
  });
});

router.get("/products", validateGetProducts, async (req, res) => {
  const { limit, page, query, sort } = req.query;
  // @ts-ignore
  const queryString = req._parsedOriginalUrl.query;

  const result = await ProductService.getProducts({ limit, page, query, sort });
  return res.render("products", {
    products: result.docs,
    totalPages: result.totalPages,
    page: result.page,
    queries: queryString,
    user: req.session.user
  });
});

router.get("/carts/:cid", validateGetCartById, async (req, res) => {
  const { cid } = req.params;

  const foundCart = await CartService.getCartByID(cid);
  return res.render("cart", {
    cart: foundCart,
  });
});

router.get("/login", async (req,res) => {
  if(req.session.user){
    return res.redirect("/products")
  }
  return res.render("login")
})

router.get("/register", async (req,res) => {
  if(req.session.user){
    return res.redirect("/products")
  }
  return res.render("register")
})

export default router;
