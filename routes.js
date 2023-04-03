const items = require('./fakeDb')
const express = require('express')
const router = express.Router()



router.get("/", function(req,res, next){
    try{
        console.log('here')
        return res.json(items)
    }
    catch(err){
        next(err)
    }
})

router.post("/", function(req,res, next){
    try{
        const newItem = {'name': req.body.name, 'price': req.body.price}
        items.push(newItem)
        return res.json({ 'added': newItem})
    }
   catch(err){
    return next(err)
   }
})

router.get('/:name', function(req, res, next){
    try{
        const selectedItem = items.find(item => item.name == req.params.name)
        return res.json(selectedItem)
    }
    catch(err){
       return next(err)
    }
})

router.patch('/:name', function(req, res, next){
    try{
        const selectedItem = items.find(item => item.name == req.params.name)
        selectedItem.name = req.body.name
        selectedItem.price = req.body.price
        return res.json({"updated": {"name": selectedItem.name, "price": selectedItem.price }})
    }
  catch(err){
    return next(err)
  }
})

router.delete('/:name', function(req, res, next){
    try{
        const selectedItemIdx = items.findIndex(item => item.name == req.params.name)
        console.log(selectedItemIdx)
        items.splice(selectedItemIdx, 1)
        return res.json({'message': 'Deleted'})
    }
    catch(err){
        return next(err)
    }
});

module.exports = router