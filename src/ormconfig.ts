import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config : PostgresConnectionOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5434,
    username : 'postgres',
    password : '123456',
    database : 'blog',
    entities : [__dirname + '/**/*.entity.{ts,js}'],
    migrationsTableName : 'migrations',
    migrations : [__dirname + '/migrations/**/*.ts']
}
const AppDataSource = new DataSource(config)
export { AppDataSource };
export default config;