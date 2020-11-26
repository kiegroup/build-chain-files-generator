const { ArgumentParser } = require("argparse");
const { getArguments: getImageArguments } = require("./image-arguments");
const {
  getArguments: getRepositoryListArguments
} = require("./repository-list-arguments");
const pkg = require("../../package.json");

function getArguments() {
  const parser = new ArgumentParser({
    prog: pkg.name,
    add_help: true,
    description: `${pkg.description}. Version: ${pkg.version}`
  });
  parser.add_argument("-df", {
    nargs: 1,
    required: true,
    help: "Filesystem path or URL to the definition file"
  });
  parser.add_argument("-o", "-output-file-path", {
    nargs: 1,
    required: true,
    help: "the file path to store the generated file"
  });
  parser.add_argument("-d", "--debug", {
    action: "store_true",
    help: "Show debugging output"
  });

  const subparsers = parser.add_subparsers({
    dest: "file-type",
    required: true
  });
  getImageArguments(subparsers);
  getRepositoryListArguments(subparsers);
  return parser.parse_args();
}

module.exports = { getArguments };
