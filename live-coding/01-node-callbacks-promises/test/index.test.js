import { describe, it, afterEach, beforeEach, after } from 'node:test'
import { equal, ifError, deepStrictEqual } from 'node:assert/strict'
import { unlinkSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import request from 'supertest'

/////////////////////  1  ///////////////////////////////////

import { ping } from "../solutions/index.js";

describe('1. ping', () => {
  it('1.1. ping midu.dev', (_, done) => {
    ping('midu.dev', (err, info) => {
      ifError(err)
      equal(info.ip, 'midu.dev')
      done()
    })
  })
})

/////////////////////  2  ///////////////////////////////////

import { obtenerDatosPromise } from "../solutions/index.js";

describe('2. obtenerDatosPromise', () => {
  it('2.1. obtenerDatosPromise', async () => {
    const { data } = await obtenerDatosPromise({ time: 1 })
    equal(data, 'datos importantes')
  })
})

/////////////////////  3  ///////////////////////////////////

import { procesarArchivoCallbak } from "../solutions/index.js"

describe('3 procesarArchivoCallbak', () => {
  afterEach(() => {
    try {
      unlinkSync('output.txt')
    } catch { }
  })

  it('3.1 procesarArchivoCallbak', (done) => {
    writeFileSync('input.txt', 'gogogo')
    procesarArchivoCallbak((err) => {
      ifError(err)
      readFile('output.txt', 'utf8')
        .then((contenido) => {
          equal(contenido, 'GOGOGO')
          done()
        })
    })
  })
})

//Await Version.
import { procesarArchivoAwait } from '../solutions/index.js'

describe('3.1 procesarArchivoAwait', () => {
  it('3.1 procesarArchivoAwait', async () => {
    writeFileSync('input.txt', 'hola')
    await procesarArchivoAwait()
    const contenido = await readFile('output.txt', 'utf8')
    equal(contenido, 'HOLA')
  })
})

// Promises
import { procesarArchivoPromise } from '../solutions/index.js'

describe('3.2 procesarArchivoPromise', () => {
  it('3.1 procesarArchivoPromise', async () => {
    writeFileSync('input.txt', 'hola')
    await procesarArchivoPromise()
    const contenido = await readFile('output.txt', 'utf8')
    equal(contenido, 'HOLA')
  })
})

/////////////////////  4  ///////////////////////////////////

import { readAsync, readAsyncParalel } from "../solutions/index.js"

describe('4. readAsync', () => {
  it('4.1. readAsync', async () => {
    const mensaje = await readAsync()
    equal(mensaje, 'hola qué tal')
  })
})
describe('4. readAsyncParalel', () => {
  it('4.1. readAsyncParalel', async () => {
    const mensaje = await readAsyncParalel()
    equal(mensaje, 'hola qué tal')
  })
})

/////////////////////  5  ///////////////////////////////////

import { delay } from "../solutions/index.js"

describe('5. delay', () => {
  it('4.1. delay', async () => {
    const mensaje = await delay()
    equal(mensaje, 'hola mundo')
  })
})

/////////////////////  6  ///////////////////////////////////

import { createRequire } from 'node:module'
import { config } from '../solutions/dotenv.js'

describe('6. dotenv', () => {
  beforeEach(() => {
    // clean process.env
    for (const key of Object.keys(process.env)) {
      delete process.env[key]
    }
  })

  afterEach(() => {
    try {
      unlinkSync('.env')
    } catch { }

    try {
      unlinkSync('./test/.env.local')
    } catch { }
  })

  it('6.1 load .env file', () => {
    // create .env file in root directory
    writeFileSync('.env', 'PORT=3000\nTOKEN="123abc"')
    config()

    equal(process.env.PORT, '3000')
    equal(process.env.TOKEN, '123abc')
  })

  it('6.2 load .env file from custom path', () => {
    // create .env file in root directory
    writeFileSync('./test/.env.local', 'PORT=3000\nTOKEN="123abc"')
    config({ path: './test/.env.local' })

    equal(process.env.PORT, '3000')
    equal(process.env.TOKEN, '123abc')
  })

  it('6.3 it works even without .env file', () => {
    config()
    equal(process.env.TOKEN, undefined)
  })

  it('6.4 dont use dotenv dependency', () => {
    // check that dotenv dependency is not installed
    try {
      const require = createRequire(import.meta.url)
      require('dotenv')
    } catch (error) {
      equal(error.code, 'MODULE_NOT_FOUND')
    }
  });
});

/////////////////////  7  ///////////////////////////////////

import { app, server } from '../solutions/server.js'

describe('7 Items Routes', () => {
  let itemId = null

  after(() => {
    server.close()
  })

  it('7.1 should fetch all tasks', async () => {
    const response = await request(app).get('/items')

    equal(response.statusCode, 200)
    equal(Array.isArray(response.body), true)
    equal(response.body.length, 1)
    equal(response.body[0].content, 'Item 1')
  })

  it('7.2 should add a new item', async () => {
    const response = await request(app)
      .post('/items')
      .send({
        content: 'Test item'
      })

    equal(response.statusCode, 200)
    equal(response.body.content, 'Test item')
    itemId = response.body.id

    const { statusCode, body } = await request(app).get(`/items/${itemId}`)
    equal(statusCode, 200)
    equal(body.content, 'Test item')
    equal(body.id, itemId)
  })

  it('7.3 should delete a task', async () => {
    const { statusCode } = await request(app).delete(`/items/${itemId}`)
    equal(statusCode, 200)
  })

  it('7.4 should have no tasks after deletion', async () => {
    const response = await request(app).get('/items')

    equal(response.statusCode, 200)
    deepStrictEqual(response.body, [{
      id: 1,
      content: 'Item 1'
    }])
  })
})
