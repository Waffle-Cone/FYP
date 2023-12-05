import buildPreparedStatement from "../buildPreparedStatment.js";

const buildWatercraftDeleteSQL = () => {
    const table = 'Boats'
    return `DELETE FROM ${table} WHERE Synthetic_Key=:Synthetic_Key`;
};

export default buildWatercraftDeleteSQL;