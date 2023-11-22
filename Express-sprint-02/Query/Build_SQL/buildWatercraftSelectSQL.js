
const buildWatercraftSelectSQL = (id) => {
    const table = 'Boats'
    let sql = `SELECT * FROM ${table}
            WHERE Registration= ${id}`;
    return sql;
};

export default buildWatercraftSelectSQL;