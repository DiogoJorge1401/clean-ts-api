import { HttpResponse, HttpRequest } from "../protocols/http"
import { MissingParamError } from "../errors/missing-param-error"
import { badRequest } from '../helpers/http-gelper'
export class SingUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email']
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
    }
}