import {Request, Response } from 'express';
// import IResponse from '../model/response_model';
import CreateUser from '../services/create_user_service';

export default  class CreateUserController{
    public handler(req: Request, res: Response){
        const user = new CreateUser().execute(req.body)
        res.send({
            data: user,
            message: "Success",
            status: 200
        })
    }
}