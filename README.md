# Example Administration Web Site (Webapp)

This project is a simple user management app. It allows the user to perform CRUD operations on a list of users, including create, read, update, and delete.

## Project Structure
```
project/
├── e2e/
│   ├── src/
│   ├── protractor.conf.js
│   ├── tsconfig.json
│   └── tsconfig.e2e.json
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── user/
│   │   │   │   ├── user.component.css
│   │   │   │   ├── user.component.html
│   │   │   │   ├── user.component.spec.ts
│   │   │   │   ├── user.component.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   ├── services/
│   │   │   ├── user/
│   │   │   │   ├── user.service.spec.ts
│   │   │   │   └── user.service.ts
│   │   └── app.component.*
│   │   └── app.module.ts
│   │   └── app-routing.module.ts
│   │
│   ├── assets/
│   │   └── ...
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.css
│
├── angular.json
├── package.json
├── package-lock.json
├── LICENSE
├── .editorconfig
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Running the Project
1. To install dependencies run `npm install`.
2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
3. Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Features
- List of all users with pagination
- Create new user
- Edit existing user
- Delete user

## Dependencies
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0 using the instruction `ng new`. It uses Angular material as additional pre-installed dependency, as specified in package.json file.
- 

## License
This project is licensed under the MIT License. See the LICENSE file for details.
