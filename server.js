// Import necessary Node.js modules
const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Handles serving files to the client.
 * @param {string} filePath - The path to the file to be served.
 * @param {string} contentType - The MIME type of the file.
 * @param {http.ServerResponse} res - The response object.
 */
const serveFile = (filePath, contentType, res) => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If the file is not found, send a 404 Not Found
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'pages', '404.html'), (error404, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    if (error404) {
                        res.end("<h1>404 Not Found</h1>");
                    } else {
                        res.end(content404);
                    }
                });
            } else {
                // For any other errors, send a 500 Internal Server Error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
                console.error(`Server Error: ${err.code}`);
            }
        } else {
            // If the file is read successfully, send it with a 200 OK status
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
};

// Create the HTTP server
const server = http.createServer((req, res) => {
    console.log(`Request received for: ${req.url}`);

    let filePath;
    let contentType;

    // Main router logic
    if (req.url === '/' || req.url === '/home') {
        filePath = path.join(__dirname, 'pages', 'home.html');
        contentType = 'text/html';
    } else if (req.url === '/aboutUs') {
        filePath = path.join(__dirname, 'pages', 'about.html');
        contentType = 'text/html';
    } else if (req.url === '/contact') {
        filePath = path.join(__dirname, 'pages', 'contact.html');
        contentType = 'text/html';
    } else if (req.url === '/style.css') {
        filePath = path.join(__dirname, 'public', 'style.css');
        contentType = 'text/css';
    } else if (req.url.startsWith('/images/')) {
        // Security check to prevent directory traversal attacks
        const safeUrl = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
        filePath = path.join(__dirname, 'public', safeUrl);

        // Determine content type from file extension
        const ext = path.extname(filePath).toLowerCase();
        switch (ext) {
            case '.png': contentType = 'image/png'; break;
            case '.jpg': case '.jpeg': contentType = 'image/jpeg'; break;
            case '.svg': contentType = 'image/svg+xml'; break;
            case '.gif': contentType = 'image/gif'; break;
            default:
                // Don't serve unknown file types from this path
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
                return;
        }
    } else {
        // Handle 404 for any other route by serving the file
        filePath = path.join(__dirname, 'pages', '404.html');
        contentType = 'text/html';
        serveFile(filePath, contentType, res);
        return;
    }

    // Serve the determined file
    serveFile(filePath, contentType, res);
});

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
