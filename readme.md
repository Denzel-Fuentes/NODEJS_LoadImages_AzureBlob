# Documentación del Código Node.js - Azure Blob Storage

## Importación de Módulos y Configuración Inicial

Se importan los módulos necesarios y se configuran las opciones iniciales, los modulos son los siguientes:

1. **@azure/storage-blob**:
   - Versión: ^12.15.0
   - Descripción: Librería para interactuar con el servicio de almacenamiento de blobs en Microsoft Azure. Permite gestionar y manipular archivos binarios, como imágenes o documentos, en la nube de Azure de manera eficiente.

2. **dotenv**:
   - Versión: ^16.3.1
   - Descripción: Biblioteca que facilita la carga de variables de entorno desde archivos `.env`. Es útil para almacenar configuraciones y secretos fuera del código fuente en aplicaciones Node.js.

3. **express**:
   - Versión: ^4.18.2
   - Descripción: Framework web rápido y minimalista para Node.js. Permite crear aplicaciones y APIs de manera sencilla y eficiente, manejando rutas, peticiones HTTP y otros aspectos de desarrollo web.

4. **multer**:
   - Versión: ^1.4.5-lts.1
   - Descripción: Middleware para el manejo de carga de archivos en aplicaciones Express. Facilita la subida de archivos desde formularios web, como imágenes en un formulario de carga de perfil de usuario.

5. **streamifier**:
   - Versión: ^0.1.1
   - Descripción: Pequeña biblioteca que convierte datos en streams legibles. Útil para transformar datos en formato binario o en buffers en un flujo de datos que puede ser manejado de manera más eficiente.

## Definición de Funciones

- `getBlobName(originalName)`: Genera un nombre único para un blob combinando un identificador aleatorio y el nombre original del archivo.

## Configuración de Middleware

- `bodyParser`: Analiza el contenido del cuerpo de las solicitudes en formato JSON y datos de formulario.
- `express.static`: Sirve archivos estáticos desde el directorio "public".

## Ruta GET "/all"

- Obtiene una lista de blobs desde el contenedor de Azure Blob Storage.
- Itera a través de los blobs y construye una cadena HTML de imágenes y videos usando las URL de los blobs.
- Responde con la cadena HTML al cliente.
## Archivo confing.js
* `getStorageAccountName:()` se encarga de obtener el nombre de usuario de la cadena de conexion que proporciona Azure que encontramos en las variables de entorno

## Ruta POST "/upload"

- Maneja la carga de archivos al contenedor de Azure Blob Storage.
- Genera un nombre de blob único para el archivo cargado.
- Crea un flujo de lectura a partir del buffer del archivo adjunto.
- Configura las opciones de encabezados HTTP del blob, incluyendo el tipo de contenido y la disposición del contenido.
- Carga el archivo en el contenedor de Blob Storage y responde al cliente con un mensaje de éxito.

## Inicio del Servidor

- El servidor se inicia con el comando "`npm run dev`".
- El servidor Express se inicia en el puerto 5000.
- Se muestra un mensaje en la consola indicando que el servidor está en funcionamiento.

#HOLA DENZEL ESPERO QUE ESTES MUY BIEN
##
