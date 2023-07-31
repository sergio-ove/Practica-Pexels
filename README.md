# Practica-Pexels

Práctica mostrando imágenes a traves de la API de pexels utilizando las siguientes tecnologías:

- Delegación de eventos
- Asincronía
- Uso de FETCH
- Maquetación responsive.

### Inicialización del proyecto:

Para inicializar el proyecto abrir la terminal y escribir los siguientes comandos:

Con éste se clonará de GitHub mi repositorio de la práctica.

```
git clone https://github.com/sergio-ove/Practica-Pexels.git
```
Abriremos el proyecto desde 'index.html' 

```
Se abrirá el navegador en (http://localhost:3000) y podrá visualizarse el Inicio.
```

Una vez iniciado se podrá visualizar:

- Un buscador: Podremos introducir una palabra y la aplicación nos dará como resultado todas las fotos de pexels relacionadas con esa palabra.

- Una segunda sección que se visualizarán 3 fotos relacionadas con el tema "tendencias" y que se actualizarán cada día por parte de pexels

- Una tercera sección con fotos de un array propio llamado "arrayMisFotos" y que se visualizarán como "Más visitadas del mes".

Este array contendrá objetos con las siguientes propiedades:
```
id
categoria
url
```
Estas fotos nos dará posibilidad de cliquear en ella y llevarnos a una segunda página llamada "fotoGrande.html" que nos mostrará 10 fotos relacionadas la categoría de la foto.

En esta segunda página tendremos también la opción de volver mediante un enlace a nuestra página principal 'index.html'