const express= require('express');
const router=express.Router();

const Journey=require('../models/journey')


router.get('/',async(req,res)=>{
    try{
        
    const result=await Journey.find(req.query).exec();
    // res.send(result);
    res.render('journey',{result});
    }
    catch(err)
    {
        res.send(err);
    }
})
router.post('/',async(req,res)=>{
    try{
    const newjourney= new Journey (req.body);
    await newjourney.save();
    //res.send({msg:"data entered successfully..."})
    res.redirect('/journey')
    }
    catch(err)
    {
        res.send(err);
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        await Journey.findByIdAndDelete(req.params.id);
        res.send({msg:"deleted successfully...."})
        
    } catch (err) {
        res.send(err);
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const result=await Journey.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators: true});
        res.status(201).send(result);
    } catch (error) {
        res.send(error);
    }
})


module.exports=router;