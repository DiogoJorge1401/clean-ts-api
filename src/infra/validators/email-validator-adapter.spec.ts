import { EmailValidatorAdapter } from "./email-validator-adapter"
import validator from "validator"
jest.mock('validator',()=>({
  isEmail ():boolean {
    return true
  }
}))

const makeSut=():EmailValidatorAdapter=>{
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter',()=>{
  test('Should return false if validator returns false',()=>{
    const sut = makeSut()
    jest.spyOn(validator,'isEmail',).mockReturnValueOnce(false)
    const isvalid=sut.isValid("invalid_email")
    
    expect(isvalid).toBe(false)
  })
  test('Should return true if validator returns true',()=>{
    const sut = makeSut()
    const isvalid=sut.isValid("valid_email@mail.com")
    expect(isvalid).toBe(true)
  })
  test('Should call validator with correct email',()=>{
    const sut = makeSut()
    const isEmailSpy=jest.spyOn(validator,'isEmail')
    sut.isValid("any_email@mail.com")
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com")
  })
})