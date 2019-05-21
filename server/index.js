const server = require('./app');

// write your code here

const port = 8484;
server.listen(port, () => {
    console.log(`server is listening on ${port}`);
})
