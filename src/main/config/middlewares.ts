import {Express} from 'express'
import {bodyParser} from '../middlewares/body-parser'
import {cors} from '../middlewares/cors'
import{content_type} from '../middlewares/content-type'

export default (app:Express):void=>{
  app.use(bodyParser)
  app.use(cors)
  app.use(content_type)
}