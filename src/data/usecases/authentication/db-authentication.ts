import { Authentication, AuthenticationModel } from "../../../domain/usecases/authentication";
import { HashCompare } from "../../protocols/criptography/hash-compare";
import { TokenGenerator } from "../../protocols/criptography/token-generate";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-by-email-repository";

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  private readonly hashCompareStub: HashCompare
  private readonly tokenGeneratorStub: TokenGenerator

  constructor(
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
    hashCompareStub: HashCompare,
    tokenGeneratorStub: TokenGenerator
  ) {
    this.loadAccountByEmailRepositoryStub = loadAccountByEmailRepositoryStub

    this.hashCompareStub = hashCompareStub

    this.tokenGeneratorStub = tokenGeneratorStub
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepositoryStub.load(authentication.email)

    if (account) {
      const isValid = await this.hashCompareStub.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGeneratorStub.generate(account.id)

        return accessToken
      }
    }
    return null
  }
}