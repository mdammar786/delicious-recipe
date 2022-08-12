const express = require ('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')


app.use(express.static(path.join(__dirname, 'build')))
app.get('/api', (req,res) => {
    res.json({
        message: 'This is the api endpoint'
    })
})

app.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(port, _ => {
    console.log(`Server is running on port ${port}`)
})