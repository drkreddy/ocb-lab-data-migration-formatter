const path = require('path');
const csv = require('csvtojson');
const Promise = require('promise');

const getDestFileName = (sourceFile, destFile) => {
    const extension = path.extname(sourceFile);
    return destFile || (path.basename(sourceFile, extension) + "_generated" + extension);
};

const convertCSVToJSON = (csvFilePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        csv().fromFile(csvFilePath)
            .on('json', (jsonObj) => {
                results.push(jsonObj)
            })
            .on('done', (error) => {
                if (error)
                    reject(error);
                else
                    resolve(results)
            });
    });
};

const getDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
};

module.exports = {getDestFileName, convertCSVToJSON, getDate};
