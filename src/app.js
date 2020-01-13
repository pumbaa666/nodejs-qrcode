const express = require('express');
const domain = 'localhost';
const port = 8081;

async function start() {
    const expressApp = express();
    require('./routes/index')(expressApp);
    await expressApp.listen(port, domain);
    console.log('app listening on http://' + domain + ':' + port);
}
start();
