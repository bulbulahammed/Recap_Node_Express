// Node.js program to demonstrate the
// fs.writeFileSync() method

// Import the filesystem module
const fs = require('fs');

// Writing to the file 5 times
// with the append file mode
for (let i = 0; i < 5; i++) {
fs.writeFileSync("movies.txt",
	"Movie " + i + "\n",
	{
	encoding: "utf8",
	flag: "a+",
	mode: 0o666
	});
}

console.log("File written successfully 5 times\n");
console.log("The written file has the following contents:");
console.log(fs.readFileSync("movies.txt", "utf8"));
