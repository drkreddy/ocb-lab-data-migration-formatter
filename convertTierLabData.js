const lib = require("./lib.js");

const writeAsCSV = function (lines, destFileName) { //Need to make it generic
    const contents = lines.filter((line) => {
        return !!line["Test date"];
    }).map((line) => [
            line["First Name"],
            line["Last Name"],
            line["Patient ID"],
            lib.getDate(line["Test date"]),
            "OPD",
            "CD4",
            line["CD4"],
            "Charge Virale HIV - Value",
            line["Charge Virale HIV - Value"]
        ].join(",")
    );
    contents.unshift(["Patient.name", "Patient.Surname", "Registration Number", "Date", "Visit Type",
        "Test", "Result", "Test", "Result"].join(","));

    return lib.writeToDestFile(contents.join("\r\n"), destFileName);
};

module.exports = (sourceFileName, destFileName)=>{
    lib.convertCSVToJSON(sourceFileName).then((data) => {
        writeAsCSV(data, lib.getDestFileName(sourceFileName, destFileName));
    });
};