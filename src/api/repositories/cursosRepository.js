import pool from '../config/db.js';

const obtenerTodosLosCursos = async () => {
    // Se escribe la consulta SQL nativa
    const consulta = 'SELECT * FROM cursos;';
    
    // Se ejecuta la consulta a través del Pool
    const resultado = await pool.query(consulta);
    
    // Se devuelve el arreglo de datos al servicio
    return resultado.rows;
};

export { obtenerTodosLosCursos };