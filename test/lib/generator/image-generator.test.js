const { generate } = require("../../../src/lib/generator/image-generator");
const { generateChildrenTree } = require("../../../src/lib/util/nodes-util");
const path = require("path");
const { promises: fspromises } = require("fs");
const fs = require("fs");

const {
  getTree,
  getTreeForProject
} = require("@kie/build-chain-configuration-reader");
const io = require("@actions/io");

const rootFolder = path.join(__dirname, "_temp");

beforeAll(async () => {
  await io.rmRF(rootFolder);

  await fspromises.mkdir(rootFolder, {
    recursive: true
  });
});

it("generate image", async () => {
  // Arrange
  const appformer = { children: [], display: "appformer" };
  const drooljbpmTools = { children: [], display: "drools-jbpm-tools" };
  const kiesoup = { children: [appformer], display: "kie-soup" };
  const kieParent = {
    children: [kiesoup, appformer, drooljbpmTools],
    display: "droolsjbpm-build-bootstrap"
  };

  const filePath = path.join(rootFolder, "kieParent.png");

  // Act
  await generate([kieParent], filePath);

  // Assert
  expect(fs.existsSync(filePath)).toBe(true);
});

it("generate image from definition file. getTreeForProject", async () => {
  // Arrange
  const projectTree = await getTreeForProject(
    path.join(".", "test", "resources", "definition-file.yaml"),
    "kiegroup/droolsjbpm-build-bootstrap"
  );
  const childrenTree = generateChildrenTree([projectTree]);

  const filePath = path.join(rootFolder, "droolsjbpm-build-bootstrap.png");

  // Act
  await generate(childrenTree, filePath);

  // Assert
  expect(fs.existsSync(filePath)).toBe(true);
});

it("generate image from definition file. getTree", async () => {
  // Arrange
  const tree = await getTree(
    path.join(".", "test", "resources", "definition-file-prod.yaml")
  );
  const childrenTree = generateChildrenTree(tree);

  const filePath = path.join(rootFolder, "rhba.png");

  // Act
  await generate(childrenTree, filePath);

  // Assert
  expect(fs.existsSync(filePath)).toBe(true);
});

it("generate image from definition file. getTree", async () => {
  // Arrange
  const tree = await getTree(
    path.join(".", "test", "resources", "definition-file.yaml")
  );
  const childrenTree = generateChildrenTree(tree);

  const filePath = path.join(rootFolder, "rhba-community.png");

  // Act
  await generate(childrenTree, filePath);

  // Assert
  expect(fs.existsSync(filePath)).toBe(true);
});
