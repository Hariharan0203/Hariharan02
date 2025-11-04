import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user Login
const loginUser = async(req,res) =>{
    try {
        // 1. Extract email & password from request body
        const {email,password} = req.body;

        // 2. Check if user exists in DB
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exists"})
        }

        // 3. Compare given password with hashed password in DB
        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            // 4. If match → create JWT token
            const token = createToken(user._id)

            // 5. Send success response with token
            res.json({success:true,token})

        }else{
            // Wrong password
            res.json({success:false,message:"invalid credentials"})
        }
        
    } catch (error) {
        // Catch unexpected errors
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Route for user register

const registerUser = async(req,res)=>{
    
    try {
        
        const {name,email,password} = req.body;

        //checking user already exists or not

        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already exists"})
        }
        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"please enter a strong password"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()
        
        const token = createToken(user._id)
        
        res.json({success:true,token})
          
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
    
}

//Route for admin Login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check both email and password against environment variables
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Create token (you can include email in payload)
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {loginUser,registerUser,adminLogin};