function getArguments(subParser) {
  const buildParser = subParser.add_parser("repository-list", {
    help: "repository list file generation"
  });

  buildParser.add_argument("-exclude", {
    nargs: "*",
    required: false,
    help: "The list of projects or branches to exclude from project-list generation."
  });

  buildParser.add_argument("-include", {
    nargs: "*",
    required: false,
    help: "The list of projects or branches to include from project-list generation."
  });
}

module.exports = { getArguments };
