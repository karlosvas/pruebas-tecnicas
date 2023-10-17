import { obtenerDatosPromise } from '../solutions/index.js'
import { describe, it, beforeEach, afterEach } from 'node:test'
import { equal, ifError } from 'node:assert/strict'
import { unlinkSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

describe('2. obtenerDatosPromise', () => {
    it('2.1. obtenerDatosPromise', async () => {
        const { data } = await obtenerDatosPromise({ time: 1 })
        equal(data, 'datos importantes')
    })
})