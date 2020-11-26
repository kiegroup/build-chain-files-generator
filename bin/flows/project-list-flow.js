const { logger } = require("../../src/lib/common");
const { createFileContainer } = require("../../src/lib/util/fs-util");
const {
  getOrderedListForTree
} = require("@kie/build-chain-configuration-reader");

const fs = require("fs");
const path = require("path");

async function generateRepositoryList(definitionFile, outputFilePath) {
  logger.info(`Generating repository list file for ${definitionFile}`);
  const orderedList = (await getOrderedListForTree(definitionFile)).map(
    e => e.project
  );
  const content = orderedList
    .map(project => (project ? project.split("/")[1] : project))
    .reduce((acc, project) => acc.concat(`${project}\n`), "");
  logger.info(content);
  createFileContainer(outputFilePath);
  fs.writeFileSync(outputFilePath, content);
  logger.info(
    `Project list file generated and stored on ${path.join(
      __dirname,
      outputFilePath
    )} for the definition file ${definitionFile}.`
  );
}

module.exports = { generateRepositoryList };
