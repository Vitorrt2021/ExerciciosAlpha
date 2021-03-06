import IApiError from "../model/api_error_model";
export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean
    public error!: IApiError;
    private _value!: T;
  
    private constructor (isSuccess: boolean, error?: IApiError, value?: T) {
      if (isSuccess && error) {
        throw new Error(`InvalidOperation: A result cannot be 
          successful and contain an error`);
      }
      if (!isSuccess && !error) {
        throw new Error(`InvalidOperation: A failing result 
          needs to contain an error message`);
      }
  
      this.isSuccess = isSuccess;
      this.isFailure = !isSuccess;
      
      if (error){
        this.error = error;
      }
      if(value){
        this._value = value;
      }
      Object.freeze(this);
    }
  
    public getValue () : T {
      if (!this.isSuccess) {
        throw new Error(`Cant retrieve the value from a failed result.`)
      } 
      if(!this._value){
        throw new Error(`Cant retrieve the value undefined.`)  
      }
      return this._value;
    }
  
    public static ok<U> (value?: U) : Result<U> {
      return new Result<U>(true, undefined , value);
    }
  
    public static fail<U> (error: IApiError): Result<U> {
      return new Result<U>(false, error);
    }
  
    public static combine (results: Result<any>[]) : Result<any> {
      for (let result of results) {
        if (result.isFailure) return result;
      }
      return Result.ok<any>();
    }
  }