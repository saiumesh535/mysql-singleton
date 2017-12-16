# mysql-singleton
Connecting MYSQL database in nodejs.

this package will create a MySQL pool connection, example as follows 

const mysql_singleton = require('mysql-singleton');

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ideas'
}

mysql_singleton.config(config)

// for new async await approach
const connection = await mysql_singleton.getConnectionPromise();

// for goof old callback 
 mysql_singleton.getConnection(function(err,connection){
        // handle err or connection 
    });

// writing queries 
connection.query("select * from table",(err,result)=>{
    // handle err or result
})
