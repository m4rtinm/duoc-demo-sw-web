# Aplicación IoT

## Descripción

La **Aplicación IoT** es una página web diseñada para mostrar datos en vivo de un dispositivo IoT, así como un gráfico histórico de los datos recopilados. La aplicación también permite configurar el umbral de alerta y el intervalo de tiempo de envío de datos del dispositivo. Además, la aplicación proporciona una visualización clara de la información del dispositivo y alerta al usuario cuando se activa una alerta.

## Funcionalidades

- **Visualización de Datos en Vivo**: Muestra el valor actual del dispositivo IoT y la fecha y hora de la última actualización.
- **Gráfico Histórico**: Muestra un gráfico de línea con los datos históricos del dispositivo.
- **Información del Dispositivo**: Muestra detalles del dispositivo como el ID, umbral de alerta, intervalo de tiempo, estado de alerta y fecha.
- **Configuración del Dispositivo**: Permite al usuario cambiar el umbral de alerta y el intervalo de tiempo mediante un formulario.
- **Alertas**: Cuando se activa una alerta, el valor en vivo parpadea en rojo y se reproduce un sonido de alerta.
- **Línea de Alerta en el Gráfico**: Muestra una línea horizontal roja en el gráfico que indica el valor del umbral de alerta.

## Tecnologías Utilizadas

- **HTML**: Para la estructura de la página web.
- **CSS**: Para el diseño y estilo de la página web.
- **JavaScript**: Para la lógica y funcionalidad de la aplicación.
- **Chart.js**: Para la creación del gráfico histórico.
- **Howler.js**: Para la reproducción de sonidos de alerta.
- **chartjs-plugin-annotation**: Para agregar anotaciones al gráfico, como la línea de alerta.

## Funcionamiento Interno

1. **Obtención de Datos**: La aplicación realiza llamadas a una API REST para obtener los datos del dispositivo IoT, incluyendo el valor en vivo, los datos históricos, el umbral de alerta y el intervalo de tiempo.
2. **Actualización de la Interfaz**: Los datos obtenidos se utilizan para actualizar la interfaz de usuario, mostrando el valor en vivo, la información del dispositivo y el gráfico histórico.
3. **Configuración del Dispositivo**: El usuario puede cambiar el umbral de alerta y el intervalo de tiempo mediante un formulario. Los cambios se envían a la API REST y se actualizan en la interfaz.
4. **Alertas**: Si se activa una alerta, el valor en vivo parpadea en rojo y se reproduce un sonido de alerta. La alerta se detiene cuando la condición de alerta deja de cumplirse.
5. **Línea de Alerta en el Gráfico**: Se muestra una línea horizontal roja en el gráfico que indica el valor del umbral de alerta. Esta línea se actualiza dinámicamente con los nuevos valores obtenidos de la API.

## Instalación y Uso

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/Wisely-ingenieria/duoc-demo-sw-web.git
   cd duoc-demo-sw-web
   ```

2. **Abrir el Archivo HTML**:
   Abre el archivo `index.html` en tu navegador web para ver la aplicación en funcionamiento.

3. **Configuración de la API**:
   Asegúrate de que la URL de la API REST esté correctamente configurada en el archivo `script.js`.

## Créditos

El sonido de alerta fue tomado de [SoundJay](https://www.soundjay.com/).