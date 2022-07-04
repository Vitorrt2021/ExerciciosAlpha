import PostgresDB from './index';
import IUser from '../../model/user_model';
import { Result } from '../../utils/result';
import { BadRequest, InternalServerError } from '../../error/errors';

class UserTable extends PostgresDB {
  public async insert(user: IUser): Promise<Result<boolean>> {
    try {
      const client = await this.pool.connect();
      const query = `
              INSERT INTO users (id, name,birthdate,cpf)
              VALUES ($1,$2,$3,$4)
              RETURNING id;
          `;
      await client.query(query, [user.id, user.name, user.birthdate, user.cpf]);
      return Result.ok();
    } catch (e) {
      console.log(e);
      return Result.fail<boolean>(new InternalServerError('Service temporarily unavailable'));
    }
  }
  
  public async findByCpf(cpf: string): Promise<Result<string>>{
    try{
      const client = await this.pool.connect();
      const query = `
              SELECT id
              FROM users
              WHERE cpf = $1
          `;

      const result = await client.query(query, [cpf]);
      if(result.rows.length !== 0){
        return Result.ok<string>(result.rows[0].id) 
      }
      return Result.fail<string>(new BadRequest("User don't exist"))
    } catch (e: any) {
      console.log(e);
      return Result.fail<string>(new InternalServerError('Service temporarily unavailable'));
    }
  }
}
export default UserTable;
