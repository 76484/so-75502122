const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");
const prettier = require("prettier");

const template = handlebars.compile(`
{
    {{#each list}}
        "{{this}}": {}{{#unless @last}},{{/unless}}
    {{/each}}
}
`);

const data = {
  list: ["one", "two", "three"],
};

const outputPath = path.join(__dirname, "/tmp/output.json");
const unformattedOutput = template(data);
const formattedOutput = prettier.format(unformattedOutput, { parser: "json" });

fs.writeFile(outputPath, formattedOutput, (err) => {
  if (err) {
    console.error(err);
    process.exitCode = 1;
    return;
  }

  console.log("Success: Your file has been formatted and written!");
});
