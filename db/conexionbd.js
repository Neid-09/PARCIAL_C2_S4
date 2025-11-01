import mysql from "mysql2";

let conexion = mysql.createConnection({
	host: "localhost",
	database: "contactos",
	user: "root",
	password: "root",
});

conexion.connect(function (err) {
	if (err) {
		throw err;
	} else {
		console.log("conexion exitosa");
	}
});

export { conexion };