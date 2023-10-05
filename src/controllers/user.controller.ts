import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import User from "../models/user-model";
import { Types } from "mongoose";
import { IUser } from "../types";

const getUserToken = (_id: string | Types.ObjectId ) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", { expiresIn: "7d" })
  return authenticatedUserToken
}

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body

    const existingUser = await User.find({ email })
    if (existingUser) {
      return response.status(409).send("user already exist")
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    })

    return response.status(201).send({ message: "User created successfully" })
  } catch (error) {
    console.log("error in createdUser", error)
    throw error
  }
}

export const loginUser = async ( request: Request, response: Response ) => {
  try {
    const { email, password } : IUser = request.body
    
    const existingUser = await User.findOne({  email })
    if(!existingUser){
      return response.status(409).send({ message: "User doesn't exist" })
    }
    const isPasswordIdentical = await bcrypt.compare(password, existingUser.password)
    if(isPasswordIdentical){
      const token = getUserToken((await existingUser )._id)
      return response.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name
        }
      })
    } else {
      return response.status(200).send({ message: "Wrong credentials" })
    }
  } catch (error) {
    
  }
}
