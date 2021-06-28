import { MissingParamError } from "../../errors"
import { RequiredFieldValidation } from "./required-field-validation"

describe('Requiredfield Validation',()=>{
  test('Should return a MissingParamError if validation fails',()=>{
    const sut = new RequiredFieldValidation('field')

    const error = sut.validate({ name:'any_name',email:'any_email' })

    expect(error).toEqual(new MissingParamError('field'));

  })

  test('Should not return if validation succeeds',()=>{
    const sut = new RequiredFieldValidation('field')

    const error = sut.validate({ field:'any_field'})

    expect(error).toBeFalsy();

  })
})