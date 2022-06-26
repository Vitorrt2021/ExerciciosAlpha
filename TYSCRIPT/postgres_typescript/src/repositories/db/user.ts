import PostgresDB from './index';
import IUser from '../../model/user_model';
import { InternalServerError } from '../../error/errors';

class UserTable extends PostgresDB {
  public async insert(user: IUser): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      const query = `
              INSERT INTO users (id, name,birthdate,cpf)
              VALUES ($1,$2,$3,$4)
              RETURNING id;
          `;
      await client.query(query, [user.id, user.name, user.birthdate, user.cpf]);
      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerError('Service temporarily unavailable');
    }
  }
  
  public async findByCpf(cpf: string){
    const client = await this.pool.connect();
    const query = `
            SELECT id
            FROM users
            WHERE cpf = $1
        `;

    const result = await client.query(query, [cpf]);
    if(result.rows.length !== 0){
      return result.rows[0].id 
    }
    return null
  } catch (e: Error) {
    console.log(e);
    throw new InternalServerError('Service temporarily unavailable');
  }
}
export default UserTable;
