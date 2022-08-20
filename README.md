# MyShoppingList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.  

It is a client for a self-hosted shopping list where users can access the list with different devices.  
The server with a suitable database file will be added later.  
Also translations may be included in the future.  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.  

For the backend, the php-crud-api is used.  
Go into the server folder and run `php -S localhost:8080`.
Now the client can send and receive data from the backend.
To store the data, a SQLite database is used.
The file `databse.sqlite3` is in the server directory.

## Structure of the database.sqlite3 file

The 'items' table structure:  

| row   | type    |
|-------|---------|
| id    | INTEGER |
| name  | TEXT    |
| count | INTEGER |  

The 'shoppinglist' table structure:  

| row     | type    |
|---------|---------|
| id      | INTEGER |
| item_id | INTEGER |
| deleted | INTEGER |  



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
