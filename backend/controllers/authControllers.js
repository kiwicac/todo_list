const mongoose = require("mongoose");
const todoModel = require("../models/todoModel");
const showAll = (req, res) => {
  todoModel
    .find({})
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
const postNewTodo = async (req, res) => {
  try {
    const { checked, task } = req.body;
    if (!task) {
      return res.status(400).json({ error: "required valid input" });
    }
    const exists = await todoModel.findOne({ task });
    if (exists) {
      return res.status(409).json({ error: "task already exists" });
    }
    const newTodo = await todoModel.create({
      checked,
      task,
    });
    return res.json(newTodo);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateTodo = async (req, res) => {
  try{

    const { checked, _id } = req.body;
    
    const updatedTodo = await todoModel.findByIdAndUpdate(_id, { checked: checked }, { new: true });
    return res.status(200).json(updatedTodo)
  }catch(err){
    return res.status(500).json({error:err.message})
  }

}

const deleteTodo = async (req,res) =>{
  try{
    const id = req.params.id
    
    const deletedT = await todoModel.findByIdAndDelete({_id:id});
    if(!deletedT){
      return res.status(404).json({message:"todo was not found"})
    }

    return res.status(200).json({message:"task was deleted successfully"})
  }catch(err){
    return res.status(500).json({error:err.message})
  }
}

const getTodo = async (req,res)=>{
  const id = req.params.id
  try{
     
    todoModel.findById({_id:id})
    .then((data)=>{
      return res.status(200).json(data)
    })
  }catch(err){
    return res.status(500).json({error:err.message})
  }
}

module.exports = {
  showAll,
  postNewTodo,
  updateTodo,
  deleteTodo,
  getTodo
};
