export interface updateAccessTokenRepository{
  update(id: string,token: string): Promise<void>
}