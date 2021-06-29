import { Authentication, AuthenticationModel } from "../../../domain/usecases/authentication";
import { HashCompare } from "../../protocols/criptography/hash-compare";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-by-email-repository";

export class DbAuthentication implements Authentication{
  private readonly loadAccountByEmailRepositoryStub:LoadAccountByEmailRepository
  private readonly hashCompareStub:HashCompare

  constructor(
    loadAccountByEmailRepositoryStub:LoadAccountByEmailRepository,
    hashCompareStub:HashCompare
    ){
    this.loadAccountByEmailRepositoryStub = loadAccountByEmailRepositoryStub
    this.hashCompareStub = hashCompareStub
  }

  async auth(authentication:AuthenticationModel): Promise<string>{
    const account = await this.loadAccountByEmailRepositoryStub.load(authentication.email)

    if(account){
      await this.hashCompareStub.compare(authentication.password,account.password)
    }

    return null
  }
}