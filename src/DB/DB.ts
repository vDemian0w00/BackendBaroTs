import { createPool } from "mysql2/promise";
import {
  MYSQLDATABASE,
  MYSQLHOST,
  MYSQLPASSWORD,
  MYSQLPORT,
  MYSQLUSER,
} from "../config.js";
import { PoolOptions } from "mysql2/typings/mysql/index.js";

export const OPTIONS_DB: PoolOptions = {
  host: MYSQLHOST,
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
  database: MYSQLDATABASE,
  port: MYSQLPORT,
};
export const pool = createPool(OPTIONS_DB);
