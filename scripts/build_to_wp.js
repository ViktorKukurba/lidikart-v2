const exec = require('child_process').exec;
const pjson = require('../package.json');

const deployUrl = `wp-content/themes/lidikart-v${pjson.version}/dist/`

const cmd = `ng build --prod --deploy-url=\"${deployUrl}\"`

console.log('cmd: ', cmd);

exec(cmd, (error, stdout, stderr) => {
    console.log(stdout);
})
