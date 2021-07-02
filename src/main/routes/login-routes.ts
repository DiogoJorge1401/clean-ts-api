import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";

import { makeSingUpController } from '../factories/controllers/singup/singup-controller-factory'
import { makeLoginController } from "../factories/controllers/login/login-controller-factory";

export default (router: Router): void => {
  router.post('/singup', adaptRoute(makeSingUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}