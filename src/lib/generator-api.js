const { generateChildrenTree } = require("./util/nodes-util");
const { generate } = require("./generator/image-generator");

/**
 * it generates an image based on a chain tree
 * @param {Object} tree the chain tree
 * @param {String} outputFilePath the file path to store the image
 * @param {String} font the font used to generate image, something like `14px Arial`
 */
async function generateImage(tree, outputFilePath, font = undefined) {
  const childrenTree = generateChildrenTree(tree);
  if (!font) {
    await generate(childrenTree, outputFilePath);
  } else {
    await generate(childrenTree, outputFilePath, font);
  }
}

/**
 * it generates an image based on a chain tree
 * @param {Object} tree the chain tree
 * @param {String} outputFilePath the file path to store the image
 * @param {String} font the font used to generate image, something like `14px Arial`
 */
async function generateImageProjectTree(
  projectTree,
  outputFilePath,
  font = undefined
) {
  await generateImage([projectTree], outputFilePath, font);
}

module.exports = {
  generateImage,
  generateImageProjectTree
};
