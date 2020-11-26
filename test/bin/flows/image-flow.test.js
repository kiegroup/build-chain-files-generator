const { generateImage } = require("../../../bin/flows/image-flow");

const { getTree } = require("@kie/build-chain-configuration-reader");
jest.mock("@kie/build-chain-configuration-reader");

const {
  generateImage: generateImageAPI
} = require("../../../src/lib/generator-api");
jest.mock("../../../src/lib/generator-api");

const { createFileContainer } = require("../../../src/lib/util/fs-util");
jest.mock("../../../src/lib/util/fs-util");

test("generateImage", async () => {
  // Arrange
  const definitionFile = "definitionFile";
  const outputFilePath = "outputFilePath";
  const font = "font";
  const tree = [{}];
  getTree.mockResolvedValueOnce(tree);

  // Act
  await generateImage(definitionFile, outputFilePath, font);

  // Assert
  expect(getTree).toHaveBeenCalledWith(definitionFile);
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(generateImageAPI).toHaveBeenCalledWith(tree, outputFilePath, font);
});
