import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        return res.status(400).json({ errors: errorMessages })
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateTest = withValidationErrors(
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 characters long')
    .trim()
)

// for every controller, we invoke withValidationErrors and pass in an array of validation rules (body('name'), notEmpty(), etc)
// and what we return is 2 middleware, validateValues and our error logging + response (throw new BadReqErr), that Express will execute

// const withValidationErrors = (validateValues) => {
//   //grouping multiple middleware in an array
//   return [
//     validateValues,
//     //our error response
//     (req, res, next) => {
//       console.log('running validation')
//       const errors = validationResult(req)
//       if (!errors.isEmpty()) {
//         console.log('validation errors found:')
//         const errorMessages = errors.array().map((error) => error.msg)
//         throw new BadRequestError(errorMessages)
//       }
//       next()
//     },
//   ]
// }

// export const validateTest = withValidationErrors([
//   // function that receives values we want to validate. This gets changed for every controller.
//   body('name')
//     .notEmpty()
//     .withMessage('name is required')
//     .isLength({ min: 3, max: 50 })
//     .withMessage('name must be between 3 and 50 characters long').trim,
// ])
