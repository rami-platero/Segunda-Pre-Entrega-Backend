import CartService from "../dao/database/services/carts.service.js";
import { AppError } from "../helpers/AppError.js";

export const createCart = async (_req, res, next) => {
  try {
    const newCart = await CartService.createCart();

    return res
      .status(201)
      .json({ message: "Created cart successfully.", payload: newCart });
  } catch (error) {
    return next(error);
  }
};

export const getAllCarts = async (_req, res, next) => {
  try {
    const carts = await CartService.getAllCarts();

    return res.status(200).send(carts);
  } catch (error) {
    return next(error);
  }
};

export const getCartByID = async (req,res,next) => {
  try {
    const {cid} = req.params

    const foundCart = await CartService.getCartByID(cid)

    if(!foundCart){
      throw new AppError(404, {message: "A cart with the specified ID does not exist."})
    }

    return res.status(200).json({status: "success", payload: foundCart})
  } catch (error) {
    console.log(error);
    return next(error)
  }
}

export const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await CartService.addProductToCart({ cid, pid });

    return res.status(201).json({
      message: "Product added to cart successfully!",
      payload: updatedCart,
    });
  } catch (error) {
    return next(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  try {
    const params = req.params;

    await CartService.removeProductFromCart(params);

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    await CartService.clearCart(cid);

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const params = req.params
    const {quantity} = req.body

    const result = await CartService.updateProductQuantity(params,quantity)

    return res.status(201).json({status: "success", message: "Updated product quantity successfully!", payload: result})

  } catch (error) {
    return next(error)
  }
}

export const updateCartProductsArray = async (req,res,next) => {
  try {
    const {cid} = req.params

    const updatedCart = await CartService.updateCartProductsArray(cid, req.body)

    return res.status(201).json({status: "success", payload: updatedCart})
  } catch (error) {
    return next(error)
  }
}