Connecting MySQL database.

example

```js
npm install mysql-singleton --save
const mysql_singleton = require('mysql-singleton');
const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database'
}

app.use(mysql_singleton(config));

app.get('/users', function(req, res, next) {
    req.getConnection(function(err, connection) {
        if(!err) {
            // writing queries 
              connection.query("select * from table",(err,result)=>{
              // handle result or err             
          })
        }else {
            throw err;
        }
    });
});

```
