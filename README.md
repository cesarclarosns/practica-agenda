# Practica Agenda

## Estructura de la practica

```
$PROJECT_ROOT
│   # Django app
├── backend
│   # React app
└── frontend
```

## Stack

Django REST Framework y React.
<br>
<br>

## Detalles sobre la aplicación.

1. Para ver los cambios realizados es necesario actualizar la página (al agregar contactos, eliminarlos, etc.).
2. Falta agregar validación de los formularios en el frontend.
3. Falta mejorar UX/UI.
   <br>
   <br>

## Instrucciones para correr la aplicación

### Iniciar el backend (la API)

1. Tener instalada una versión de "python3.8" y "pipenv".
2. En la carpeta "backend" ejecutar "pipenv install" para instalar todas las dependencias y subdepencias usando el archivo "Pipfile.lock".
3. Si el "ambiente virtual" no inicio automáticamente puedes iniciarlo ejecutando "pipenv shell".
4. Ejecuta "python manage.py makemigrations", "python manage.py migrate" y "python manage.py runserver" en order para iniciar el servidor.

### Iniciar el frontend

1. Si tienes instalado "yarn", dentro de la carpeta "frontend", ejecuta "yarn install" para instalar las dependencias usando el archivo "yarn.lock".
2. Si no tienes instalado "npm", dentro de la carpeta "frontend", elimina el archivo "yarn.lock" y ejecuta "npm install".
3. Ejecuta "yarn run start" o "npm run start".
4. Debes asegurarte de que el servidor de la API esté corriendo en el puerto "8000". Ahora ve a htttp://localhost:3000/ para ver la aplicación.
5. Registra una cuenta o inicia sesión con el usuario "chinchilla" y la contraseña "contraseña123456".
   <br>
   <br>

![App image](/static/app.png)
