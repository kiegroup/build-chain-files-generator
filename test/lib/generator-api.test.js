const {
  generateImage,
  generateImageProjectTree
} = require("../../src/lib/generator-api");
const { generateChildrenTree } = require("../../src/lib/util/nodes-util");
jest.mock("../../src/lib/util/nodes-util");
const { generate } = require("../../src/lib/generator/image-generator");
jest.mock("../../src/lib/generator/image-generator");

test("generateImage", async () => {
  // Arrange
  const tree = [{}];
  const outputFilePath = "filepath";
  const childrenTree = [];
  generateChildrenTree.mockReturnValueOnce(childrenTree);

  // Act
  await generateImage(tree, outputFilePath);

  // Assert
  expect(generateChildrenTree).toHaveBeenCalledWith(tree);
  expect(generate).toHaveBeenCalledWith(childrenTree, outputFilePath);
});

test("generateImage with font", async () => {
  // Arrange
  const tree = [{}];
  const outputFilePath = "filepath";
  const childrenTree = [];
  const font = "whatever font";
  generateChildrenTree.mockReturnValueOnce(childrenTree);

  // Act
  await generateImage(tree, outputFilePath, font);

  // Assert
  expect(generateChildrenTree).toHaveBeenCalledWith(tree);
  expect(generate).toHaveBeenCalledWith(childrenTree, outputFilePath, font);
});

test("generateImageProjectTree", async () => {
  // Arrange
  const projectTree = {};
  const outputFilePath = "filepath";
  const childrenTree = [];
  generateChildrenTree.mockReturnValueOnce(childrenTree);

  // Act
  await generateImageProjectTree(projectTree, outputFilePath);

  // Assert
  expect(generateChildrenTree).toHaveBeenCalledWith([projectTree]);
  expect(generate).toHaveBeenCalledWith(childrenTree, outputFilePath);
});

test("generateImageProjectTree with font", async () => {
  // Arrange
  const projectTree = {};
  const outputFilePath = "filepath";
  const childrenTree = [];
  const font = "whatever font";
  generateChildrenTree.mockReturnValueOnce(childrenTree);

  // Act
  await generateImageProjectTree(projectTree, outputFilePath, font);

  // Assert
  expect(generateChildrenTree).toHaveBeenCalledWith([projectTree]);
  expect(generate).toHaveBeenCalledWith(childrenTree, outputFilePath, font);
});
