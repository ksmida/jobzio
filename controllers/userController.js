import { StatusCodes } from 'http-status-codes'
import User from '../models/UserModel.js'
import Job from '../models/JobModel.js'

// Retrieves information about the logged in user
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  res.status(StatusCodes.OK).json({ user })
}

// Retrieves job application statistics for the logged in user
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  res.status(StatusCodes.OK).json({ users, jobs })
}

// Changes user's account information
export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body)
  res.status(StatusCodes.OK).json({ msg: 'update user' })
}
