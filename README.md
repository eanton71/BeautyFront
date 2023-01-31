

-------------
## Añadida libreria material de Angular para calendario y demas cosas 
`ng add @angular/material`

[https://material.angular.io/guide/getting-started](https://material.angular.io/guide/getting-started)

## Necesario para leer archivos JSON en Angular
Añadido archivo ./src/app/json-typings.d.ts
```ts
declare module "*.json" {
  const value: any;
  export default value;
}
```
------------
----------
## Peticiones HTTP
La declaracion de rutas se guarda al comienzo del archivo ts o en los archivos de la carpeta enviroments
RUTA: http://IP/PUERTO/PATH
En Frontend. Se implementan en los archivos service

```ts
export class ProductService {
  private port = 3000; 
  private urlpost = 'http://localhost:' + this.port +'/api/add_product';
...
```
TODO: 
Fijarse en elarchivo /services/cita.service.ts
estan las peticiones HTTP , hay que implementarlas 



----
# BeautyFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

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

