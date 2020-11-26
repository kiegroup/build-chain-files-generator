const { logger } = require("../../src/lib/common");
const { createFileContainer } = require("../../src/lib/util/fs-util");
const {
  getOrderedListForTree
} = require("@kie/build-chain-configuration-reader");

const fs = require("fs");
const path = require("path");

async function generateRepositoryList(
  definitionFile,
  outputFilePath,
  options = {}
) {
  logger.info(`Generating repository list file for ${definitionFile}`);
  const orderedList = (await getOrderedListForTree(definitionFile))
    .filter(node => isIncluded(node, options.include))
    .filter(node => !isExcluded(node, options.exclude))
    .map(e => e.project);
  const content = orderedList

    .map(project => (project ? project.split("/")[1] : project))
    .reduce((acc, project) => acc.concat(`${project}\n`), "");
  logger.info(`
${content}`);
  createFileContainer(outputFilePath);
  fs.writeFileSync(outputFilePath, content);
  logger.info(
    `Project list file generated and stored on ${path.join(
      __dirname,
      outputFilePath
    )} for the definition file ${definitionFile}.`
  );
}

function isIncluded(node, include) {
  if (include) {
    return (
      include.includes(node.project) ||
      (node.mapping !== undefined &&
        node.mapping.source !== undefined &&
        node.mapping.target !== undefined &&
        include.includes(`@${node.mapping.source}:${node.mapping.target}`))
    );
  }
  return true;
}

function isExcluded(node, exclude) {
  if (exclude) {
    return (
      exclude.includes(node.project) ||
      (node.mapping !== undefined &&
        node.mapping.source !== undefined &&
        node.mapping.target !== undefined &&
        exclude.includes(`@${node.mapping.source}:${node.mapping.target}`))
    );
  }
  return false;
}

module.exports = { generateRepositoryList };
