# Angular-login
Proyecto en Angular de login

Crear una aplicación simple de registro, inicio de sesión y administración de usuarios (CRUD) con Angular 14 o 15.

La aplicacion debe contener las siguientes páginas para demostrar la funcionalidad de inicio de sesión, registro y CRUD:

- Iniciar sesión (/account/login): un formulario de inicio de sesión simple con campos de nombre de usuario y contraseña.
- Registrarse (/account/register): un formulario para registrar una nueva cuenta.
- Inicio (/): la página de inicio con un mensaje de bienvenida que se muestra después de iniciar sesión correctamente.
- Lista de usuarios (/users): la página predeterminada de la sección de usuarios para realizar operaciones CRUD. Muestra una lista de todos los usuarios con botones para agregar, editar y eliminar.
- Agregar usuario (/users/add): un formulario para crear un nuevo usuario.
- Editar usuario (/users/edit/:id): un formulario para actualizar el usuario con el :id especificado.

## Formas construidas con Angular Reactive Forms
Los formularios pueden estar construidos con la biblioteca Reactive Forms que viene como parte del marco Angular (en @angular/forms). Utiliza un enfoque basado en modelos para crear, validar y manejar formularios en Angular. Para obtener más información, consulta [aquí](https://angular.io/guide/reactive-forms).

### Notas para devs
Puedes utilizar el backend que consideres, node, o el "fake backend" de angular, mas info aquí [aquí](https://medium.com/echohub/angular-httpinterceptor-usage-like-fake-backend-ee20353ded72) 
