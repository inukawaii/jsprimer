const myModule = require("./my-module");
const program = require("commander");
const fs = require('fs');
const marked = require('marked');

program.parse(process.argv);
const filePath = program.args[0];

fs.readFile(filePath, { encoding: 'utf8' },(err, file) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
    return;
  }
  const html = marked(file);
  console.log(html);
})