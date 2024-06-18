document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://2npmpedtyzy5bl2cnfy6xckqcy0zbvzq.lambda-url.us-west-2.on.aws/'; // URL de tu API para obtener datos
    const updateUrl = 'https://tipsqcwdq25b6qsvfbeecp547m0rgpsp.lambda-url.us-west-2.on.aws/'; // URL de tu API para enviar datos

    // Crear un sonido de alerta con Howler.js
    const alertSound = new Howl({
        src: ['https://www.soundjay.com/buttons/sounds/button-2.wav'], // URL alternativa del archivo de audio
        loop: true // Habilitar el bucle
    });

    // Función para mostrar el spinner en el valor principal
    function showLiveValueSpinner() {
        const liveValueElement = document.getElementById('live-value');
        liveValueElement.classList.add('spinner');
        liveValueElement.textContent = ''; // Limpiar el contenido del valor en vivo
    }

    // Función para ocultar el spinner en el valor principal y mostrar el valor real
    function hideLiveValueSpinner(value) {
        const liveValueElement = document.getElementById('live-value');
        liveValueElement.classList.remove('spinner');
        liveValueElement.textContent = value; // Mostrar el valor en vivo
    }

    // Función para obtener datos de la API
    async function fetchData(deviceId) {
        try {
            showLiveValueSpinner(); // Mostrar el spinner antes de hacer la solicitud

            const response = await fetch(`${apiUrl}?device_id=${deviceId}`);
            const data = await response.json();

            // Opciones para formatear la fecha y hora en formato de 12 horas
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true // Para formato de 12 horas
            };

            // Convertir la fecha y hora al uso horario del navegador con el formato deseado
            const formattedDate = new Date(data.date).toLocaleString('es-ES', options);

            // Actualizar los valores en la página web
            document.getElementById('device-id').textContent = data.deviceId;
            document.getElementById('alert-threshold').textContent = data.alertThreshold;
            document.getElementById('time-interval').textContent = `${data.timeInterval}s`;
            document.getElementById('alert-active').textContent = data.alertActive ? 'Sí' : 'No';
            document.getElementById('date').textContent = formattedDate; // Actualizar la fecha y hora en la información del dispositivo
            hideLiveValueSpinner(data.liveValue); // Ocultar el spinner y mostrar el valor en vivo
            document.getElementById('live-date').textContent = `Fecha y Hora: ${formattedDate}`; // Actualizar la fecha y hora en la sección de datos en vivo

            // Cargar los valores actuales en el formulario
            document.getElementById('new-threshold').value = data.alertThreshold;
            document.getElementById('new-interval').value = data.timeInterval;

            // Actualizar el gráfico con los datos históricos
            chart.data.labels = data.history.map(item => new Date(item.timestamp));
            chart.data.datasets[0].data = data.history.map(item => item.value);
            chart.update();

            // Actualizar la línea de alerta en el gráfico
            chart.options.plugins.annotation.annotations.alertLine.value = data.alertThreshold;
            chart.update();

             // Manejar la alerta activa
            if (data.alertActive) {
                document.getElementById('live-value').classList.add('blink');
                document.getElementById('live-value').style.color = 'red';
                if (!alertSound.playing()) {
                    alertSound.play();
                }
            } else {
                document.getElementById('live-value').classList.remove('blink');
                document.getElementById('live-value').style.color = '#27ae60';
                alertSound.stop();
            }
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
            hideLiveValueSpinner('Error'); // Mostrar un mensaje de error si la solicitud falla
        }
    }

    // Configuración del gráfico
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Aquí irán las fechas/hora
            datasets: [{
                label: 'Mediciones',
                data: [], // Aquí irán los valores históricos
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        alertLine: {
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y',
                            value: 0, // Valor inicial, se actualizará dinámicamente
                            borderColor: 'red',
                            borderWidth: 2,
                            label: {
                                content: 'Umbral de Alerta',
                                enabled: false,
                                position: 'center'
                            }
                        }
                    }
                }
            }
        }
    });

    // Manejo del formulario de configuración
    document.getElementById('settings').addEventListener('submit', async (event) => {
        event.preventDefault();
        const newThreshold = document.getElementById('new-threshold').value;
        const newInterval = document.getElementById('new-interval').value;
        const deviceId = document.getElementById('device-id').textContent;

        // Mostrar el spinner
        document.getElementById('spinner').style.display = 'block';

        // Construir la URL con los parámetros
        const url = `${updateUrl}?device_id=${deviceId}&interval=${newInterval}&alert=${newThreshold}`;

        try {
            const response = await fetch(url, {
                method: 'GET'
            });

            if (response.ok) {
                // Actualizar los valores en la página web
                if (newThreshold) {
                    document.getElementById('alert-threshold').textContent = newThreshold;
                }

                if (newInterval) {
                    document.getElementById('time-interval').textContent = `${newInterval}s`;
                }

                // Cerrar el modal
                document.getElementById('settings-modal').style.display = 'none';
            } else {
                console.error('Error al enviar datos a la API:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar datos a la API:', error);
        } finally {
            // Ocultar el spinner
            document.getElementById('spinner').style.display = 'none';
        }
    });

    // Manejo del modal
    const modal = document.getElementById('settings-modal');
    const btn = document.getElementById('settings-button');
    const span = document.getElementsByClassName('close-button')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Llamar a la función fetchData con el device_id deseado
    const deviceId = 'rak5860_test_1'; // Reemplaza con el ID del dispositivo que deseas consultar
    fetchData(deviceId);

    // Revisar cada 30 segundos si existe un dato nuevo en la API
    setInterval(() => {
        fetchData(deviceId);
    }, 10000); // 30000 ms = 30 segundos
});