import config from '../../config/index'

import { Pool } from "pg";

export default class PostgresDB{
    private pool: Pool
    
    public constructor(){
        this.pool = new Pool({
            host: config.postgres.host 
            user: config.postgres.user,
            password: config.postgres.password,
            database: config.postgres.database,
            port: config.postgres.port,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        })
    }
}