import IUser from "../model/user_model";
import {BadRequest} from '../error/errors'

class ValidateUser{
    public isValid(user:IUser): boolean {
        this.emailValidate(user.email) 
        this.cpfValidate(user.cpf) 
        this.nameValidate(user.name) 
        this.dateOfBirthValidate(user.date_of_birth) 
       
        return true
    }

    private emailValidate(email: string){
        const regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
        if(!regex.test(email)){
            throw new BadRequest('Invalid email')
        }
    }
    
    private cpfValidate(cpf: string){
        const regex = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm;

        if(!regex.test(cpf)){
            throw new BadRequest('Invalid cpf')
        }
    }
    
    private nameValidate(name: string){
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
        if(!regex.test(name)){
            throw new BadRequest('Invalid name')
        }
    }

    private dateOfBirthValidate(date: string){
        const regex = /^((?:(?=29[\/\-.]0?2[\/\-.](?:[1-9]\d)?(?:[02468][048]|[13579][26])(?!\d))29)|(?:(?=31[\/\-.](?!11)0?[13578]|1[02])31)|(?:(?=\d?\d[\/\-.]\d?\d[\/\-.])(?!29[\/\-.]0?2)(?!31)(?:[12][0-9]|30|0?[1-9])))[\/\-.](0?[1-9]|1[0-2])[\/\-.]((?:[1-9]\d)?\d{2})$/;
        if(!regex.test(date)){
            throw new BadRequest('Invalid birth date')
        }
    }
    
}

export default ValidateUser