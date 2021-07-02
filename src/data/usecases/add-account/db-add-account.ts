import { 
  AccountModel,
  Hasher,AddAccount, 
  AddAccountModel, 
  AddAccountRepository, 
  LoadAccountByEmailRepository 
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount{

  constructor(
    protected hasher: Hasher,
    protected addAccountRepository:AddAccountRepository,
    protected loadAccountByEmailRepository:LoadAccountByEmailRepository
    ){}
  
  async add(accountData:AddAccountModel): Promise<AccountModel>{
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    const hashedPassword = await this.hasher.hash(accountData.password)

    const account=await this.addAccountRepository.add(Object.assign({},accountData,{password:hashedPassword}))

    return account
  }
}