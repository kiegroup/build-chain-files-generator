const fs = require("fs");
const path = require("path");

function createFileContainer(filePath) {
  const dirToCreate = path.dirname(filePath);
  fs.mkdirSync(dirToCreate, { recursive: true });
}

module.exports = { createFileContainer };
