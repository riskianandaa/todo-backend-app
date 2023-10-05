import mongoose from "mongoose"

const connectToDatabase = async () => {
  try {
    const connection = mongoose.connect("mongodb+srv://notesapp:S4Wndzkw5kLkIJKk@cluster0.h6q8xp9.mongodb.net/todoapp-backend?retryWrites=true&w=majority")
    if (connection) {
      console.log("connection established")
    }
  } catch (error) {
    console.log('error in connection database', error)
    throw error
  }
}

export default connectToDatabase