import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";


const config: SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'fotostash',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true // note: Remove for prod
}

export default config;