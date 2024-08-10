// import createTokenAndSaveCookies from "../jwt/generateToken.js";
import User from "../models/user.model.js";
import passwordValidator from "password-validator";
import bcryptjs from "bcryptjs";

const signup =async (req, res) =>{
    const {fullname, username, password} = req.body;
    
    try {
        var schema = new passwordValidator();
        schema
        .is().min(7)
        .has().uppercase(1)
        .has().lowercase(1)
        .has().digits(1)
        // .is("[$&+,:;=?@#|'<>.-^*()%!]")
        const pass = schema.validate(password);
        if(!pass){
            return res.status(400).json({error: "Password is Invalid!"});
        }
        const user =await User.findOne({username});
        if(user){
            return res.status(400).json({error: "username already exit!"});
        }
        const newUser =await new User({
            fullname,
            username,
            password
        });
        await newUser.save();
        if(newUser){
            // createTokenAndSaveCookies(newUser._id, res);
            return res.status(201).json({message: "User created Successfully!",
                user:{
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    username: newUser.username,
                    password: newUser.password
                },
             });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error in Signup Page!"});
    }
};

export default signup;


export const login = async(req, res) =>{
    const {username, password} =req.body;
    try {
        const user =await User.findOne({username});
        const isMatch =await bcryptjs.compare(password, user.password);
        if(!user || !isMatch){
            return res.status(400).json({error: "Invalid User Credential" });
        }
        // createTokenAndSaveCookies(user._id, res);
        res.status(200).json({message: "User Login Successfully!",user:{
            // _id: user._id,
            username: user.username
        }})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error in Login Page!"});
    }
}




