const path = require('path');

const convertToJSON = (csvLine, headers) => {
    const result = {};
    const values = csvLine.split(",");
    for (let j = 0; j < headers.length; j++) {
        result[headers[j]] = values[j];
    }
    return result;
};

const getDestFileName = (sourceFile, destFile) => {
    const extension = path.extname(sourceFile);
    return destFile || (path.basename(sourceFile, extension) + "_generated" + extension);
};

const getLineDelimiter = (csvContent) => {
    return csvContent.match("\\r\\n") ? "\r\n" : "\n";
};

const convertCSVToJSON = (csvContent) => {
    const lines = csvContent.split(getLineDelimiter(csvContent));
    const headers = lines[0].split(",");
    const results = [];

    for (let lineNumber = 1; lineNumber < lines.length; lineNumber++)
        results.push(convertToJSON(lines[lineNumber], headers));
    return results;
};

const getDate = (dateString)=>{
    return new Date(dateString).toISOString().split("T")[0];
};

module.exports = {getDestFileName, convertCSVToJSON, getDate};
