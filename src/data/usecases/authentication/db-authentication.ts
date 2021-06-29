import {
  Authentication, 
  AuthenticationModel,
  HashCompare,
  TokenGenerator,
  LoadAccountByEmailRepository,
  updateAccessTokenRepository,
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  private readonly hashCompareStub: HashCompare
  private readonly tokenGeneratorStub: TokenGenerator
  private readonly updateAccessTokenRepositoryStub: updateAccessTokenRepository

  constructor(
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
    hashCompareStub: HashCompare,
    tokenGeneratorStub: TokenGenerator,
    updateAccessTokenRepositoryStub: updateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepositoryStub = loadAccountByEmailRepositoryStub

    this.hashCompareStub = hashCompareStub

    this.tokenGeneratorStub = tokenGeneratorStub

    this.updateAccessTokenRepositoryStub = updateAccessTokenRepositoryStub
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepositoryStub.load(authentication.email)

    if (account) {
      const isValid = await this.hashCompareStub.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGeneratorStub.generate(account.id)

        await this.updateAccessTokenRepositoryStub.update(account.id, accessToken)

        return accessToken
      }
    }
    return null
  }
}