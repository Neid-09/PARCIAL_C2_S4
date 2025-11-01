import mysql from "mysql2/promise";

let conexion = await mysql.createConnection({
	host: "localhost",
	database: "contactos",
	user: "root",
	password: "root",
});

export { conexion };