import { 
  AccountModel,
  Hasher,AddAccount, 
  AddAccountModel, 
  AddAccountRepository 
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount{

  constructor(protected hasher: Hasher,protected addAccountRepository:AddAccountRepository){}
  
  async add(accountData:AddAccountModel): Promise<AccountModel>{
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account=await this.addAccountRepository.add(Object.assign({},accountData,{password:hashedPassword}))
    return account
  }
}