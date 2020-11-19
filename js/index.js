const http = require('http');
const fs = require('fs').promises;

const port = 80;

const requestHandler = (req, res) => {
    if (req.url === '/') {
        fs.readFile(__dirname + '/../index.html')
            .then(contents => {
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(contents);
            });
    } else {
        fs.readFile(__dirname + '/..' + req.url)
            .then(contents => {
                res.setHeader('Content-Type', mimeTypes(req.url.split('.').pop()));
                res.writeHead(200);
                res.end(contents);
            });
    }
};

const mimeTypes = (ext) => {
    let res;
    switch (ext) {
        case 'js':
            res = 'text/javascript';
            break;
        case 'css':
            res = 'text/css';
            break;
        case 'html':
            res = 'text/html';
            break;
        case 'jpg':
        case 'jpeg':
            res = 'image/jpeg';
            break;
        case 'png':
            res = 'image/png';
            break;
    }

    return res;
};

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});