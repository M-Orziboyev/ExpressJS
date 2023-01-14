import express from "express"
import {engine, create} from 'express-handlebars'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

//Routes
import AuthRouter from './routes/auth.js'
import ProductsRouter from './routes/products.js'

dotenv.config()

const app = express();

const hbs = create({defaultLayout: 'main', extname: 'hbs',})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
mongoose.set('strictQuery', false)

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(express.json());

app.use(AuthRouter)
app.use(ProductsRouter)

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
    () => console.log("Mongo DB connection established")
)


const PORT = process.env.PORT || 4100
app.listen(4100, (err, res) => {console.log(`Server is running ${PORT}`);})