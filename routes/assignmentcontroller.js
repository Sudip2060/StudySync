const express = require('express')
const router = express.Router()
const Assignment = require('../models/assignmentschema')

//create new assignment
router.post('/assignments/new',async (req,res)=>{
    try{
        const {assignmentname, startdate, enddate, instructions} = req.body;
        const addassignment = await Assignment.create({assignmentname,startdate, enddate, instructions})
        if(addassignment){
            res.status(250).json({addassignment})
        }
        else{
            res.status(404).json({message:"couldn't add the assignment"})
        }
    }
    catch(err){
        res.status(500).json({message:"en error occured"})
        console.error(err)
    }
})

//get assignments
router.get('/assignments/data',async(req,res)=>{
    try{
        const assignmentdata = await Assignment.find()
        if(assignmentdata){
            res.status(200).json(assignmentdata)
        }
        else{
            res.status(404).json({message:"no data found"})
        }
    }
    catch(err){
        res.status(500).json({message:"an error occured"})
        console.error(err)
    }

})
//delete new assignment by id
router.delete('/assignments/delete/:id', async(req,res)=>{
    try{
        const assignmentid = req.params.id
        const assignmentdata = await Assignment.findByIdAndDelete(assignmentid)
        if(assignmentdata){
            res.status(200).json({message:'assignment deleted'})
        }
        else{
            res.status(404).json({message:'an error occured while deleting the assignment'})
        }
    }
    catch(err){
        res.status(500).json({message:"an error occured"})
        console.error(err)
    }
})

//update new assignment by id
router.put('/assignments/update/:id', async(req,res)=>{
    try{
        const assignmentid = req.params.id
        const assignmentdata = await Assignment.findByIdAndUpdate(assignmentid)
        if(assignmentdata){
            res.status(200).json({message:'assignment updated'})
        }
        else{
            res.status(404).json({message:"an error occured"})
        }
    }
    catch(err){
        res.status(500).json({message:"an error occured"})
        console.error(err)
    }
})

//get assignment data by name
router.get('/assignments/name', async (req, res) => {
    try {
        const assignmentname = req.query.name; 
        const assignment = await Assignment.findOne({ assignmentname });
        if (assignment) {
            res.status(200).json({ assignment });
        } else {
            res.status(404).json({ message: "No data found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
        console.error(err);
    }
});

//delete assignment by name
router.delete('/assignments/delete',async(req,res)=>{
    try{
        const assignmentname = req.query.name;
        const deletedassignment = await Assignment.findOneAndDelete({assignmentname})
        if(deletedassignment){
            res.status(200).json({message:"assignment deleted successfully"})
        }
        else{
            res.status(404).json({message:"cannot delete the assignment"})
        }
    }
    catch(err){
        res.status(500).json({message:"an error occured"})
        console.error(err)
    }
})


router.put('/assignments/update',async(req,res)=>{
    try{
        const assignmentname = req.query.name;

        const updatedassignment = await Assignment.findOneAndUpdate({assignmentname},{$set:req.body},{new:true})
        if(updatedassignment){
            res.status(200).json(updatedassignment)
        }
        else{
            res.status(404).json({message:"assignment not found"})
        }
    }
    catch(err){
        res.status(500).json({message:"an error occured"})
        console.error(err)
    }
})


/* For Developers Purpose Only*/

//delete all assignments 
router.delete('/assignments/alldata', async (req,res)=>{
    try{
        const assignmentdata = await Assignment.deleteMany()
        if(assignmentdata){
            res.status(200).json({message:"all assignments deleted"})
        }
        
    }
    catch(err){

    }
})

module.exports = router