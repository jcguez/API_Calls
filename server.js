const express = require("express")
const app = express()
const port = process.env.PORT || 5000
// Configuration file

// Init middleware
app.use(express.json({ extended: false }))
// Define routes
app.use('/api/v1/calls', require('./routes/api/v1/calls'))

app.listen(port, () => console.log(`Server runing on port: ${port}`))