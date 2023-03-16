import bcrypt from "bcryptjs";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import axios from "axios";

import UserModal from "../models/user.js";


const secret = 'test';

export const signin = async (req, res) => {

if(req.body.googleAccessToken)
{
   const {googleAccessToken} =req.body;


   axios
   .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`,{
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
      Accept: 'application/json'
  }
   }).then( async response=> {
    const password =response.data.password;
    const email = response.data.email;
   
    const existingUser = await UserModal.findOne({email})

    if (!existingUser) 
    return res.status(404).json({message: "User don't exist!"})

    const token = jwt.sign({
        email: existingUser.email,
        id: existingUser._id
    },secret, {expiresIn: "1h"})

    res.status(200).json({result: existingUser, token})
    
   }).catch(err => {
    res.status(500).json(err)
   });

}
else{
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

  
};


export const signup = async (req, res) => {

 
  if (req.body.googleAccessToken) {
    const {googleAccessToken} = req.body;
    axios
    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`,{
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
        Accept: 'application/json'
    }
     }).then(async response => {
      
      const firstName = response.data.given_name;
      const lastName = response.data.family_name;
      const email = response.data.email;
      const picture = response.data.picture;

            const existingUser = await UserModal.findOne({email})

            if (existingUser) 
                return res.status(400).json({message: "User already exist!"})

            const result = await UserModal.create({verified:"true",email, firstName:firstName,lastName:lastName, profilePicture: picture, followers:[], 
            following:[]})

            const token = jwt.sign({
                email: result.email,
                id: result._id
            },secret, {expiresIn: "1h"})

            res
                .status(200)
                .json({result, token})
        })
        .catch(err => {
          res.status(400).json({message: "Invalid access token!"})
              
        })

}else{
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword,firstName:firstName,lastName:lastName});

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
  
  }
}
  
};


export const fetchusers=async(req,res)=>{
 
    try {
    const users =await UserModal.find();
    res.status(200).json({data:users});
    } catch (error) {    
        res.status(404).json({ message: "this is not work" });

     
    }
}

export const followUser = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

  const user = await UserModal.findById(id); 
 
  const logedUser =await UserModal.findById(req.userId);

  const index = user.followers.findIndex((id) => id ===String(req.userId));

  if (index === -1) {

    user.followers.push(req.userId)
    logedUser.following.push(id)

  } else {
    user.followers = user.followers.filter((id) => id !== String(req.userId));
    logedUser.following = logedUser.following.filter((id) => id !== String(id));
  }

  const updatedUser = await UserModal.findByIdAndUpdate(id, user, { new: true });
  const updatedLogedUser = await UserModal.findByIdAndUpdate(req.userId, logedUser, { new: true });

  res.status(200).json(updatedUser);
}

