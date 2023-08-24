const fs = require("fs");

console.log("Start");

fs.readFile('readme.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log("File contents are: " + data)
})

console.log("End");
