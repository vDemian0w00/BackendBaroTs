//modules
import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as sessionModule from "express-session";
import session from "express-session";
import MySQLModule from "express-mysql-session";
import cookieParser from "cookie-parser";

//env variables
import { PORT, SECRET } from "./config.js";

//routes
import pruebaRoutes from "./routes/prueba.routes.js";
import usersRoutes from "./routes/users.routes.js";
import ingresosRoutes from "./routes/ingresos.routes.js";
import gastosRoutes from "./routes/gastos.routes.js";

//global
import { pool } from "./DB/DB.js";
import { sendfile } from "./middleware/front.js";

//session store
const MySQLStore = MySQLModule(sessionModule);
const sessionStore = new MySQLStore({}, pool);

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
export const __public = join(__dirname, "../client/dist");

//middlewares
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.static(__public));

//session and cookies
app.use(cookieParser());
app.use(
  session({
    secret: SECRET!,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

//custom middleware
app.use("/", sendfile);

//routes
app.use("/api", pruebaRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/ingresos", ingresosRoutes);
app.use("/api/gastos", gastosRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
