import 'dotenv/config'; // Carga automáticamente las variables del archivo .env
import { Client } from 'pg'; // 'pg' es el driver oficial de PostgreSQL para Node.js

// Función principal async — usa await para manejar la asincronía de la conexión y queries
const main = async () => {
    // Crea un cliente de conexión con los parámetros de la BD
    // Usa variables de entorno del .env; si no existen, usa valores por defecto
    const client = new Client({
       user: process.env.DB_USER   || 'localhost', // servidor de BD (|| = operador OR, usa 'localhost' si la var no existe)
           password: process.env.DB_PASSWORD || '', // puerto (5432 es el default de PostgreSQL)
           host: process.env.DB_HOST     || 'postgres',  // usuario de BD
           port: process.env.DB_PORT  ? Number(process.env.DB_PORT) : 5432, ,          // contraseña
       database: process.env.DB_NAME || 'fcad_cursos', // nombre de la base de datos
    });

    try {
        await client.connect(); // abre la conexión TCP con el servidor PostgreSQL (async)

        // Ejecuta la query SQL — await espera a que PostgreSQL devuelva el resultado
        const result = await client.query('SELECT * FROM public.cursos');

        // result.rows es un array de objetos, cada uno representa una fila de la tabla
        result.rows.forEach(row => {
            console.log(row); // imprime cada fila como objeto JavaScript
        });
    } catch (err) {
        // Captura errores de conexión o de la query
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1; // indica al SO que el proceso terminó con error (sin detener el finally)
    } finally {
        // finally se ejecuta SIEMPRE — importante cerrar la conexión tanto si hubo éxito como error
        try {
            await client.end(); // cierra la conexión con PostgreSQL
        } catch {
            // ignora errores al cerrar (la conexión puede ya estar cerrada)
        }
    }
}

main(); // invoca la función principal

// Exportar el pool para que los repositorios puedan utilizarlo
export default pool;