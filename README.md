# Image static server 

This repository store a static images server witch allows to POST and DELETE images using a REST api.


# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [Yarn](https://yarnpkg.com/getting-started/install)


# Getting started
- add a `public/images` folder
- Clone the repository
```
git clone https://github.com/leGhus/picse
```
- setup `dev.env` based on exemple.env
- Install dependencies
```
cd picse
yarn
```
- start in dev mode
```
yarn dev
```
- complete the list of authorized keys in `src/keys.ts`

# Production
- setup `prod.env` based on exemple.env
- add a log folder
```
cd picse
mkdir logs
```  
- install dependencies
```
yarn
```
- build
```
yarn build
```
- launch server
```
yarn serve
```