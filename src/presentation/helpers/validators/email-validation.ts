import { InvalidParamError } from "../../errors";
import { EmailValidator } from "../../protocols/email-validator";
import { badRequest } from "../http/http-helper";
import { Validation } from "../../protocols/validation";

export class EmailValidation implements Validation{
  constructor(protected fieldName:string,protected emailValidator: EmailValidator){}
  validate(input:any): Error{
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
        return new InvalidParamError(this.fieldName)
    }
  }
}