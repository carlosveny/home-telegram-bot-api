const express = require('express')

const APP = express()
const PORT = 3000
APP.use(express.json())

APP.listen(PORT, () => {
  console.log(`fuel-price-api listening on port ${PORT}`)
})
