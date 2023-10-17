// 1 - Arregla esta función para que el código posterior funcione como se espera:
import net from 'node:net'
export const ping = (ip, callback) => {
    const startTime = process.hrtime()

    const client = net.connect({ port: 80, host: ip }, () => {
        client.end()
        callback(null, { time: process.hrtime(startTime), ip })
    })

    client.on('error', (err) => {
        callback(err)
        client.end()
    })
}

// ping('www.google.com', (err, info) => {
//     if (err) console.error(err)
//     else console.log(info)
// })

// 2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:
export function obtenerDatosPromise() {
    return new Promise((resolve) => {
        resolve({ data: 'datos importantes' });
    })
}

// Primise.then()
// obtenerDatosPromise()
//     .then(info => {
//         console.log(info)
//     }).catch((err) => console.log(err))

// Await
// try {
//     const { info } = await obtenerDatosPromise()
//     console.log(info)
// } catch (err) {
//     console.error(err)
// }

//3 - Explica qué hace la funcion. Identifica y corrige los errores en el siguiente código. Si ves algo innecesario, elimínalo. Luego mejoralo para que siga funcionando con callback y luego haz lo que consideres para mejorar su legibilidad.

import fs from 'fs'
import { promises as fsp } from 'fs';

// // Callback version
export function procesarArchivoCallbak(callback) {
    fs.readFile('input.txt', 'utf8', (err, contenido) => {
        if (err) {
            console.error("Error leyendo archivo", err.message)
            callback(err)
        }
        const textoProcesado = contenido.toUpperCase();
        fs.writeFile('output.txt', textoProcesado, err => {
            if (err) {
                console.error('Error guardando archivo:', err.message);
            }
            console.log('Archivo guardado correctamente con Callbaks');
            return true
        });
    })
}
// procesarArchivoCallbak()

// // Await Version
export async function procesarArchivoAwait() {
    let contenido = ""
    try {
        contenido = await fsp.readFile('input.txt', 'utf8');
    } catch (error) {
        console.error("Error leyendo el archivo", error.message)
        throw error
    }

    const textoProcesado = contenido.toUpperCase();

    try {
        await fsp.writeFile('output.txt', textoProcesado);
        console.log("Archivo guardado correcatemnte con Await")
    } catch (error) {
        console.log("Error guardando el archivo", e.message)
        throw error
    }
}
// // await procesarArchivoAwait()

// // Promise version
export function procesarArchivoPromise() {
    return fsp.readFile('input.txt', 'utf8')
        .then((contenido) => {
            const textoProcesado = contenido.toUpperCase();
            return fsp.writeFile('output.txt', textoProcesado);
        })
        .then(() => {
            console.log('Archivo guardado correctamente con Promises');
            return true;
        })
        .catch((err) => {
            console.error('Ocurrió un error:', err.message);
            throw err;
        });
}

// procesarArchivoPromise()
//     .catch((err) => {
//         console.error('Error en la Promesa principal:', err.message);
//     });

// 4 - ¿Cómo mejorarías el siguiente código y por qué? Arregla los tests si es necesario:
// import { promises as fsp } from 'node:fs';

// // Transformar en asincrona.
export async function readAsync() {
    const archivo1 = await fsp.readFile('archivo1.txt', 'utf8');
    const archivo2 = await fsp.readFile('archivo2.txt', 'utf8');
    const archivo3 = await fsp.readFile('archivo3.txt', 'utf8');

    const res = `${archivo1} ${archivo2} ${archivo3}`
    console.log(res)
    return res
}
// readAsync();

// Funciones asincronas en paralelo (Paralelo)
export async function readAsyncParalel() {
    const [archivo1, archivo2, archivo3] = await Promise.allSettled([
        fsp.readFile('archivo1.txt', 'utf8'),
        fsp.readFile('archivo2.txt', 'utf8'),
        fsp.readFile('archivo3.txt', 'utf8')
    ]).catch((e) => console.error(e))
    const message = [archivo1.value, archivo2.value, archivo3.value]
        .filter((value) => typeof value !== 'undefined')
        .join(' ')
    console.log(message)
    return message;
}
// readAsyncParalel();


// 5 - Escribe una funcion `delay` que retorne una promesa que se resuelva después de `n` milisegundos. Por ejemplo:

export async function delay(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hola mundo")
        }, delay)
    })
}

// delay(300)
//     .then(res => {
//         console.log(res)
//     }).catch(err => console.error(err.message))