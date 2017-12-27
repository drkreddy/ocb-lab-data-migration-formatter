const lib = require("./lib.js");

const writeAsCSV = function (lines, destFileName) { //Need to make it generic
    const contents = lines.filter((line) => {
        return !!line["Test date"];
    }).map((line) => {
        return [
            line["First Name"],
            line["Last Name"],
            line["Patient ID"],
            lib.getDate(line["Test date"]),
            "OPD",
            "CD4",
            line["CD4"],
            "Charge Virale HIV - Value",
            line["Charge Virale HIV - Value"]
        ].join(",");
    });
    contents.unshift(["Patient.name", "Patient.Surname", "Registration Number", "Date", "Visit Type",
        "Test", "Result", "Test", "Result"].join(","));

    return lib.writeToDestFile( contents.join("\r\n"), destFileName);
};
const main = function () {
    const sourceFile = process.argv[2];
    const destFile = process.argv[3];
    lib.convertCSVToJSON(sourceFile).then((data)=>{
        writeAsCSV(data, lib.getDestFileName(sourceFile, destFile));
    })
};

main();