const ShoppingService = require("../services/shopping-service");
const { PublishCustomerEvent, SubscribeMessage } = require("../utils");
const UserAuth = require("./middlewares/auth");
const { CUSTOMER_SERVICE } = require("../config");
const { PublishMessage } = require("../utils");

module.exports = (app, channel) => {
  const service = new ShoppingService();

  SubscribeMessage(channel, service);

  // Cart
  app.post("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { product_id, qty } = req.body;
      const { data } = await service.AddCartItem(_id, product_id, qty);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }    
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;
    try {
      const { data } = await service.RemoveCartItem(_id, productId);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }    
  });

  app.get("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const data = await service.GetCart(_id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }    
  });

  // Wishlist
  app.post("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { product_id } = req.body;
    console.log(req.body);
    try {
      const data = await service.AddToWishlist(_id, product_id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }    
  });
  app.get("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const data = await service.GetWishlist(_id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }
    
  });
  app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const product_id = req.params.id;
    try {
      const data = await service.RemoveFromWishlist(_id, product_id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }    
  });

  // Orders
  app.post("/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;
    try {
      const data = await service.CreateOrder(_id, txnNumber);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }    
  });

  app.get("/order/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const data = await service.GetOrder(_id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }    
  });

  app.get("/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const data = await service.GetOrders(_id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ error });
    }    
  });
};
