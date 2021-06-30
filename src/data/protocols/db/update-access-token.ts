export interface updateAccessTokenRepository{
  updateAccessToken(id: string,token: string): Promise<void>
}