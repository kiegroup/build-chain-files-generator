function getArguments(subParser) {
  const buildParser = subParser.add_parser("image", {
    help: "image generation"
  });
  buildParser.add_argument("-font", {
    nargs: 1,
    required: false,
    help: "The font size and type to use from image generation tool. Something like '14px Arial'. The font should be available and installed in the system."
  });
}

module.exports = { getArguments };
