# Smartcart web app

[![.github/workflows/deploy.yml](https://github.com/URI-Smartcart/smartcart-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/URI-Smartcart/smartcart-app/actions/workflows/deploy.yml)

**Contributors:** Benjamin Dahrooge <bdahrooge@uri.edu>, Michael Alssid <michael_alssid@uri.edu>

**Summary:** This repo is a loose refactor of https://github.com/URI-Smartcart/PWA-master. The application aims to allow study participants to manage their food preferences, view coupons and recipies feed from the recommender.  

## Current Status

See the Kanban in Github for current tasks/statuses.

## Running the app (October 2023)

1. Install [nvm](https://github.com/creationix/nvm), [n](https://github.com/tj/n), or some other Node.js version manager to get a local version of Node.
2. Run `npm install` to install all the required files for the project
3. Copy `.env.development` to a new file `.env.development.local`, and fill in the four environment variables with the `AWS_` prefix with appropriate AWS account details for local development
4. Run `npm run dev` to start the server locally and serve the application at `http://localhost:3000`. When running on MacOS, you may need to set the environment option `NODE_OPTIONS="--openssl-legacy-provider"` as well (so the full command would be `NODE_OPTIONS="--openssl-legacy-provider" npm run dev`)