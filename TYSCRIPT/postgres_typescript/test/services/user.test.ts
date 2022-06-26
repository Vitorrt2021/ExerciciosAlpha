import CreateUser from '../../src/services/create_user_service'
import IUser from '../../src/model/user_model'
import {BadRequest} from '../../src/error/errors'

describe('CreateUser',()=>{
    describe('should have',()=>{
        const newUser = {
            name:'Vitor',
            email: "vitorrt2015@gmail.com",
            cpf:'31568262353',
            birthdate:'28/05/2003',
        }       
        const user: IUser = new CreateUser().execute(newUser)
        test('name',()=>{
            expect(user.name).toBe('Vitor')
        })
        test('date of birth',()=>{
            expect(user.birthdate).toBe('28/05/2003')
        })
        test('email',()=>{
            expect(user.email).toBe('vitorrt2015@gmail.com')
        })
        test('cpf',()=>{
            expect(user.cpf).toBe('31568262353')
        })
        test('id',()=>{
            expect(user.id).not.toBeNull()
        })
    })

    describe('Should be throw error with invalid ',()=>{
        const newUser= {
            name:'Vitor',
            email: "vitorrt2015@gmail.com",
            cpf:'31568262353',
            date_of_birth:'28/05/2003'
        }       
        test('name',()=>{    
            newUser.name = 'sada22'
            expect(()=>new CreateUser().execute(newUser)).toThrow(BadRequest);
        })
        test('date of birth',()=>{
            newUser.date_of_birth = '22/22/222'
            expect(()=>new CreateUser().execute(newUser)).toThrow(BadRequest);
        })
        test('email',()=>{
            newUser.email = 'sasd2.com'
            expect(()=>new CreateUser().execute(newUser)).toThrow(BadRequest);
        })
        test('cpf',()=>{
            newUser.cpf = '22231232'
            expect(()=>new CreateUser().execute(newUser)).toThrow(BadRequest);
        })
    })
})