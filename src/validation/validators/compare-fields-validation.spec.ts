import { InvalidParamError } from '../../presentation/errors' 
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field','fieldToCompare')
}

describe('CompareFieldsValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: 'any_field',
      fieldToCompare:'field'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'));

  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({
      field:'any_field',
      fieldToCompare:'any_field'
    })

    expect(error).toBeFalsy();

  })
})