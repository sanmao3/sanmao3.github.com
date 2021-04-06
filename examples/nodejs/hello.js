const http = require('http');
const path = require("path");
const formidable = require('formidable');
const fs = require('fs');
const os = require('os');

const server = http.createServer((req, res) => {
	if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
		// parse a file upload
		const form = new formidable.IncomingForm();

		form.keepExtensions = true;
		form.uploadDir = '/';
		console.log(os.tmpdir())

		form.parse(req, (err, fields, files) => {
			if (err) {
				res.write("{ \"error\": \"" + err.message + "\"}");
				res.end();
			} else {
				const file = files.multipleFiles;
				//console.log(file)
				fs.rename(file.path, './files/' + file.name, (err) => {
					if (err) {
						console.log(err)
					}
				})
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				res.end(JSON.stringify({
					fields,
					files
				}, null, 2));
			}
		});

		return;
	}

	// show a file upload form
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.end(`
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
    <h2>With Node.js <code>"http"</code> module</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="multipleFiles" /></div>
      <input type="submit" value="Upload" />
    </form>
		</body>
		</html>
  `);
});

server.listen(8080, () => {
	try {
		fs.accessSync('files/tmp', fs.F_OK);
		console.log('ok')
	} catch (e) {
		console.log('no access')
	}
	console.log('Server listening on http://localhost:8080/ ...');
});
