const http = require('http');
const fs = require('fs').promises
const url = require('node:url')
const path = require('path')
const querystring = require('querystring')

const TypeMime = {
    '.html': 'text/html',
    '.htm': 'text/html',
    '.js': 'test/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.ico': 'image/x-icon'
}

http.createServer(async (req, res) => {
    const myUrl = url.parse(req.url)
    const pathName = myUrl.pathname
    let fileName = pathName.substring(1)

    switch (pathName) {
        case '/':
            fileName = 'index.html'
            break
        case '/contact':
            fileName = 'contact.thml'
            break
        case '/blog':
            fileName = 'blog.html'
            break
        default:
            break
    }

    if (pathName === '/contact' && req.method === 'POST') {
        const body = []
        req.on('data', (chank) => {
            body.push(chank)
        })

        req.on('end', async () => {
            const parseBody = descodeURIComponent(Buffer.concat(body).toString())
            console.log(parseBody);
            const parseObj = querystring.parse(parseBody)
            console.log(parseObj);
            await fs.writeFile('message.json', JSON.stringify(parseObj, null, 2))
        })

        res.statusCode = 302

        res.setHeader('Location', '/contact.html')
        return res.end()
    }

    const type = TypeMime[path.extname(fileName)]

    if (type && type.includes('image')) {
        try {
            const img = await fs.readFile(fileName)
            res.writeHead(200, { 'Content-Type': type })
            res.write(img, 'hex')
            res.end()
        } catch (e) {
            console.log(e.message);
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end()
        }
    } else {
        try {
            const content = await fs.readFile(fileName, 'utf-8')
            res.writeHead(200, { 'Content-Type': type })
            res.write(content)
            res.end()
        } catch (e) {
            console.log(e.message);

            if (!type || type === 'text/html') {
                const content = await fs.readFile('404.html', 'utf-8')
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(content)
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
            }

            res.end()
        }
    }
}).listen(3002, () => console.log('Listen server on port 3002'))