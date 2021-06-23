import { EmailValidatorAdapter } from "./email-validator"

describe('EmailValidator Adapter',()=>{
  test('Should return false if validator returns false',()=>{
    const sut =  new EmailValidatorAdapter()
    const isvalid=sut.isValid("invalid_email@mail.com")
    expect(isvalid).toBe(false)
  })
})