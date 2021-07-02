export class EmailInUseError extends Error{
  constructor(){
    super(`The received email id alredy in use`);
    this.name='EmailInUseError'
  }
}