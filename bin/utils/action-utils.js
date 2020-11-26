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

function getExclude() {
  const input = core.getInput("exclude");
  return !input || Array.isArray(input) ? input : [input];
}

function getInclude() {
  const input = core.getInput("include");
  return !input || Array.isArray(input) ? input : [input];
}

function getFont() {
  return core.getInput("font");
}

module.exports = {
  getDefinitionFile,
  getFileType,
  getOutputFilePath,
  getExclude,
  getInclude,
  getFont
};
