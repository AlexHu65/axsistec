# axsistec
Prueba de desarrollo para axistec


Requerimientos:
Se solicita realizar un sistema para dar de alta Usuarios el cual deberá contar con las siguientes funcionalidades:

Login
• Usuario
• Contraseña
Alta usuarios
• Id, campo autogenerado por el sistema y no editable.
• Correo electrónico, el campo deberá validar la estructura del correo.
• Usuario, campo alfanumérico. Longitud mínima 7 caracteres.
• Contraseña, campo alfanumérico que contenga amenos
o mayúscula
o minúscula
o símbolo
o numero
o La longitud deberá ser de amenos 10 caracteres.
o Deberá de estar encriptada.
• Estatus:
o Activo
o Inactivo
o El campo deberá ser booleano
• Sexo
o Masculino
o Femenino
• Fecha de Creación, campo autogenerado y no editable.
Actualización usuarios:
• Se podrá actualizar los siguientes campos:
o Usuario
o Contraseña, se deberá validad en un doble campo para rectificar que las contraseñas coincidan.
o Sexo
o Correo Electrónico

Consulta Usuarios
• El estatus deberá mostrarse de la siguiente manera:
o Activo ( SI )
o Inactivo ( NO )
• Utilizar una tabla implementando algún plug-in para mostrar la información de los usuarios que contenga la
siguiente información:
o Id
o Usuario
o Correo
o Sexo
o Estatus

Proyecto: Sistema Genérico RH Documento: Requerimiento.

v 1.1
Pág. 2 de 2

ID-002 Nombre del formato: AYD RH
Autor: EHO

• Acciones
o Eliminar ( Inactiva al usuario )
o Editar
Reglas
• Regla 1: Se deberá validad que no exista otro usuario con los mismos datos.
• Regla 2: La contraseña se deberá validar que coincida en dos campos.
• Regla 3: La contraseña deberá estar encriptada.
• Regla 4: El id deberá ser generado automáticamente por la tabla de SQL.
• Regla 5: La acción eliminar solo inactiva los usuarios.
• Regla 6: La aplicación deberá ser responsiva.
• Regla 7: La aplicación deberá tener un diseño en capas, como mínimo: Vista, Negocio, Datos.
Tecnologías a utilizar:
• Html5
• Asp.NET MVC ó .NET CORE (Deseado)
• Bootstrap
• JQuery
• Angular JS / React( Deseado )
• C#
• MS SQL
• Entity Framework. ( Deseado )
• Store procedures ( Opcional )
Entregables:
• Solución del proyecto
• Script / Respaldo de la base de datos

# Detalles del requerimiento

1 . En el backend dentro de la carpeta scripts se encuentran los procedimientos almacenados y un archivo con nombre axsistec.sql, el cual es un respaldo de la bd
2 . Inicio del backend: Se instalan las dependencias con npm install, una vez instaladas vamos a correr: npm run dev, el cual corre mediante nodemon
3 . Inicio del front: Se hace la instalacion con npm install,  seguido de ng serve
4 . URL Backend  http://localhost:3000
4 . URL del front http://localhost:4200


# Detalles de la version

MySql
version 5.1.1

npm
verion 6.14.15

Angular CLI
@angular-devkit/architect    0.1202.5 (cli-only)
@angular-devkit/core         12.2.5 (cli-only)
@angular-devkit/schematics   12.2.5 (cli-only)
@schematics/angular          12.2.5 (cli-only)

@angular/core": "~12.2.0",

# Configurar backend

El backend contiene un archivo llamos default.json para configurar los accesos a la base de datos
/backend/config/default.json

{
    "app": {
        "port": 3000
    },
    "db": {
        "host": "localhost",
        "user": "root",
        "password": "",
        "name": "axsistec"
    }
}

