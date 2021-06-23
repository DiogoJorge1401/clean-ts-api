import { EmailValidator } from "../presentation/protocols/email-validator"
export class EmailValidatorAdapter implements EmailValidatorAdapter{
  isValid(email:string):boolean{
    return false
  }
}