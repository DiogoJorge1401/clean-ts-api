import {Express} from 'express'
import {bodyParser,cors,content_type} from '../middlewares'


export default (app:Express):void=>{
  app.use(bodyParser)
  app.use(cors)
  app.use(content_type)
}