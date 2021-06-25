import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import {SingUpController} from  '../../presentation/controller/singup/singup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSingUpController = ():SingUpController=>{
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountMongoRepository  = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter,accountMongoRepository)
  return new SingUpController(emailValidatorAdapter,dbAddAccount)
}