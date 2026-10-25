================================================================================
CÓMO CLONAR Y EJECUTAR RÁPIDAMENTE
================================================================================

1. Clonar el repositorio:
   git clone https://github.com/PinguiPau/Prueba-tecnica-ejercicio-performance.git

2. Entrar a la carpeta del proyecto:
   cd Prueba-tecnica-ejercicio-performance

3. Ejecutar la prueba de carga con Grafana K6:
   k6 run script.js

================================================================================

================================================================================

           MANUAL DE USUARIO Y DESPLIEGUE PASO A PASO (GRAFANA K6)

================================================================================



Este manual está redactado de forma secuencial y detallada para acompañar al

usuario o evaluador desde la instalación inicial de las herramientas hasta la

ejecución exitosa de la prueba de carga en Visual Studio Code.



--------------------------------------------------------------------------------

PASO 1: INSTALACIÓN DE GRAFANA K6 Y VERIFICACIÓN DE ENTORNO

--------------------------------------------------------------------------------



1.1. Abre la terminal de comandos de tu sistema operativo (PowerShell o CMD).



1.2. Para instalar K6, copia y ejecuta el siguiente comando:



     winget install k6 --source winget



1.3. Resultado esperado de la instalación:

     La terminal procesará la descarga y mostrará la confirmación:

     "Instalado correctamente" o "Successfully installed".



1.4. Para verificar que la instalación fue exitosa, ejecuta:



     k6 version



1.5. Resultado esperado de la verificación:

     La pantalla debe responder imprimiendo la versión de K6 activa, por ejemplo:

     "k6 v0.45.0 (202x-xx-xx), go1.20, windows/amd64"



   [SI OBTUVISTE ESTE RESULTADO ESPERADO, AVANZA AL PASO 2]



--------------------------------------------------------------------------------

PASO 2: APERTURA Y PREPARACIÓN DEL PROYECTO EN VISUAL STUDIO CODE

--------------------------------------------------------------------------------



2.1. Abre la aplicación Visual Studio Code en tu equipo.



2.2. En el menú superior de VS Code, haz clic en:

     Archivo -> Abrir carpeta... (File -> Open Folder...)



2.3. Selecciona la carpeta raíz donde descargaste o clonaste este proyecto y 

     haz clic en "Seleccionar carpeta".



2.4. Abre la terminal integrada de VS Code presionando las teclas:

     Ctrl + Shift + ` (o desde el menú superior: Terminal -> Nueva terminal).



2.5. Para verificar que la terminal está ubicada en la ruta correcta y que todos

     los archivos necesarios existen, ejecuta en la terminal de VS Code:



     Get-ChildItem



2.6. Resultado esperado:

     Debes visualizar en la lista de archivos de la terminal los siguientes elementos:

     - script.js        (Script de pruebas K6)

     - usuario.csv      (Archivo de datos con credenciales)

     - readme.txt       (Este manual)

     - conclusiones.txt (Informe de resultados)



   [SI VERIFICASTE TODOS LOS ARCHIVOS EN VS CODE, AVANZA AL PASO 3]



--------------------------------------------------------------------------------

PASO 3: EJECUCIÓN DE LA PRUEBA DE CARGA DESDE VS CODE

--------------------------------------------------------------------------------



3.1. Con la terminal de VS Code abierta en la carpeta del proyecto, ejecuta:



     k6 run script.js



3.2. Comportamiento esperado durante la ejecución:

     Verás una barra de progreso indicando la ejecución del escenario 

     "login_load_test" procesando solicitudes a una tasa de 20 TPS durante 30s.



3.3. Resultado esperado al finalizar la prueba:

     La terminal de VS Code mostrará el resumen de métricas con todos los checks 

     en color verde y los criterios de aceptación (SLAs) superados:



     [✓] 'p(95)<1500'  --> p(95) ~ 486.47ms (SLA CUMPLIDO)

     [✓] 'rate<0.03'   --> rate = 0.00%     (SLA CUMPLIDO)

     [✓] status es 200 o 201 (100% de éxito en aserciones)

     [✓] retorna token       (100% de éxito en autenticación)



     checks_succeeded...: 100.00% (1200 out of 1200)

     http_reqs..........: 600     (19.78/s ~ 20 TPS)



   [SI APARECEN TODOS LOS '✓' EN VERDE, LA PRUEBA FUE UN ÉXITO TOTAL]



--------------------------------------------------------------------------------

PASO 4: EJECUCIÓN OPCIONAL CON EXPORTACIÓN DE REPORTE JSON

--------------------------------------------------------------------------------



4.1. Si deseas generar un reporte en formato JSON con la traza de datos para 

     auditoría, ejecuta en la terminal de VS Code:



     k6 run --out json=resume.json script.js



4.2. Resultado esperado:

     Al finalizar los 30 segundos, se creará automáticamente en el explorador 

     de archivos de VS Code el archivo 'resume.json'.



4.3. Verificación del archivo generado:

     Ejecuta en la terminal:



     Get-ChildItem resume.json



     Resultado esperado: Se confirmará la presencia del archivo 'resume.json'.



--------------------------------------------------------------------------------

PASO 5: RESOLUCIÓN DE INCIDENTES COMUNES (TROUBLESHOOTING)

--------------------------------------------------------------------------------



SITUACIÓN 1: La terminal de VS Code dice "'k6' no se reconoce como un comando..."

- Causa: VS Code se abrió antes de terminar la instalación de K6.

- Solución: Cierra VS Code por completo, vuelve a abrirlo y abre una nueva terminal.



SITUACIÓN 2: Error "cannot open ./usuario.csv"

- Causa: La terminal integrada de VS Code no está posicionada en la carpeta del proyecto.

- Solución: Ejecuta 'pwd' para revisar la ubicación actual y usa 'cd <ruta>' para 

  moverte hacia la carpeta correcta.



SITUACIÓN 3: Bloqueo de ejecución de scripts en PowerShell dentro de VS Code.

- Causa: Políticas de restricción del sistema.

- Solución: Abre PowerShell como Administrador fuera de VS Code y ejecuta:

  Set-ExecutionPolicy Unrestricted -Scope Process

  Presiona 'S' para aceptar y vuelve a ejecutar en VS Code.

================================================================================
