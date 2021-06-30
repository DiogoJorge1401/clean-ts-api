import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'

import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'

import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'

import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'

import { SingUpController } from '../../../presentation/controller/singup/singup-controller'

import { Controller} from '../../../presentation/protocols'

import { LogControllerDecorator } from '../../decorators/log-controller-decorator'

import { makeSingUpValidation } from './singup-validation-factory'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const singUpController = new SingUpController( dbAddAccount,makeSingUpValidation())
  return new LogControllerDecorator(singUpController,logMongoRepository)
}