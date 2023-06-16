import { StatusCodes } from 'http-status-codes'

export default function responseHandler (req, res, next) {
  res.status(req.context.statusCode || StatusCodes.OK).json({ ...res.payload })
}
