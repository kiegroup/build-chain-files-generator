const core = require("@actions/core");

function getDefinitionFile() {
  return core.getInput("definition-file");
}

function getFileType() {
  return core.getInput("file-type");
}

function getOutputFilePath() {
  return core.getInput("output-file-path");
}

function getFont() {
  return core.getInput("font");
}

module.exports = {
  getDefinitionFile,
  getFileType,
  getOutputFilePath,
  getFont
};
