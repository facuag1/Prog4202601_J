import 'dotenv/config'; // Carga automáticamente las variables del archivo .env
import pg from 'pg';

const { Pool } = pg;

// Crear una nueva instancia del Pool de conexiones
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

// Verificar que la conexión se haya establecido correctamente (opcional pero recomendado)
pool.connect()
    .then(() => console.log('Conexión exitosa a PostgreSQL'))
    .catch((error) => console.error('Error al conectar a la base de datos:', error));

// Exportar el pool para que los repositorios puedan utilizarlo
export default pool;