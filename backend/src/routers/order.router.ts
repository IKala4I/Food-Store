import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {HTTP_BAD_REQUEST} from '../constans/http_status';
import {OrderModel} from '../models/order.model';
import {OrderStatus} from '../constans/order_status';
import auth from '../middlewares/auth.middleware';

const router = Router();
router.use(auth);

router.post('/create', asyncHandler(
  async (req: any, res) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send('Cart Is Empty');
      return;
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({
      ...requestOrder,
      user: req.user.id
    });
    await newOrder.save();
    res.send(newOrder);
  }
));

export default router;
