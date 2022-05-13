const express = require('express')
const router = express.Router();

let products =  require('../data/products.json')

router.get('/',(req,res)=>{
    res.send(products)
})
router.get('/:id',(req,res)=>{
    const result = products.filter((product)=>{
        return parseInt(product.id) === parseInt(req.params.id)
    })
    if(result.length === 0) res.status(404).send('No product with this ip');
    else res.send(result)
})

router.post('/',(req,res)=>{
    let bigger = 0;
    products.forEach((product)=>{
        if(parseInt(product.id) > parseInt(bigger)){
            bigger=product.id;
        };
    });
    const id = bigger+1
    const product = {
        "name": req.body.name,
        "id":id
    }    
    products.push(product);
    res.send(product)
})

router.put('/:id',(req,res)=>{
    const result = [];
    products.forEach((product)=>{
        if(parseInt(product.id) === parseInt(req.params.id)){
            product.name = req.body.name;
            result.push(product);
        };
    });
    
    if(result.length === 0) res.status(204).send('No product with this ip');
    else res.send(result);
})
router.delete('/:id',(req,res)=>{
    const result = [];
    products = products.filter((product)=>{
        if(parseInt(product.id) === parseInt(req.params.id)){  
            result.push(product);  
            return false;
        };
        return true;
    });
    
    if(result.length === 0) res.status(204).send('No product with this ip');
    else res.send(result);
})
module.exports = router;