const { drawTree } = require("tree-image-drawer");

async function generate(tree, output, font = "14px Liberation Serif") {
  const options = {
    block: { width: 175, height: 40 },
    delta: { width: 50, height: 100 },
    offset: { x: 20, y: 40 },
    displayType: "text",
    colors: {
      block: "rgba(0, 0, 0, 255)",
      line: "rgba(0, 0, 0, 255)",
      font: "rgba(0, 0, 0, 255)",
      background: "rgba(255, 255, 255, 255)"
    },
    font
  };

  await drawTree(tree, output, options);
}

module.exports = { generate };
