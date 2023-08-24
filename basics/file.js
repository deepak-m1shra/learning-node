const fs = require('fs')

// File Reading
fs.readFile('./files/file1.txt', 'ascii', (err, data) => {
    if (err) {
        console.log("Error : ", err)
        return;
    }
    console.log(data);
})

console.log("Done reading the file")

fs.writeFile('./files/file2.txt', 'Writing this to file2.txt, which doesnt exist yet', () => {
    console.log("Done writing the file")
})

// Working with directories
if (!fs.existsSync('./files/images')) {
    fs.mkdir('./files/images', (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("images directory created")
    })
}

if (fs.existsSync('./files/images/fakeimage.png')) {
    console.log("Deleting the file")
    fs.unlink('./files/images/fakeimage.png', (err) => {
        console.log("Error encountered when deleting the file")
    })
} else {
    fs.writeFileSync('./files/images/fakeimage.png', 'asdf')
}