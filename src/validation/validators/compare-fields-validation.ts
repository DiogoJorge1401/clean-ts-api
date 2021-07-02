import { InvalidParamError } from "../../presentation/errors";
import { Validation } from "../../presentation/protocols/validation";

export class CompareFieldsValidation implements Validation{
  constructor(protected fieldName:string,protected fieldToCompareName:string){}
  validate(input:any): Error{
    if(input[this.fieldName]!==input[this.fieldToCompareName]){
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}