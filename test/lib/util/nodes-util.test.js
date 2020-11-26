const { generateChildrenTree } = require("../../../src/lib/util/nodes-util");
const {
  getTree,
  getTreeForProject
} = require("@kie/build-chain-configuration-reader");
const path = require("path");

test("generateChildrenTree based on a project tree", async () => {
  // Arrange
  const projectTree = await getTreeForProject(
    path.join(".", "test", "resources", "definition-file.yaml"),
    "kiegroup/droolsjbpm-build-bootstrap"
  );

  // Act
  const childrenTree = generateChildrenTree([projectTree]);

  // Assert
  expect(childrenTree.length).toBe(22);
  expect(childrenTree[0].display).toBe("droolsjbpm-build-bootstrap");
  expect(childrenTree[0].children.length).toBe(1);
  expect(childrenTree[0].children[0].display).toBe("kie-soup");
  expect(childrenTree[0].children[0].children.length).toBe(3);
  expect(childrenTree[0].children[0].children[0].display).toBe("appformer");
});

test("generateChildrenTree", async () => {
  // Arrange
  const tree = await getTree(
    path.join(".", "test", "resources", "definition-file.yaml")
  );

  // Act
  const childrenTree = generateChildrenTree(tree);

  // Assert
  expect(childrenTree.length).toBe(25);
  expect(childrenTree[0].display).toBe("lienzo-core");
  expect(childrenTree[1].display).toBe("droolsjbpm-build-bootstrap");
  expect(childrenTree[2].display).toBe("kie-docs");

  expect(childrenTree[0].children.length).toBe(2);
  expect(childrenTree[0].children[0].display).toBe("lienzo-tests");
  expect(childrenTree[0].children[1].display).toBe("kie-wb-common");
  expect(childrenTree[0].children[0].children.length).toBe(1);
  expect(childrenTree[0].children[0].children[0].display).toBe("appformer");

  expect(childrenTree[1].children.length).toBe(1);
  expect(childrenTree[1].children[0].display).toBe("kie-soup");
  expect(childrenTree[1].children[0].children.length).toBe(3);
  expect(childrenTree[1].children[0].children[0].display).toBe("appformer");

  expect(childrenTree[0].children[0].children[0]).toBe(
    childrenTree[1].children[0].children[0]
  );
});
