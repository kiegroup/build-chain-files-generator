/**
 * It transforms the tree to a an array of nodes containing child nodes
 * @param {Object} tree the chain tree
 */
function generateChildrenTree(tree) {
  const result = getChildrenList(tree);
  composeChildrenTree(tree, result);
  removeChildren(result);
  return result;
}

/**
 * it composes a tree with nodes and its children
 * @param {Array} nodeArray
 * @param {Array} childrenList
 */
function composeChildrenTree(nodeArray, childrenList) {
  nodeArray.forEach(node => {
    const elementFromTree = childrenList.find(
      child => child.project === node.project
    );
    elementFromTree.children = node.children.map(child =>
      childrenList.find(e => e.project === child.project)
    );
    composeChildrenTree(node.children, childrenList);
  });
}

/**
 * it returns back the whole children list for a list of nodes
 * @param {Array} nodeArray an Array of nodes
 * @param {Array} finalAcc the array to be returned
 */
function getChildrenList(nodeArray, finalAcc = []) {
  nodeArray
    .filter(node => !finalAcc.find(e => node.project === e.project))
    .forEach(node =>
      finalAcc.push({
        display: node.project.includes("/")
          ? node.project.split("/")[1]
          : node.project,
        project: node.project,
        children: []
      })
    );

  nodeArray.forEach(node => getChildrenList(node.children, finalAcc));

  return finalAcc;
}

/**
 * it removes a child from a parent node in case it is repeated in any of its children
 *
 * @param {Array} nodeArray
 */
function removeChildren(nodeArray) {
  nodeArray.forEach(node => {
    [...node.children]
      .filter(child => doesNodeExistsInChildren(node.children, child, true))
      .forEach(child =>
        node.children.splice(
          node.children.findIndex(e => e.project === child.project),
          1
        )
      );
    removeChildren(node.children);
  });
}

/**
 * It checks if the node exists in any of the children
 * @param {Object} children the children node array
 * @param {Object} node the node to check
 * @param {Boolean} initial in case is the initial node
 */
function doesNodeExistsInChildren(children, node, initial = false) {
  return (
    children.find(
      child =>
        (!initial && child.project === node.project) ||
        doesNodeExistsInChildren(child.children, node)
    ) !== undefined
  );
}

module.exports = { generateChildrenTree };
