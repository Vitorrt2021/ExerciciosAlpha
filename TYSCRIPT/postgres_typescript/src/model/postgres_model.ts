interface PostgresConfig{
    host: string | undefined,
    port: unknown,
    user: string | undefined ,
    password: string | undefined,
    database: string | undefined
}

export default PostgresConfig