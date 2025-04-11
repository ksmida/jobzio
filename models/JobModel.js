import mongoose from 'mongoose'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'

// Job Schema representing job postings
const JobSchema = new mongoose.Schema(
  {
    company: String, // Name of the company
    position: String, //Job position title
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS), // Allowed job status values
      default: JOB_STATUS.PENDING, // Default job status
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE), // Allowed job types
      default: JOB_TYPE.FULL_TIME, // Default job type
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true } // Automatically add createdAt and updateAt fields
)

export default mongoose.model('Job', JobSchema)
