import {
  Authentication, 
  AuthenticationModel,
  HashCompare,
  Encrypter,
  LoadAccountByEmailRepository,
  updateAccessTokenRepository,
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  private readonly hashCompareStub: HashCompare
  private readonly encrypterrStub: Encrypter
  private readonly updateAccessTokenRepositoryStub: updateAccessTokenRepository

  constructor(
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
    hashCompareStub: HashCompare,
    encrypterrStub: Encrypter,
    updateAccessTokenRepositoryStub: updateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepositoryStub = loadAccountByEmailRepositoryStub

    this.hashCompareStub = hashCompareStub

    this.encrypterrStub = encrypterrStub

    this.updateAccessTokenRepositoryStub = updateAccessTokenRepositoryStub
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepositoryStub.load(authentication.email)

    if (account) {
      const isValid = await this.hashCompareStub.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypterrStub.encrypt(account.id)

        await this.updateAccessTokenRepositoryStub.update(account.id, accessToken)

        return accessToken
      }
    }
    return null
  }
}