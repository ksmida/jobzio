import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customErrors.js'

// Fetch all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(StatusCodes.OK).json({ jobs })
}

// Create a new job
export const createJob = async (req, res) => {
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

// Fetch a single job by ID
export const getJob = async (req, res) => {
  const { id } = req.params

  const job = await Job.findById(id)
  if (!job) throw new NotFoundError(`no job with id ${id}`)
  res.status(StatusCodes.OK).json({ job })
}

// Update a job by ID
export const updateJob = async (req, res) => {
  const { id } = req.params
  const updatedJob = await Job.findOneAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedJob) throw new NotFoundError(`no job with id ${id}`)
  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob })
}

// Delete a job by ID
export const deleteJob = async (req, res) => {
  const { id } = req.params
  const removeJob = await Job.findByIdAndDelete(id)

  if (!removeJob) throw new NotFoundError(`no job with id ${id}`)
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removeJob })
}
