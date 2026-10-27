# El hobbit · Recomendación de lectura

Web sobre el libro de *El hobbit*, de J. R. R. Tolkien: sinopsis, el viaje de Bilbo parada a parada, personajes, autor, ficha del libro y enlaces para seguir explorando la Tierra Media.

Práctica (PEC1) de la asignatura **Herramientas HTML y CSS II** del Máster en Desarrollo de Aplicaciones y Sitios Web de la [Universitat Oberta de Catalunya](https://www.uoc.edu).

- **Web publicada:** [https://pec1-el-hobbit.netlify.app/](https://pec1-el-hobbit.netlify.app/)
- **Autor:** Pedro Otálora Giménez

## Tecnologías

- [UOC Boilerplate](https://github.com/uoc-advanced-html-css/uoc-boilerplate) 3.14 (Parcel 2)
- Sass con arquitectura ITCSS y metodología BEM
- Stylelint (`stylelint-config-standard-scss` y `stylelint-config-recess-order`)
- Animaciones ligadas al scroll con CSS (*scroll-driven animations*) como mejora progresiva
- JavaScript sin dependencias para el menú, la sección activa y las cartas de personaje

## Uso

Requiere [Node.js](https://nodejs.org/) (versión indicada en `.nvmrc`).

```bash
npm install       # instala las dependencias
npm run dev       # servidor de desarrollo con recarga automática
npm run build     # valida con Stylelint y compila para producción en dist/
```

## Créditos

Las fuentes de los contenidos, las imágenes (con indicación de las generadas con IA), los iconos y las tipografías, con sus licencias, se detallan en la sección **Fuentes y créditos** de la propia web.

Proyecto basado en UOC Boilerplate, de Jordi Tarrida (licencia MIT).