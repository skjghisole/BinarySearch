const express = require('express')

const app = express()
const port = process.env.PORT || 4040

app.use(express.static('public'))
app.listen(port, () => console.log(`Server started at http://localhost:${port}`))