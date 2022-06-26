import PostgresDB from './index';
import { BadRequest, InternalServerError } from '../../error/errors';
import IAccount from '../../model/account_model';

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

  public async deposit(accountId: string, value: number): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      const query = `                       
            UPDATE accounts
            SET balance = balance + $2
            WHERE id = $1;
          `;
      const values = [accountId, value];
      await client.query(query, values);
      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerError('Service temporarily unavailable');
    }
  }

  public async draft(accountId: string, value: number): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      const query = `                       
            UPDATE accounts
            SET balance = balance - $2
            WHERE id = $1;
          `;
      const values = [accountId, value];
      await client.query(query, values);
      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerError('Service temporarily unavailable');
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

  public async find(account: IAccount): Promise<string | null> {
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
        return null;
      }
      return result.rows[0].id;
    } catch (e) {
      throw new InternalServerError('Service temporarily unavailable');
    }
  }

  public async extract(accountId: string): Promise<Array<Object>> {
    try {
      const client = await this.pool.connect();
      const query = `          
      SELECT type,value,tax,total_value, transactions.created_at,account, ( CASE  destiny_account
                                                                              WHEN $1 THEN true
                                                                              ELSE false
                                                                              END 
                                                                            ) as receive_transfer
        FROM transactions
        LEFT JOIN accounts ON accounts.id = $1
        LEFT JOIN users ON users.id = accounts.user_id  
        WHERE account = $1 or destiny_account = $1
        ORDER BY transactions.created_at;
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
