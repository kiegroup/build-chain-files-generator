const { logger } = require("../../src/lib/common");
const {
  generateImage: generateImageAPI
} = require("../../src/lib/generator-api");
const { getTree } = require("@kie/build-chain-configuration-reader");
const path = require("path");

const { createFileContainer } = require("../../src/lib/util/fs-util");

async function generateImage(definitionFile, outputFilePath, font = undefined) {
  logger.info(`Generating image for ${definitionFile}`);
  const tree = await getTree(definitionFile);
  if (!tree) {
    throw new Error(
      `The definition file ${definitionFile} has not been properly specified`
    );
  }
  createFileContainer(outputFilePath);
  await generateImageAPI(tree, outputFilePath, font);
  logger.info(
    `Image generated and stored on ${path.join(
      __dirname,
      outputFilePath
    )} for the definition file ${definitionFile}.`
  );
}

module.exports = { generateImage };
