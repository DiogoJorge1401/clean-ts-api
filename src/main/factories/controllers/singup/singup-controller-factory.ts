import { SingUpController } from '../../../../presentation/controller/singup/singup-controller'

import { Controller } from '../../../../presentation/protocols'

import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'

import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'

import { makeSingUpValidation } from './singup-validation-factory'

export const makeSingUpController = (): Controller => {
  return makeLogControllerDecorator(new SingUpController(makeDbAddAccount(), makeSingUpValidation(), makeDbAuthentication())
  )
}