import PostgresDB from './db/index';
import IUser from '../../model/user_model';

class UserTable extends PostgresDB {
  public insert(user: IUser): Promise<boolean> {
    const query = `
            INSERT INTO user (id, name, email, birstdate)
            VALUES (1$,2$,3$,4%)
        `;
    await this.pool.query(query, [user.id, user.name, user.email, user.date_of_birth]);
  }
}

export default UserTable;
