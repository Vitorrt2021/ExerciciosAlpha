class InternalServerError extends Error{
    constructor(msg){
        super(msg)
        this.name = 'InternalServerError'
        this.status = 500
    }
}

class BadRequest extends Error{
    public status: number 
    public name: string

    constructor(msg){
        super(msg)
        this.name = 'BadRequest'
        this.status = 400
    }
}

export default BadRequest
