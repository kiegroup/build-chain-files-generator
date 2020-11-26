#!/usr/bin/env node

const { ClientError, logger } = require("../src/lib/common");
const { generateImage } = require("./flows/image-flow");
const { generateRepositoryList } = require("./flows/project-list-flow");
const {
  getDefinitionFile,
  getFileType,
  getOutputFilePath,
  getExclude,
  getInclude,
  getFont
} = require("./utils/action-utils");
require("dotenv").config();

async function main() {
  if (getFileType() === "image") {
    await generateImage(getDefinitionFile(), getOutputFilePath(), getFont());
  } else if (getFileType() === "repository-list") {
    await generateRepositoryList(getDefinitionFile(), getOutputFilePath(), {
      exclude: getExclude(),
      include: getInclude()
    });
  } else {
    throw new Error(
      `file type input value '${getFileType()}' is not supported. Please check documentation.`
    );
  }
}

if (require.main === module) {
  main().catch(e => {
    if (e instanceof ClientError) {
      process.exitCode = 2;
      logger.error(e);
    } else {
      process.exitCode = 1;
      logger.error(e);
    }
  });
}

module.exports = { main };
