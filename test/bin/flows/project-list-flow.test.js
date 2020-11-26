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

afterEach(() => {
  jest.clearAllMocks();
});

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

test("generateRepositoryList exclude project list", async () => {
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
  const exclude = ["groupx/projectB", "groupx/projectD"];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath, { exclude });

  // Assert
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(writeFileSync).toHaveBeenCalledWith(
    outputFilePath,
    `projectA
projectC
`
  );
});

test("generateRepositoryList exclude project mapping without coincidenes", async () => {
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
  const exclude = ["@master:7.x"];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath, { exclude });

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

test("generateRepositoryList exclude project mapping wit coincidenes", async () => {
  // Arrange
  const definitionFile = "definitionFile";
  const outputFilePath = "outputFilePath";
  const tree = [
    {
      project: "groupx/projectA",
      mapping: {
        source: "master",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectB",
      mapping: {
        source: "7.x",
        target: "master"
      }
    },
    {
      project: "groupx/projectC",
      mapping: {
        source: "master",
        target: "master"
      }
    },
    {
      project: "groupx/projectD",
      mapping: {
        source: "7.x",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectE"
    },
    {
      project: "groupx/projectF",
      mapping: {
        source: "master",
        target: "7.x"
      }
    }
  ];
  const exclude = ["@master:7.x"];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath, { exclude });

  // Assert
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(writeFileSync).toHaveBeenCalledWith(
    outputFilePath,
    `projectB
projectC
projectD
projectE
`
  );
});

test("generateRepositoryList exclude project list and mapping wit coincidenes", async () => {
  // Arrange
  const definitionFile = "definitionFile";
  const outputFilePath = "outputFilePath";
  const tree = [
    {
      project: "groupx/projectA",
      mapping: {
        source: "master",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectB",
      mapping: {
        source: "7.x",
        target: "master"
      }
    },
    {
      project: "groupx/projectC",
      mapping: {
        source: "master",
        target: "master"
      }
    },
    {
      project: "groupx/projectD",
      mapping: {
        source: "7.x",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectE"
    },
    {
      project: "groupx/projectF",
      mapping: {
        source: "master",
        target: "7.x"
      }
    }
  ];
  const exclude = ["groupx/projectB", "groupx/projectF", "@master:7.x"];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath, { exclude });

  // Assert
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(writeFileSync).toHaveBeenCalledWith(
    outputFilePath,
    `projectC
projectD
projectE
`
  );
});

test("generateRepositoryList include project list", async () => {
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
  const include = ["groupx/projectB", "groupx/projectD"];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath, { include });

  // Assert
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(writeFileSync).toHaveBeenCalledWith(
    outputFilePath,
    `projectB
projectD
`
  );
});

test("generateRepositoryList include project mapping without coincidenes", async () => {
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
  const include = ["@master:7.x"];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath, { include });

  // Assert
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(writeFileSync).toHaveBeenCalledWith(outputFilePath, "");
});

test("generateRepositoryList include project mapping wit coincidenes", async () => {
  // Arrange
  const definitionFile = "definitionFile";
  const outputFilePath = "outputFilePath";
  const tree = [
    {
      project: "groupx/projectA",
      mapping: {
        source: "master",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectB",
      mapping: {
        source: "7.x",
        target: "master"
      }
    },
    {
      project: "groupx/projectC",
      mapping: {
        source: "master",
        target: "master"
      }
    },
    {
      project: "groupx/projectD",
      mapping: {
        source: "7.x",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectE"
    },
    {
      project: "groupx/projectF",
      mapping: {
        source: "master",
        target: "7.x"
      }
    }
  ];
  const include = ["@master:7.x"];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath, { include });

  // Assert
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(writeFileSync).toHaveBeenCalledWith(
    outputFilePath,
    `projectA
projectF
`
  );
});

test("generateRepositoryList include project list and mapping wit coincidenes", async () => {
  // Arrange
  const definitionFile = "definitionFile";
  const outputFilePath = "outputFilePath";
  const tree = [
    {
      project: "groupx/projectA",
      mapping: {
        source: "master",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectB",
      mapping: {
        source: "7.x",
        target: "master"
      }
    },
    {
      project: "groupx/projectC",
      mapping: {
        source: "master",
        target: "master"
      }
    },
    {
      project: "groupx/projectD",
      mapping: {
        source: "7.x",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectE"
    },
    {
      project: "groupx/projectF",
      mapping: {
        source: "master",
        target: "7.x"
      }
    }
  ];
  const include = ["groupx/projectB", "groupx/projectF", "@master:7.x"];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath, { include });

  // Assert
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(writeFileSync).toHaveBeenCalledWith(
    outputFilePath,
    `projectA
projectB
projectF
`
  );
});

test("generateRepositoryList include and exclude", async () => {
  // Arrange
  const definitionFile = "definitionFile";
  const outputFilePath = "outputFilePath";
  const tree = [
    {
      project: "groupx/projectA",
      mapping: {
        source: "master",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectB",
      mapping: {
        source: "7.x",
        target: "master"
      }
    },
    {
      project: "groupx/projectC",
      mapping: {
        source: "master",
        target: "master"
      }
    },
    {
      project: "groupx/projectD",
      mapping: {
        source: "7.x",
        target: "7.x"
      }
    },
    {
      project: "groupx/projectE"
    },
    {
      project: "groupx/projectF",
      mapping: {
        source: "master",
        target: "7.x"
      }
    }
  ];
  const include = ["groupx/projectB", "groupx/projectE", "groupx/projectF"];
  const exclude = ["groupx/projectB", "@master:7.x"];
  getOrderedListForTree.mockResolvedValueOnce(tree);

  // Act
  await generateRepositoryList(definitionFile, outputFilePath, {
    include,
    exclude
  });

  // Assert
  expect(createFileContainer).toHaveBeenCalledWith(outputFilePath);
  expect(writeFileSync).toHaveBeenCalledWith(
    outputFilePath,
    `projectE
`
  );
});
