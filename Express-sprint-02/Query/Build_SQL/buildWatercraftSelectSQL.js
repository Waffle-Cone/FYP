
const buildWatercraftSelectSQL = (id,method) => {
    if(method ==='PUT')
    {
        const table = 'Boats'
        let sql = `SELECT * FROM ${table}
                 WHERE Synthetic_Key= ${id}`;
        return sql;
    }
    else{
        const table = 'Boats'
        let sql = `SELECT * FROM ${table}
                 WHERE Registration= ${id}`;
        return sql;
    }
    
};

export default buildWatercraftSelectSQL;