import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "test",
    logging: true,
})

export default dataSource;