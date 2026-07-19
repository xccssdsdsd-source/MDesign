import {createServer} from 'http'
import {readFile} from 'fs/promises'
import {extname, join, normalize} from 'path'

const root = process.cwd()
const port = process.env.PORT || 5050
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json'}

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0])
    if (p === '/') p = '/index.html'
    const file = normalize(join(root, p))
    if (!file.startsWith(root)) { res.writeHead(403); return res.end() }
    const data = await readFile(file)
    res.writeHead(200, {'Content-Type': types[extname(file)] || 'application/octet-stream'})
    res.end(data)
  } catch {
    res.writeHead(404, {'Content-Type':'text/plain'}); res.end('404')
  }
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`))
