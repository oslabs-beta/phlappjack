const express = require('express')
const path = require('path')
const app = express()
const cors = require("cors");
const bodyParser = require('body-parser')
const AppConfigurator  = require('./AppConfiguration/appConfigurator.js')
const port = 3000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(path.dirname(__dirname), './client/')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client", "index.html"));
})

app.post("/ConfigureApplication", (req, res, next) => {
  props = req.body;
  const { newApplication, atlasHostCluster, atlasUserName, atlasPassword, atlasDB, dbInputDisplay, dockerFile, dockerCompose } = props;
  const dir = './Created Applications/';
  AppConfigurator(dir,newApplication, atlasHostCluster, atlasUserName, atlasPassword, atlasDB, dbInputDisplay, dockerFile, dockerCompose );
  next();
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})