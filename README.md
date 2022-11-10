# Devfriends workshop backend

Backend for [Devfriends workshop](https://github.com/jpb06/dev-friends-workshop) repo.

<!-- readme-package-icons start -->

<p align="left"><a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /></a>&nbsp;<a href="https://pnpm.io/motivation" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/pnpm.svg" /></a>&nbsp;<a href="https://fly.io/docs/" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/fly-io.png" /></a>&nbsp;<a href="https://docs.docker.com" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" /></a>&nbsp;<a href="https://expressjs.com/en/starter/installing.html" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" /></a>&nbsp;<a href="https://fakerjs.dev/guide/" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/faker.svg" /></a>&nbsp;<a href="https://jestjs.io/docs/getting-started" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" /></a>&nbsp;<a href="https://docs.nestjs.com" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/prettier.png" /></a>&nbsp;<a href="https://rxjs.dev/guide/overview" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/rxjs.png" /></a>&nbsp;<a href="https://swagger.io" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/swagger.png" /></a>&nbsp;<a href="https://github.com/typestack" target="_blank"><img height="70" src="https://raw.githubusercontent.com/jpb06/readme-package-icons/main/icons/type-stack.png" /></a>&nbsp;<a href="https://webpack.js.org/concepts/" target="_blank"><img height="70" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" /></a></p>

<!-- readme-package-icons end -->

## ⚡ Data model

![Datamodel](./assets/dev-friends-model.png)

## ⚡ Routes exposed

Here is a quick summary. You can get more details from the [api swagger](https://devfriends-backend.fly.dev).

| Route                 | Verb    | Description                                                             |
| --------------------- | ------- | ----------------------------------------------------------------------- |
| 💥 /squads            | 🔹 GET  | Retrieves all squads                                                    |
| 💥 /squads/{id}/devs  | 🔹 GET  | Retrieves all devs belonging to a squad                                 |
| 💥 /devs              | 🔹 GET  | Retrieves all devs                                                      |
| 💥 /devs/by-squad     | 🔸 POST | Retrieves devs belonging to a list of squads passed in the request body |
| 💥 /devs/change-squad | 🔸 POST | Moves a developer to another squad                                      |
