const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8000;
const host = '127.0.0.1';

app.use(express.static('website'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

projectData = {};

app.post('/add',function (req,res){
    projectData=req.body;
    console.log(projectData);
});

app.get('/get',function(req,res){
    res.send(projectData);
})

const server = app.listen(port,listening);

function listening() {
    console.log(`----------------------------------------------\n◈  Server is running ➜  http://${host}:${port}\n----------------------------------------------`);
}