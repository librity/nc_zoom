import express from 'express'
import path from 'path'

const ExpressApp = express()

const saticPath = path.join(__dirname, 'public')
ExpressApp.use('/public', express.static(saticPath))

ExpressApp.set('view engine', 'pug')
const viewsPath = path.join(__dirname, 'views')
ExpressApp.set('views', viewsPath)

ExpressApp.get('/', (req, res) => res.render('home'))

export default ExpressApp
