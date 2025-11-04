import express from 'express'
const app = express()
const port = 3000

import userRoutes from './routes/user.route.js'
import loginRoutes from './routes/login.route.js'

app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/auth', loginRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))