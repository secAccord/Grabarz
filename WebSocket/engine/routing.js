import cors from "cors";
import express from "express";


import path from "path";
import __dirname from "../dirnameFix.js"
const app = express();
app.use(cors())

app.get('/',(req, res) => res.send("TESTED"))
//app.use('/',express.static(path.join(__dirname,'/public/')))
export default app;