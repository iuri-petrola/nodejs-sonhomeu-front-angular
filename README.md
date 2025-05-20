
# criar projeto
ng new front-Angular --style=scss

# Criar componentes
ng generate component shared/header
ng generate component shared/footer
ng generate component shared/banner
ng generate component shared/card
ng generate component shared/container
ng generate component pages/home
ng generate component shared/card-busca
ng generate component shared/form-busca
ng generate component shared/modal
ng generate service   core/servicos/produtos
ng generate environments
ng generate service core/servicos/auth
ng generate component pages/login
ng generate component pages/register
ng generate component pages/carrinho
ng generate service core/servicos/carrinho

# Angular material
# https://material.angular.dev/
ng add @angular/material



# ##########################################################################################################################


# FrontAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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
