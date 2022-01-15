import { Request, Response, NextFunction } from "express";
import ResponseData from '../helper/model/responseData';
import { statusEnum } from '../helper/model/statusEnum';

export default async function ErrorHandler(error:any, req: Request, res: Response, next:NextFunction): Promise<any> {
  if (!error.code) {
    res.status(500).send(new ResponseData(statusEnum.ERROR,"Internal error",error))
  }
  let responseData = new ResponseData(statusEnum.ERROR,error.message,error.data)
  res.status(error.code).send(responseData);
}