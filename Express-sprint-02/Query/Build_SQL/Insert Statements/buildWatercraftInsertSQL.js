
const buildWatercraftInsertSQL = (record) => {
    const table = 'Boats'
    const mutableFields = ['Boat_Img','Registration','Model_ID','Status_ID']
    return `INSERT INTO  ${table} SET
            Boat_Img=:Boat_Img,
            Registration=:Registration,
            Model_ID=:Model_ID,
            Status_ID=:Status_ID`;

};

export default buildWatercraftInsertSQL;