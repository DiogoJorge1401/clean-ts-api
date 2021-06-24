import {Request,Response,NextFunction} from 'express'
export const content_type=(req:Request,res:Response,next:NextFunction):void=>{
  res.type('json')
  next()
}