import { describe, it } from 'node:test'
import { equal, } from 'node:assert/strict'

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

