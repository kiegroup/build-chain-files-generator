const {
  generateRepositoryList
} = require("../../../bin/flows/project-list-flow");

const {
  getOrderedListForTree
} = require("@kie/build-chain-configuration-reader");
jest.mock("@kie/build-chain-configuration-reader");

const { writeFileSync } = require("fs");
jest.mock("fs");

const { createFileContainer } = require("../../../src/lib/util/fs-util");
jest.mock("../../../src/lib/util/fs-util");

test("generateRepositoryList", async () => {
  // Arrange
  const definitionFile = "definitionFile";
  const outputFilePath = "outputFilePath";
  const tree = [
    {
      project: "groupx/projectA"
    },
    {
      project: "groupx/projectB"
    },
    {
      project: "groupx/projectC"
    },
    {
      project: "groupx/projectD"
    }
  ];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath);

  // Assert
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(writeFileSync).toHaveBeenCalledWith(
    outputFilePath,
    `projectA
projectB
projectC
projectD
`
  );
});
