

// console.log(global)

global.setTimeout(() => {
    console.log("This is callback function inside setTimeout")
    clearInterval(interval)
}, 5000);

let count = 0
const interval = setInterval(() => {
    count++;
    console.log("Inside setInterval", count)
}, 1000);

console.log(__dirname)
console.log(__filename)