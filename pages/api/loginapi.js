import connect from "../../lib/mongodb";
import User from '../../model/schema'
var CryptoJs = require("crypto-js");

connect()

export default async function handler(req,res){
    const {email,password}=req.body
    let user = await User.findOne({ "email": email})
    const bytes = CryptoJs.AES.decrypt(user.password, 'subhadip');
    let decryptPass = bytes.toString(CryptoJs.enc.Utf8);
    if(user){
        if(email == user.email && decryptPass == password){
            res.redirect('/')
        }
        else{
            res.json({status:'Invalid User Credentials'})
        }
    }
    else{
        return res.json({status:'Not able to find the user'})
    }
}