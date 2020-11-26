#!/usr/bin/env node

const { ClientError, logger } = require("../src/lib/common");
const { getArguments } = require("./arguments/arguments-constructor");
const { generateImage } = require("./flows/image-flow");
const { generateRepositoryList } = require("./flows/project-list-flow");
require("dotenv").config();

async function main() {
  const args = getArguments();
  if (args.trace) {
    logger.level = "trace";
  } else if (args.debug) {
    logger.level = "debug";
  }
  logger.debug("ARGS", args);

  if (args["file-type"] === "image") {
    await generateImage(
      args.df[0],
      args.o[0],
      args.font ? args.font[0] : undefined
    );
  }
  if (args["file-type"] === "repository-list") {
    await generateRepositoryList(args.df[0], args.o[0]);
  }
}

if (require.main === module) {
  main().catch(e => {
    if (e instanceof ClientError) {
      process.exitCode = 2;
      logger.error(e);
    } else {
      process.exitCode = 1;
      logger.error(e);
    }
  });
}

module.exports = { main };
