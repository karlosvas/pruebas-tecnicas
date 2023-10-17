import { describe, it, afterEach } from 'node:test'
import { equal, ifError } from 'node:assert/strict'
import { readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

// Callbaks
import { procesarArchivoCallbak } from "../solutions/index.js"
describe('3 procesarArchivoCallbak', () => {
    afterEach(() => {
        try {
            unlinkSync('output.txt');
        } catch { }
    });

    it('3.1 procesarArchivoCallbak', (done) => {
        writeFileSync('input.txt', 'gogogo');
        procesarArchivoCallbak((err) => {
            if (err) {
                return done(err);
            }
            const contenido = fs.readFileSync('output.txt', 'utf8');
            try {
                assert.equal(contenido, 'GOGOGO');
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});

// //Await Version.
import { procesarArchivoAwait } from '../solutions/index.js'

describe('3.1 procesarArchivoAwait', () => {
    afterEach(() => {
        try {
            unlinkSync('output.txt')
        } catch { }
    })

    it('3.1 procesarArchivoAwait', async () => {
        writeFileSync('input.txt', 'hola')
        await procesarArchivoAwait()
        const contenido = await readFile('output.txt', 'utf8')
        equal(contenido, 'HOLA')
    })
})

// // Promises
import { procesarArchivoPromise } from '../solutions/index.js'

describe('3.2 procesarArchivoPromise', () => {
    afterEach(() => {
        try {
            unlinkSync('output.txt')
        } catch { }
    })

    it('3.2 procesarArchivoPromise', async () => {
        writeFileSync('input.txt', 'hola')
        await procesarArchivoPromise()
        const contenido = await readFile('output.txt', 'utf8')
        equal(contenido, 'HOLA')
    })
})
