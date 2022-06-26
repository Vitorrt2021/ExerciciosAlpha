import { Pool } from 'pg';
import config from '../../config/index';

export default class PostgresDB {
  protected pool: Pool;

  public constructor() {
    let port
    if (config.postgres.port){
      port = parseInt(config.postgres.port)
    }else{
      port = 5432
    }
    this.pool = new Pool({
      host: config.postgres.host,
      user: config.postgres.user,
      password: config.postgres.password,
      database: config.postgres.database,
      port: port,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
}
