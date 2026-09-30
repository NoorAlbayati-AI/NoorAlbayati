const fs=require("fs"),vm=require("vm"),assert=require("assert");
const code=fs.readFileSync("academic-prompt-improver.js","utf8");
assert(code.includes("Never invent citations"));
assert(code.includes("do not add variables, populations, methods, outcomes"));
assert(code.includes("no API key is used"));
const html=fs.readFileSync("academic-prompt-improver.html","utf8");
for(const id of ["task","type","level","format","evidence","context","build","copy","clear","outputCard","output"]) assert(html.includes('id="'+id+'"'));
console.log("Academic Prompt Improver smoke tests passed.");