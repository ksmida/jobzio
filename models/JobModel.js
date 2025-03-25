import mongoose from 'mongoose'

// Job Schema representing job postings
const JobSchema = new mongoose.Schema(
  {
    company: String, // Name of the company
    position: String, //Job position title
    jobStatus: {
      type: String,
      enum: ['interview', 'declined', 'pending'], // Allowed status values
      default: 'pending', // Default job status
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship'], // Allowed job types
      default: 'full-time', // Default job type
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
  },
  { timestamps: true } // Automatically add createdAt and updateAt fields
)

export default mongoose.model('Job', JobSchema)
