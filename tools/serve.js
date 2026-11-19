/*
  Máy chủ tĩnh cho local (Node thuần, không cần npm).
  Chạy:  node tools/serve.js        rồi mở http://localhost:5500
  Phục vụ thư mục gốc của dự án. URL không tồn tại → trả 404.html với mã 404 (giống hosting thật).
*/
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT) || 5500;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2'
};

/* Chuyển URL thành đường dẫn file trong ROOT; trả null nếu thoát khỏi ROOT (../). */
function resolveFile(urlPath) {
  let pathname;
  try {
    pathname = decodeURIComponent(urlPath.split('?')[0]);
  } catch (error) {
    return null;
  }
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = path.normalize(path.join(ROOT, pathname));
  return file.startsWith(ROOT) ? file : null;
}

function sendFile(res, status, file, body) {
  res.writeHead(status, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  res.end(body);
}

function send404(res) {
  const notFound = path.join(ROOT, '404.html');
  fs.readFile(notFound, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    sendFile(res, 404, notFound, data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }

  const file = resolveFile(req.url);
  if (!file) {
    send404(res);
    return;
  }

  fs.stat(file, (statError, stats) => {
    if (statError || !stats.isFile()) {
      send404(res);
      return;
    }
    fs.readFile(file, (readError, data) => {
      if (readError) {
        send404(res);
        return;
      }
      sendFile(res, 200, file, req.method === 'HEAD' ? '' : data);
    });
  });
});

server.listen(PORT, () => {
  console.log('Portfolio đang chạy tại http://localhost:' + PORT + '  (Ctrl+C để dừng)');
});
