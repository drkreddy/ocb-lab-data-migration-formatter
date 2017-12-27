const convertFuchiaLabData = require("./convertFuchiaLabData.js");
const convertTierLabData = require("./convertTierLabData.js");
const readFileSync = require('fs').readFileSync;

const migrationFor = process.argv[2];
const sourceFile = process.argv[3];
const destFile = process.argv[4];

const displayUsage = ()=>{
    console.log(readFileSync("usage.txt", "utf-8"));
};

switch (migrationFor) {
    case "--FUCHIA":
    case "-F":
        convertFuchiaLabData(sourceFile, destFile);
        break;
    case "--TIER":
    case "-T":
        convertTierLabData(sourceFile, destFile);
        break;
    default:
        displayUsage();
}