const lib = require("./lib.js");

const getVisitType = (visitTypeSynonym) => {
    switch (visitTypeSynonym) {
        case 'Hospitalisation':
            return 'IPD';
        case 'Consultation':
            return 'OPD';
        default:
            return '';
    }
};

const mapHepBValue = (synonym) => {
    switch (synonym) {
        case 'Positive':
            return 'Positive';
        case 'Negative':
            return 'Negative';
        default:
            return '';
    }
};

const mapGlucoseValue = (synonym) => {
    switch (synonym) {
        case '0':
            return 'négatif';
        case '1+':
            return '+';
        case '2+':
            return '++';
        case '3+':
            return '++';
        default:
            return '';
    }
};

const mapProteinValue = (synonym) => mapGlucoseValue(synonym);


const writeAsCSV = function (lines, destFileName) { //Need to make it generic
    console.log(lines.length);
    const contents = lines.filter((line) => {
        return !!line["Sample Date"];
    }).map((line) => {
            return [
                line["Patient ID"],
                lib.getDate(line["Sample Date"]),
                getVisitType(line['Visit Type']),
                "Hépatite B",
                mapHepBValue(line['Hep B(Positive, Negative, Not specified)']),
                "GPT",
                line["GPT"],
                "Creatinine",
                line["Creatinine"],
                "Hemoglobine",
                line["Hemoglobine"],
                "Glucose",
                mapGlucoseValue(line['Glucose(urine)(0, 1+, 2+, 3+, Non spécifié)']),
                "LYM%",
                line["LYM%(sang)"],
                "CD4",
                line["CD4"],
                "CD4 % (enfants de - 5 ans)",
                line["CD4 %"],
                "Viral Load",
                line["Viral Load"],
                "Protéines",
                mapProteinValue(line["Proteine(urine)(0, 1+, 2+, 3+, Non spécifié)"])
            ];
        });
    contents.unshift(["Registration Number", "Date", "Visit Type",
        "Test", "Result", "Test", "Result", "Test", "Result", "Test", "Result", "Test", "Result", "Test", "Result",
        "Test", "Result", "Test", "Result", "Test", "Result", "Test", "Result"].join(","));

    return lib.writeToDestFile( contents.join("\r\n"), destFileName);
};
const main = function () {
    const sourceFile = process.argv[2];
    const destFile = process.argv[3];

    lib.convertCSVToJSON(sourceFile).then(function (data) {
        writeAsCSV(data, lib.getDestFileName(sourceFile, destFile))
    });
};

main();
