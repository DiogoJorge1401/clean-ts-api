import { HttpResponse, HttpRequest, Controller, AddAccount, Validation, Authentication } from "./singup-controller-protocols"
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

export class SingUpController implements Controller {
    constructor(
        protected addAccount: AddAccount, 
        protected validation: Validation,
        protected authentication:Authentication
        ) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { name, email, password } = httpRequest.body
            const account = await this.addAccount.add({
                name,
                email,
                password,
            })
            await this.authentication.auth({
                email, 
                password 
            })
            return ok(account)
        }
        catch (erro) {
            return serverError(erro)
        }
    }
}