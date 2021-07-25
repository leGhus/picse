# Image static server 

This repository store a static images server witch allows to POST and DELETE images using a REST api.


# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [Yarn](https://yarnpkg.com/getting-started/install)


# Getting started
- Clone the repository
```
git clone https://github.com/leGhus/picse
```
- Install dependencies
```
cd picse
yarn
```
- start in dev mode
```
yarn dev
```

# Deploying the app
There are many ways to deploy a Node app, and in general, nothing about the deployment process changes because you're using TypeScript.
In this section, I'll walk you through how to deploy this app to Azure App Service using the extensions available in VS Code because I think it is the easiest and fastest way to get started, as well as the most friendly workflow from a developer's perspective.
