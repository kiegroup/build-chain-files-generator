#!/usr/bin/env node
const scanner = require("sonarqube-scanner");
const pkg = require("./package.json");
require("dotenv").config();

scanner(
  {
    serverUrl: "https://sonarcloud.io",
    token: process.env["SONAR_TOKEN"],
    options: {
      "sonar.projectName": "build-chain-files-generator",
      "sonar.projectDescription": pkg.description,
      "sonar.projectVersion": pkg.version,
      "sonar.organization": "kiegroup",
      "sonar.sources": "src,bin",
      "sonar.tests": "test",
      "sonar.links.homepage":
        "https://github.com/kiegroup/build-chain-files-generator",
      "sonar.links.scm":
        "https://github.com/kiegroup/build-chain-files-generator",
      "sonar.links.issue":
        "https://github.com/kiegroup/build-chain-files-generator/issues"
    }
  },
  () => process.exit()
);
