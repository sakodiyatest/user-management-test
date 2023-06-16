# user-management

## Tech Stack Used
- Frontend: ReactJS
- Backend: NodeJS
- Database: Postgres

## Backend-setup
- Create the .env file otherwise it would take default configuration mentioned in this file `/backend/src/config/app.js`. You can take the reference from .env_sample file.

- Install the dependencies using command `npm i`.

- A `postgres database` is required. So please install necessary packages if you are running this app in local environment. Run the command `npx sequelize-cli db:create` for creating the database.

- After creating the database, run the migration using command `npx sequelize-cli db:migrate`. It will create the `User` table in database.

- Start the development server using command `npm run start:dev`

## Frontend-setup
- Update the backend server URL in .env file. You can take reference from .env_sample file.
- Install the dependencies using command `npm i`
- Run the app using command `npm run start`

## Dependencies Used: 
Although, I have used various dependencies but please have a look at the main dependencies of both sides:

**Backend:**
- ExpressJS
- Sequelize
- Validate.JS
- Convict
- dotenv

**Frontend:**
- MaterialUI
- React-query
- Formik
- React-router

