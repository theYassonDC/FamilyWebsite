const mysql = require('mysql');
const { database } = require('./keys');
const { promisify }  = require('util')
const pool = mysql.createPool(database);

pool.getConnection((err, conection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONECTION_LOST'){
            console.log('Error conection database code [!]')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('Count error conections')
        }
        if(err.code === 'ECONREFUSED'){
            console.log(`coneccion rechazada !`)
        }
    }
    if(conection) conection.release();
    console.log('Conectado a la base de datos mysql!!')
    return;
})
// promesas mysql sin callback
pool.query = promisify(pool.query);
module.exports = pool;