# IG2I Discord Bot

## Getting Started

Make sure you have [Yarn](https://yarnpkg.com/) installed.

```bash
$ yarn
$ yarn build
$ yarn start
```

### In-depth Guide

Those shortcuts are available to help you develop:

```bash
$ yarn build                      # Builds the app
$ yarn build:watch                # Builds the app when updated
$ yarn lint                       # Runs the linter
$ yarn lint:fix                   # Runs the linter with auto-correct
$ yarn start                      # Starts the server
```

### Guidelines

#### Adding A Command

- Create a file in [src/commands](src/commands), named after its prefix.
- Register it in the [index](src/commands/index.ts)
- Call the command at the [bot startup](src/index.ts)

## Contributing

Everything you need is available in the [Contribution Guide](CONTRIBUTING.md)
