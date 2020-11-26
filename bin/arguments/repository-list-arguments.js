function getArguments(subParser) {
  subParser.add_parser("repository-list", {
    help: "repository list file generation"
  });
}

module.exports = { getArguments };
