
const buildWatercraftSelectSQL = (id,method) => {
        const table = 'Boats'
        let sql = `SELECT * FROM ${table}
                 WHERE Synthetic_Key= ${id}`;
        return sql;
};

export default buildWatercraftSelectSQL;