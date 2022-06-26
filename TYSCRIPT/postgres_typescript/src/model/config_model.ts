import PostgresConfig from './postgres_model'

interface Config{
    port: string | undefined 
    postgres: PostgresConfig 
}

export default Config