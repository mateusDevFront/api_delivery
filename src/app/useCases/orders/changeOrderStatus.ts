import { Request, Response } from "express";

import { Order } from "../../models/Order";

export async function ChangeOrderStatus(req: Request, res: Response) {
  try {
    const {orderId} = req.params

    const {status} = req.body

    if(!['WAITING', 'IM_PRODUCTION', 'DONE'].includes(status)) {
      return res.status(400).json({
        error: 'status should bee one of these'
      })
    }

    await Order.findByIdAndUpdate(orderId, {status})
    res.sendStatus(204)
  } catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
}
