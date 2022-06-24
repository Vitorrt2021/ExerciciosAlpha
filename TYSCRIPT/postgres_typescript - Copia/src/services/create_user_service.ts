import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ValidateUser from '../validator/user_validate';
import IUser from '../model/user_model';

export default class CreateUser{
    execute(req: any): IUser{
        const user: IUser = {
            name: req.name ,
            email: req.email,
            cpf: req.cpf,
            date_of_birth: req.date_of_birth,
            id: uuidv4()
        }
        new ValidateUser().isValid(user)
        return user
    }
    
}
