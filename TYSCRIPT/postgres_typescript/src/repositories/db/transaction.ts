import PostgresDB from './index';
import { InternalServerError } from '../../error/errors';
import ITransaction from '../../model/transaction_model';

class TransactionTable extends PostgresDB {
  public async insert(transaction: ITransaction): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      const query = `          
        INSERT INTO transactions (id,account,destiny_account,value,type,tax,total_value)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING id;
      `;
      const values = [transaction.id, transaction.account, transaction.destiny_account, transaction.value, transaction.type, transaction.tax, transaction.total_value];
      await client.query(query, values);
      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerError('Service temporarily unavailable');
    }
  }

}

export default TransactionTable;
