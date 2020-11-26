const {
  getDefinitionFile,
  getFileType,
  getOutputFilePath,
  getFont
} = require("../../../bin/utils/action-utils");

const { getInput } = require("@actions/core");
jest.mock("@actions/core");

afterEach(() => {
  jest.clearAllMocks();
});

test("getDefinitionFile", () => {
  // Arrange
  const expectedResult = "./whateverfile";
  getInput.mockImplementationOnce(param =>
    param === "definition-file" ? expectedResult : undefined
  );
  // Act
  const result = getDefinitionFile();

  // Assert
  expect(result).toEqual(expectedResult);
});

test("getFileType", () => {
  // Arrange
  const expectedResult = "image";
  getInput.mockImplementationOnce(param =>
    param === "file-type" ? expectedResult : undefined
  );
  // Act
  const result = getFileType();

  // Assert
  expect(result).toEqual(expectedResult);
});

test("getOutputFilePath", () => {
  // Arrange
  const expectedResult = "folderx/file.txt";
  getInput.mockImplementationOnce(param =>
    param === "output-file-path" ? expectedResult : undefined
  );
  // Act
  const result = getOutputFilePath();

  // Assert
  expect(result).toEqual(expectedResult);
});

test("getFont", () => {
  // Arrange
  const expectedResult = "whateverfont";
  getInput.mockImplementationOnce(param =>
    param === "font" ? expectedResult : undefined
  );
  // Act
  const result = getFont();

  // Assert
  expect(result).toEqual(expectedResult);
});
