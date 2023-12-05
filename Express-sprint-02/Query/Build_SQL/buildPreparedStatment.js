const buildPreparedStatement =(fields) => fields.reduce((setSQL, field, index) => 
setSQL +`${field}=:${field}`+ ((index===fields.length - 1) ?' ' : ', '), 'SET ');

export default buildPreparedStatement;

