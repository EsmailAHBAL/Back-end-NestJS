import { User } from './../Entities/User.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const db: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'Passw0rd',
  database: 'db_nest',
  entities: [User],
  synchronize: true,
};
