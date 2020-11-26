const { createFileContainer } = require("../../../src/lib/util/fs-util");
const path = require("path");
const fs = require("fs");
const io = require("@actions/io");

const rootFolder = path.join(__dirname, "_temp");
beforeAll(async () => {
  await io.rmRF(rootFolder);
});

it("createFileContainer", () => {
  // Arrange
  const fileToCreate = path.join(rootFolder, "folderx", "file.txt");
  // Act
  createFileContainer(fileToCreate);

  // Assert
  expect(fs.existsSync(path.join(rootFolder, "folderx"))).toBe(true);
  expect(fs.existsSync(path.join(rootFolder, "folderx", "file.txt"))).toBe(
    false
  );
});

it("createFileContainer current dir", () => {
  // Arrange
  const fileToCreate = path.join(__dirname, "file.txt");
  // Act
  createFileContainer(fileToCreate);
});
