import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

// Cargo los usuarios desde el archivo CSV para no quemar los datos en el código.
// Uso SharedArray porque así K6 no se come la memoria RAM duplicando datos por cada usuario virtual.
const csvData = new SharedArray('usuarios_login', function () {
    // Leo el archivo, le quito espacios raros y lo divido por líneas
    const fileContents = open('./usuario.csv').trim().split('\n');
    
    // Le quito la primera línea porque es el encabezado (user,passwd) y no me sirve como dato
    fileContents.shift(); 
    
    // Mapeo cada línea separándola por la coma para armar un objeto con user y passwd
    return fileContents.map(line => {
        const [user, passwd] = line.trim().split(',');
        return { user, passwd };
    });
});

// Acomodo las reglas y metas de la prueba técnica (los SLAs )
export const options = {
    scenarios: {
        login_load_test: {
            executor: 'constant-arrival-rate', // Mantener las peticiones estables así la API se ponga lenta
            rate: 20,              // pidieron al menos 20 transacciones por segundo (TPS)
            timeUnit: '1s',
            duration: '30s',       // Tiempo total que va a durar corriendo la prueba
            preAllocatedVUs: 20,   // Arranca con 20 usuarios virtuales listos
            maxVUs: 50,            // Si se acumula la carga, le damos permiso de subir hasta 50
        },
    },
    thresholds: {
        // SLA 1: El 95% de los tiempos de respuesta tienen que responder en menos de 1.5s (1500ms)
        http_req_duration: ['p(95)<1500'],
        // SLA 2: La tasa de errores no puede superar el 3% (0.03)
        http_req_failed: ['rate<0.03'],
    },
};

// Esta es la función principal que va a ejecutar K6 en bucle durante los 30 segundos
export default function () {
    // Agarro un usuario al azar de la lista que sacamos del CSV
    const randomUser = csvData[Math.floor(Math.random() * csvData.length)];

    const url = 'https://fakestoreapi.com/auth/login';
    
    // Armo el JSON mandando el usuario y la clave seleccionados
    const payload = JSON.stringify({
        username: randomUser.user,
        password: randomUser.passwd,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Le disparo el POST a la API de login
    const res = http.post(url, payload, params);

    // Valido que la API me responda bien
    check(res, {
        'status es 200 o 201': (r) => r && (r.status === 200 || r.status === 201),
        'retorna token': (r) => r && r.body.includes('token'),
    });
}
