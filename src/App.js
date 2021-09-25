import express from 'express'
import path from 'path'

const App = express()

const saticPath = path.join(__dirname, 'public')
App.use('/public', express.static(saticPath))

App.set('view engine', 'pug')
const viewsPath = path.join(__dirname, 'views')
App.set('views', viewsPath)

App.get('/', (req, res) => res.render('home'))

export default App
