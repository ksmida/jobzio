import Job from '../models/JobModel.js'

// Fetch all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.json({ message: 'Data received', data: jobs })
}

// Create a new job
export const createJob = async (req, res) => {
  const job = await Job.create(req.body)
  res.status(201).json({ job })
}

// Fetch a single job by ID
export const getJob = async (req, res) => {
  const { id } = req.params

  const job = await Job.findById(id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(200).json({ job })
}

// Update a job by ID
export const updateJob = async (req, res) => {
  const { id } = req.params
  const updatedJob = await Job.findOneAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  res.status(200).json({ msg: 'job modified', job: updatedJob })
}

// Delete a job by ID
export const deleteJob = async (req, res) => {
  const { id } = req.params
  const removeJob = await Job.findByIdAndDelete(id)

  if (!removeJob) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }

  res.status(200).json({ msg: 'job deleted', job: removeJob })
}
