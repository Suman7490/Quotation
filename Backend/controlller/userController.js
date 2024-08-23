import User from "../model/userModel.js";
import moment from "moment";
import mongoose from "mongoose";

// **********************************************


const sequenceSchema = new mongoose.Schema({
    _id: String,
    sequence_value: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);


const getNextSequenceValue = async (sequenceName) => {
    const sequenceDocument = await Sequence.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.sequence_value;
};

// ************ Create Quotation ***************
export const create = async (req, res) => {
    try {

        if (req.body.currentDate) {
            req.body.currentDate = moment(req.body.currentDate, "DD/MM/YYYY").toDate();
        }

        const userId = await getNextSequenceValue('userId');

        const userData = new User({ ...req.body, userId });

        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }

        const savedData = await userData.save();
        res.status(200).json(savedData)

    } catch (error) {
        res.status(500).json({ error: error });
    }
}


// ************** Get all Quotations ***************
 export const getAll = async(req, res)=>{
    try{

        const userData = await User.find();
        if(!userData){
            return  res.status(404).json({msg: "User data not found"});
        }
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({error: error})
    }
 }

//  *************** Get One Quotation ***********
export const getOne = async(req, res) => {
    try{

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}


// ************ Update Quotation ************
export const update = async(req, res) => {
    try{

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg: "User not found"});
        }
        const updateData = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(updateData)

    } catch (error) {
        res.status(500).json({error: error});
    }
}


// **************** Delete Quotation *****************
export const deleteUser = async(req, res) => {
    try{

     const id = req.params.id;
     const userExist = await User.findById(id);
     if(!userExist){
        return res.status(404).json({msg: "User not exist"});
     }
     await User.findByIdAndDelete(id);
     res.status(200).json({msg: "User deleted successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

