import express, { json }  from "express";

const app= express();
const PORT= 8080;

const productos=[];
let id=0;

class Producto{
    constructor(title,price,thumbnail,id){
        this.title=title;
        this.price=price;
        this.thumbnail=thumbnail;
        this.id=id;
    }

    getObject(){
        return {
            title:this.title,
            price:this.price,
            thumbnail:this.thumbnail,
            id:this.id
        }
    }
}

const getID=()=>{
    id++;
    return id;
}

const addProduct=(P)=>{
    productos.push(P);
}



const server = app.listen (PORT, ()=>{
    console.log("Servidor HTTP corriendo en", server.address().port);
});
server.on('error', error=>console.log('Error en servidor',error));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.send("<h1>Inicio Del Programa</h1>");
});

app.get('/api/productos/listar',(req,res)=>{
    if(productos.length > 0){
        res.json(productos);
    }else{
        res.json({error: 'no hay productos cargados'})
    }
});

app.get('/api/productos/listar/:id',(req,res)=>{
    let params = req.params;
    let resultado={error: 'producto no encontrado'};
    for (let index = 0; index < productos.length; index++) {
        if(productos[index].id==params.id){
            resultado=productos[index];
        }
    }

    res.json(resultado)
});

app.post('/api/productos/guardar',(req,res)=>{
    let body = req.body;
    const datos=Object.values(body);

    let product=new Producto(datos[0],datos[1],datos[2],getID());
    addProduct(product.getObject());
    res.json(product.getObject())
});