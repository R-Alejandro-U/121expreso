/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';
const data: NodeJS.ProcessEnv = process.env;
export const PORT: number = data['PORT'] ? parseInt(data['PORT'], 10) : 3000;
export const CONECTION_STREAM: string | undefined = data['CONECTION_STREAM'];
const DB_TYPE: any = data['DB_TYPE'] ?? 'mysql';
const DB_HOST: string | undefined = data['DB_HOST'];
const DB_PORT: number | undefined = data['DB_PORT']
  ? parseInt(data['DB_PORT'], 10)
  : 3306;
const DB_USERNAME: string | undefined = data['DB_USERNAME'];
const DB_PASSWORD: string | undefined = data['DB_PASSWORD'];
const DB_NAME: string | undefined = data['DB_NAME'];
const DB_SYNCHRONIZE: boolean | undefined = data['DB_SYNCHRONIZE']
  ? data['DB_SYNCHRONIZE'] == 'true'
  : true;
const DB_LOGGING: boolean | undefined = data['DB_LOGGING']
  ? data['DB_LOGGING'] == "true"
  : true;
const DB_DROPSCHEMA: boolean | undefined = data['DB_DROPSCHEMA']
  ? data['DB_DROPSCHEMA'] === 'true'
  : false;
export const dbConfig = {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: DB_SYNCHRONIZE,
  logging: DB_LOGGING,
  dropSchema: DB_DROPSCHEMA,
};
export const SALT: number = data["SALT"] ? parseInt(data["SALT"], 10) : 10;
export const SECRET_WORD: string = data['SECRET_WORD'] ?? "";
export const API_KEY: string = data["API_KEY"] ?? '';