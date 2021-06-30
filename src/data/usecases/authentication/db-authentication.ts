import {
  Authentication, 
  AuthenticationModel,
  HashCompare,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor(
    protected loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
    protected hashCompareStub: HashCompare,
    protected encrypterrStub: Encrypter,
    protected updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepositoryStub.loadByEmail(authentication.email)

    if (account) {
      const isValid = await this.hashCompareStub.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypterrStub.encrypt(account.id)

        await this.updateAccessTokenRepositoryStub.updateAccessToken(account.id, accessToken)

        return accessToken
      }
    }
    return null
  }
}