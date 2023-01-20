import express from "express";
import { engine, create } from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

//Routes
import AuthRouter from "./routes/auth.js";
import ProductsRouter from "./routes/products.js";

dotenv.config();

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs" });

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(AuthRouter);
app.use(ProductsRouter);

const startApp = () => {
	try {
		mongoose.set('strictQuery', false)
		mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, () => console.log('Mongo DB connected'))

		const PORT = process.env.PORT || 4100
		app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))
	} catch (error) {
		console.log(error)
	}
}

startApp()     