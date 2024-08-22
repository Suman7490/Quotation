import User from "../model/userModel.js";
import moment from "moment";

export const create = async (req, res) => {
    try {

        if (req.body.currentDate) {
            req.body.currentDate = moment(req.body.currentDate, "DD/MM/YYYY").toDate();
        }

        const userData = new User(req.body);

        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }

        const savedData = await userData.save();
        res.status(200).json(savedData)

    } catch (error) {
        res.status(500).json({ error: error });
    }
}


