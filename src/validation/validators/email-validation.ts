import { InvalidParamError } from "../../presentation/errors";
import { EmailValidator } from "../protcols/email-validator";
import { Validation } from "../../presentation/protocols/validation";

export class EmailValidation implements Validation{
  constructor(protected fieldName:string,protected emailValidator: EmailValidator){}
  validate(input:any): Error{
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
        return new InvalidParamError(this.fieldName)
    }
  }
}