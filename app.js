const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

app.use(cors());
dotenv.config();
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send("YEah Works");
})

app.post('/description',async(req,res)=>{
    const body = req.body.Url;
    let response = {}
    await fetch('https://eastus.api.cognitive.microsoft.com/vision/v3.2/analyze?visualFeatures=Description&language=en&model-version=latest',{method:"POST",headers:{"Content-Type":"application/json","Ocp-Apim-Subscription-Key": process.env.AZURE_KEY},body:JSON.stringify({
            "url":body,
    })}).then(des=>{des.json().then(data=>{
        response = {
            "tags":data.description.tags,
            "captions":data.description.captions[0].text,
        }
        
        res.status(200).send(response.captions);
    })})
});


app.listen(process.env.PORT,()=>{
    console.log('Backend Started')
});

module.exports = app;