import { describe, it, beforeEach, afterEach } from 'node:test'
import { equal, ifError } from 'node:assert/strict'
import { unlinkSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

import { delay } from "../solutions/index.js"

describe('5. delay', () => {
    it('4.1. delay', async () => {
        const mensaje = await delay()
        equal(mensaje, 'hola mundo')
    })
})