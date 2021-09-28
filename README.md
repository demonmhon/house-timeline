# home-timeline

There are 4 strangers living in the same house: Bill, Elon, Mark, and Tim. This house has 3 shared areas where they can live together: Living Room, Kitchen, and Backyard.

Due to COVID-19 situation they decided to track and keep house areas on the website to make it easier to see how often they’re facing each other.

The rules of this house are that each area gate will open for in/out only at 00 and 30 each hour, for example 00:00, 00:30, 15:30, etc.

## Getting started

For development, set your environment variables in `.env.development`, update all variables with correct values

```bash
$ cp .env.example .env.development
```

> `.env.development` is for local development, it ignored by git.

Install dependencies

```bash
$ npm install
```

The start the development server (webpack) with

```bash
$ npm run start:dev
```


## Scripts

| Script | Description |
|-|-|
| `start` | Serve the built app fron `dist`, (must build first) |
| `start:docker` | Start the app with docker (required `build:docker` first) |
| `start:dev` | Start the app with `development` mode, `webpack-dev-server` and hot module replacement (HMR) enabled |
| `test` | Jest and execute all the tests |
| `test:coverage` | Generate a coverage report |
| `test:watch` | Run all the tests and keep on watch mode |
| `build` | Build the production build |
| `build:docker` | Build docker image |
| `analyze` | Run `webpack-bundle-analyzer` to visualize size of webpack output files |


## Resources

For starter components. Find out more on [react-16x-starter-components](https://github.com/demonmhon/react-16x-starter-components).

 * [Feather Icons](https://github.com/feathericons/feather)


## License

[MIT](LICENSE.md)
