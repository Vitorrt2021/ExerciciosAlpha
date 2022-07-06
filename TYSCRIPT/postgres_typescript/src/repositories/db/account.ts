import PostgresDB from './index';
import { BadRequest, InternalServerError } from '../../error/errors';
import IAccount from '../../model/account_model';
import ExtractQuery from '../../model/extract_query_model';
import { Result } from '../../utils/result';
class AccountTable extends PostgresDB {
  public async insert(account: IAccount): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      const query = `          
            INSERT INTO accounts(id,user_id,agency_number,agency_verification_code,account_number, account_verification_code,password,email)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING id;
          `;
      const values = [account.id, account.user_id, account.agency_number, account.agency_verification_code, account.account_number, account.account_verification_code, account.password, account.email];
      await client.query(query, values);
      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerError('Service temporarily unavailable');
    }
  }

  public async get(accountId: string): Promise<Result<any> | undefined> {
    try {
      const client = await this.pool.connect();
      const query = `          
            SELECT * FROM accounts
            WHERE accounts.id = $1;
          `;
      const values = [accountId];
      const result = await client.query(query, values);
      
      if(!result.rows[0]){      
        return Result.fail(new BadRequest("Account don't exist"));
      }
      return Result.ok(result.rows[0]);
    } catch (e) {
      console.log(e);
      Result.fail(new InternalServerError('Service temporarily unavailable'))
    }
  }

  public async isOwner(accountId: string): Promise<Result<Array<any>>> {
    try {
      const client = await this.pool.connect();
      const query = `          
            SELECT users.cpf FROM accounts
            LEFT JOIN users ON users.id = accounts.user_id
            WHERE accounts.id = $1;
          `;
      const values = [accountId];
      const result = await client.query(query, values);
      return Result.ok(result.rows);
    } catch (e) {
      console.log(e);
      return Result.fail(new InternalServerError('Service temporarily unavailable'))
    }
  }

  public async getPassword(accountId: string):Promise<string | null>{
    try {
      const client = await this.pool.connect();
      const query = `          
              SELECT password 
              FROM accounts
              WHERE id = $1
          `;
      const values = [accountId];
      const result = await client.query(query, values);
      if(result.rows.length == 0){
        return null
      }
      return result.rows[0].password
    } catch (e) {
      console.log(e);
      throw new InternalServerError('Service temporarily unavailable');
    }
  } 

  public async deposit(accountId: string, value: number): Promise<Result<any>> {
    try {
      const client = await this.pool.connect();
      const query = `                       
            UPDATE accounts
            SET balance = balance + $2
            WHERE id = $1
            RETURNING *;
          `;
      const values = [accountId, value];
      const result = await client.query(query, values);
      return Result.ok(result.rows[0])
    } catch (e) {
      console.log(e);
      return Result.fail(new InternalServerError('Service temporarily unavailable'));
    }
  }

  public async draft(accountId: string, value: number): Promise<Result<any>> {
    try {
      const client = await this.pool.connect();
      const query = `                       
            UPDATE accounts
            SET balance = balance - $2
            WHERE id = $1
            RETURNING *;
          `;
      const values = [accountId, value];
      const result = await client.query(query, values);
      return Result.ok(result.rows[0])
    } catch (e) {
      console.log(e);
      return Result.fail(new InternalServerError('Service temporarily unavailable'));
    }
  }

  public async getBalance(accountId: string): Promise<number> {
    try {
      const client = await this.pool.connect();
      const query = `                       
          SELECT balance 
          FROM accounts
          WHERE id = $1;
       `;
      const values = [accountId];
      const result = await client.query(query, values);

      return result.rows[0].balance;
    } catch (e) {
      console.log(e);
      throw new InternalServerError('Service temporarily unavailable');
    }
  }

  public async find(account: IAccount): Promise<Result<string>> {
    try {
      const client = await this.pool.connect();
      const query = `          
          SELECT id 
          FROM accounts
          WHERE agency_number = $1 and agency_verification_code = $2 and account_number = $3 and account_verification_code = $4 ;
      `;
      const values = [account.agency_number, account.agency_verification_code, account.account_number, account.account_verification_code];
      const result = await client.query(query, values);
      if (result.rows.length == 0) {
        return Result.fail(new BadRequest("Account don't exist"));
      }
      return Result.ok(result.rows[0].id);
    } catch (e) {
      console.log(e)
      return Result.fail<string>(new InternalServerError('Service temporarily unavailable'))
    }
  }
  
  public async getName(accountId: string): Promise<string> {
    try {
      const client = await this.pool.connect();
      const query = `                       
          SELECT users.name as name 
          FROM accounts
          LEFT JOIN users ON users.id = accounts.user_id
          WHERE accounts.id = $1;
       `;
      const values = [accountId];
      const result = await client.query(query, values);

      return result.rows[0].name;
    } catch (e) {
      console.log(e);
      throw new InternalServerError('Service temporarily unavailable');
    }
  }

  public async extract(accountId: string): Promise<Array<ExtractQuery>> {
    try {
      const client = await this.pool.connect();
      const query = `          
      SELECT type,total_value as value, tax, transactions.created_at as date, destiny_account = $1 as receive_transfer, destiny_account, account as origin_account 
        FROM transactions
        LEFT JOIN accounts ON accounts.id = $1
        WHERE account = $1 or destiny_account = $1
        ORDER BY transactions.created_at DESC;
      `;
      const values = [accountId];
      const result = await client.query(query, values);
      return result.rows;
    } catch (e) {
      throw new InternalServerError('Service temporarily unavailable');
    }
  }
}

export default AccountTable;
