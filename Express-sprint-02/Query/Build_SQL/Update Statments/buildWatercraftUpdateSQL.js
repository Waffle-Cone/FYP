import buildPreparedStatement from "../buildPreparedStatment.js";

const buildWatercraftUpdateSQL = () => {
    const table = 'Boats'
    const mutableFields = ['Registration','Model_ID','Boat_Img','Status_ID']
    return `UPDATE ${table} ` + buildPreparedStatement(mutableFields) + ` WHERE Synthetic_Key=:Synthetic_Key`;
};

export default buildWatercraftUpdateSQL;