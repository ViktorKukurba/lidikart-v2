var path = require('path');
var fs = require('fs');
var distFolder = path.resolve(__dirname, '../dist/lidikart-v2');
var index = path.resolve(distFolder, 'index.html');
var header = path.resolve(distFolder, 'header.html');
var body = path.resolve(distFolder, 'body.html');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function bundleTemplates() {
  const page_content = fs.readFileSync(index, 'utf-8');
  const dom = new JSDOM(page_content);
  const header_html = dom.window.document.querySelector('head').innerHTML;
  const body_html = dom.window.document.querySelector('body').innerHTML;

  fs.writeFileSync(header, header_html, { flag: 'w' });
  fs.writeFileSync(body, body_html, { flag: 'w' });
}

exports.bundleTemplates = bundleTemplates;
