import { AuthenticationModel } from "../../../domain/usecases/authentication";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-by-email-repository";

export class DbAuthentication implements AuthenticationModel{
  private readonly loadAccountByEmailRepositoryStub:LoadAccountByEmailRepository

  constructor(loadAccountByEmailRepositoryStub:LoadAccountByEmailRepository){
    this.loadAccountByEmailRepositoryStub = loadAccountByEmailRepositoryStub
  }
  email: string;
  password: string;
  async auth(authentication:AuthenticationModel): Promise<string>{
    await this.loadAccountByEmailRepositoryStub.load(authentication.email)
    return null
  }
}