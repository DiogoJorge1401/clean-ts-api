import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SingUpController } from '../../presentation/controller/singup/singup'
import { Controller} from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { makeSingUpValidation } from './singup-validation'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const singUpController = new SingUpController( dbAddAccount,makeSingUpValidation())
  return new LogControllerDecorator(singUpController,logMongoRepository)
}