import dotenv from 'dotenv';
import Config from '../model/config_model'
dotenv.config();

let config: Config;

if(process.env.ENV == 'test'){
  config = {
    port: '1000',
    postgres: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_TEST,
    },
  };  
}else{
  config = {
    port: process.env.PORT,
    postgres: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  }
}
export default config