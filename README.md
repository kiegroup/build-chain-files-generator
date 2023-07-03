# Build Chain files generator

It's a tool either to be used as a javascript library, a CLI or a github actions. The tool generate files (images, project-list.txt, ...) based on a build-chain definition file. See: [Github Action Build Chain](https://github.com/kiegroup/github-action-build-chain/).

## Allowed configuration files versions

- 2.0

## Input Fields

- **definition-file** (mandatory): `path to the file in filesystem | URL to the file`

  > Example:
  >
  > ```
  > definition-file: './folder/whatever_definition_file.yaml'
  > definition-file: 'http://yourdomain.com/definition-file.yaml'
  > definition-file: 'https://raw.githubusercontent.com/kiegroup/droolsjbpm-build-bootstrap/master/.ci/pull-request-config.yaml'
  > definition-file: 'https://raw.githubusercontent.com/kiegroup/droolsjbpm-build-bootstrap/${BRANCH}/.ci/pull-request-config.yaml'
  > definition-file: 'https://raw.githubusercontent.com/${GROUP}/droolsjbpm-build-bootstrap/${BRANCH}/.ci/pull-request-config.yaml'
  > definition-file: 'https://raw.githubusercontent.com/${GROUP}/${PROJECT_NAME}/${BRANCH}/.ci/pull-request-config.yaml'
  > ```

  output-file-path:
  description: "the output file path to store the produced file"
  required: true
  font:
  description: "the font used to generate image, something like `14px Arial`"
  required: false

- **file-type** (required): The file type you want to produce. Possible values:

  - image: it will generate the file image based on the definition file.
  - repository-list: it will generate a plain text file with the full downstream dependency information.

- **output-file-path** (required): The file path where the file will be stored. For instance:

  > ```
  > output-file-path: 'folderx/my-project-hierarchy.png'
  > output-file-path: 'project-list.txt'
  > ```

  > **_Note:_** It make sense in case this is part of a flow where the files are either archived or stored as a new push to the repository/pull request.

- **exclude** (optional): The list of projects or branches to exclude from project-list generation. For instance:

  > ```
  > exclude: groupx/projectx  # it will exclude groupx/projectx from the list
  > exclude: |                # it will exclude groupx/projectx, groupx/projecty and all the projects where the mapping is master:7.x
  >       groupx/projectx
  >       groupx/projecty
  >       @master:7.x
  > ```

- **include** (optional): The list of projects or branches to include from project-list generation. For instance:

  > ```
  > include: groupx/projectx  # it will include groupx/projectx from the list
  > include: |                # it will include groupx/projectx, groupx/projecty and all the projects where the mapping is master:7.x
  >       groupx/projectx
  >       groupx/projecty
  >       @master:7.x
  > ```

- **font** (optional): The font size and name to produce the image. For instance:

  > ```
  > font: '14px Liberation Serif'
  > font: '11px IBM Plex Sans Condensed 2'
  > ```

## CLI Usage

### Generate Image

Check this example: `build-chain-files-generator -df https://raw.githubusercontent.com/kiegroup/droolsjbpm-build-bootstrap/master/.ci/pull-request-config.yaml -o image.png image -font "14px Arial"`

where:

- `-df`: is the definition file
- `-o`: the file path to store the file
- `image`: the file type to generate
- `-font` (optional): the font to use

### Generate Repository list file

Check this example:

> `build-chain-files-generator -df ./pull-request-config.yaml -o file.txt repository-list -exclude "groupx/projectX" "@master:main"` > `build-chain-files-generator -df ./pull-request-config.yaml -o file.txt repository-list -include "groupx/projectY" "@main:master"`

where:

- `-df`: is the definition file
- `-o`: the file path to store the file
- `image`: the file type to generate
- `-exclude` (optional): the project list or mapping to exclude
- `-include` (optional): the project list or mapping to include

## Development

Due to `librsvg-2.so.2` is included as a part of the new canvas library and the `librsvg-2.so.2` is exceeding 100MB, the file has to be externalized on `git-lfs` service.

In case `lfs` files are updated please execute `git lfs push origin $BRANCH`

### Github Actions Limitations
Github Actions does not download LFS files from `uses` step [but from `actions/checkout` with `lfs` input enabled](https://github.com/actions/checkout). So steps like
```
  - name: Image Generation
    uses: kiegroup/build-chain-files-generator@main
    with:
      definition-file: .ci/pull-request-config.yaml
      file-type: image
      output-file-path: ./docs/project-dependencies-hierarchy.png
```
are not working for now, instead

```
  - name: Checkout BC Files Generator repo
    uses: actions/checkout@v3
    with:
      repository: kiegroup/build-chain-files-generator
      path: build-chain-files-generator
      lfs: true
  - name: Build BC Files Generator
    run: npm install --prefix build-chain-files-generator
  - name: Image Generation
    run: ./build-chain-files-generator/bin/generator-cli.js -df .ci/pull-request-config.yaml -o ./docs/project-dependencies-hierarchy.png image
```

