import { DataSource } from 'typeorm';
import ormconfig from '../../ormconfig-migration';
import { PopularBanco1698897771229 } from './migrations/1698897771229-PopularBanco';
ormconfig['migrations'] = [PopularBanco1698897771229 as any];

const dataSource = new DataSource(ormconfig as any);
export default dataSource;
