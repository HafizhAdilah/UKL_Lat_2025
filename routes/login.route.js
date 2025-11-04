import express from 'express'
const app = express()

import { login } from '../controllers/auth.controller.js'

app.post('/login', login)

export default app;