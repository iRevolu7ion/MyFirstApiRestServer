//Api rest con node y express 
//node para backend
//INICIALIZAR MI EXPRESS BODY PARSER Y CORS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//CONFIGURAR EXPRESS COMO APP
const app = express();
app.use(cors()); //importante siempre poner cuando se utiliza backEnd
app.use (bodyParser.json());

const puerto= 3001;

//CREAR UN ENDPOINT
app.get('/api/hola',(req,res)=> {

    let miCarro={
        "marca" : "ford",
        "modelo" : "expedition",
        "Motor" : " v8 triton 5,4 lts"
    }
    res.send(miCarro);
});

app.get('/api/nombre',(req,res)=> {

    res.send('Juan Antonio Holguin Rodriguez');
});

app.get('/api/suma/:n1/:n2',(req,res)=>{
    let numero1 = req.params.n1;
    let numero2 = req.params.n2;
    let suma = Number(numero1) + Number(numero2);
    res.send("La suma es: " + suma);
});

app.get('/api/resta/:n1/:n2',(req,res)=>{
    let numero1 = req.params.n1;
    let numero2 = req.params.n2;
    let resta = Number(numero1) - Number(numero2);
    res.send("La resta es: " + resta);
});

app.post('/api/nuevousuario',(req,res)=>{
    	 let bodyRequest = req.body;

         let nombre = bodyRequest.nombre;
         let apellido = bodyRequest.apellido;
         let telefono= bodyRequest.telefono;

         let respuesta = "El nombre es: "+ nombre + " El apellido es: "+ apellido + " Y el telefono es: " + telefono;
         res.send(respuesta);
});

app.post('/api/sumar/',(req,res)=>{
    let bodyRequest = req.body

    let Numero1 = bodyRequest.Numero1;
    let Numero2= bodyRequest.Numero2;
    let suma = Number(Numero1) + Number(Numero2)
    let respuesta= "La suma es: "+ suma;
    res.send(respuesta);
});

app.put('/api/updateuser',(req,res)=> {
    let bodyRequest = req.body;
    res.send("Updated user");
});
app.delete("/api/deleteuser",(req,res)=>{
    res.send("Deleted user");
})
//////////////////////////////////////////////////////////////////////////////////////
//CRUD (CREATE, READ, UPDATE, DELETE)
let items = [];
let id = 1;

app.get('/api/getitems',(req,res)=>{
    res.json(items);
});

app.post('/api/additem',(req,res)=>{
    let bodyRequest= req.body;
    const newItem= {id:id++,
            	description:bodyRequest.description,
                price:bodyRequest.price
            };
    items.push(newItem);
    res.json(newItem);
})

app.put('/api/updateitem/:idrequest',(req,res)=>{
    let idrequest = req.params.id;
    let bodyRequest = req.body
    let item= items.find((item)=>item.id == idrequest);
    
    if(item){
        item.description= bodyRequest.description;
        item.price = bodyRequest.price;
        req.json(item);
    }else{
        res.status(404).send('Item not found')
    }
});
 app.delete('/api/deleteitem/:idrequest',(req,res)=>{
    let idrequest= req.params.idrequest;
    items = items.filter((item)=>item.id !=idrequest);
    res.json({mensaje: 'Deleted item'});
 });



app.listen(puerto,()=>{
    console.log('Servidor escuchando en el puerto: ' + puerto);
});




