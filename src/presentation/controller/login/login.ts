import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { EmailValidator } from "../singup/singup-protocols";

export class LoginController implements Controller{
  private readonly emailValidator: EmailValidator
  
  constructor(emailValidator:EmailValidator){
    this.emailValidator= emailValidator
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
    const email = httpRequest.body.email
    const password = httpRequest.body.password
    const isValid = this.emailValidator.isValid(email)
    if(!email){
      return new Promise(resolve=>resolve(badRequest(new MissingParamError('email'))))
    }
    if(!password){
      return new Promise(resolve=>resolve(badRequest(new MissingParamError('password'))))
    }

    if(!isValid){
      return new Promise(resolve=>resolve(badRequest(new InvalidParamError('email'))))
    }
  }
}