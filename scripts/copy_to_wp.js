var ncp = require('ncp').ncp;
var path = require('path');
var bundler = require('./generate_bundle_templates.js');
var pjson = require('../package.json');
var fs = require('fs');

ncp.limit = 16;

bundler.bundleTemplates();

const baseDestination = `/var/www/wp_lidikart/wp-content/themes/lidikart-v${pjson.version}/`;
const FOLDERS_FILES_TO_COPY = ['dist', 'inc', 'functions.php', 'index.php', 'header.php', 'footer.php', 'style.css', 'screenshot.png'];
const errorHandler = function(source) {
  return function (err) {
    if (err) {
      return console.error(err);
    }
    console.log(source + ' copied successfully');
  }
}

if (!fs.existsSync(baseDestination)){
  fs.mkdirSync(baseDestination);
}

console.log(`Build destination: ${baseDestination}`);
FOLDERS_FILES_TO_COPY.forEach(function (f) {
  ncp(f, path.resolve(baseDestination, f), errorHandler(f));
});
