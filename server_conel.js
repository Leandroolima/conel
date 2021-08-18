const http = require('http');
const app = require('./app');
const port = process.env.PORT || 2000;
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log("rodando aqui" + JSON.stringify({"user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT}))
});
