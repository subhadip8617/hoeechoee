import connect from "../../lib/mongodb";
import User from "../../model/schema";
var CryptoJs = require("crypto-js");

connect()

export default async function handler(req,res){
    try {
        // const user = await User.create(req.body);
        const {name, email} = req.body;
        const password = CryptoJs.AES.encrypt(req.body.password, 'subhadip').toString();
        const user = await User.create({name, email, password});
        // const user = await User.create(req.body);
        res.redirect('/')
        if(!user){
            return res.json({"code":'User not created'})
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create a new user.'})
    }
}