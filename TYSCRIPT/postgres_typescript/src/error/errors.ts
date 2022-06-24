import IApiError from '../model/api_error_model'

export class InternalServerError extends Error implements IApiError{
    public name: string 
    public status: number
    
    constructor(msg: string){
        super(msg)
        this.name = 'InternalServerError'
        this.status = 500
    }
}

export class BadRequest extends Error implements IApiError{
    public name: string 
    public status: number

    constructor(msg: string){
        super(msg)
        this.name = 'BadRequest'
        this.status = 400
    }
}
