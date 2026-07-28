import { body, validationResult } from "express-validator";

export const movieRules = [
    body("title")
        .notEmpty()
        .isString()
        .trim()
        .withMessage("Title is required"),

    body("genre")
        .notEmpty()
        .isString()
        .trim()
        .withMessage("Genre is required"),

    body("year")
        .isInt({ min: 1888 })
        .withMessage("Year must be a valid release year"),

    body("director")
        .notEmpty()
        .isString()
        .trim()
        .withMessage("Director is required"),

    body("avgRating")
        .optional()
        .isFloat({ min: 0, max: 10 })
        .withMessage("Average rating must be between 0 and 10"),

    body("rating")
        .optional()
        .isFloat({ min: 0, max: 10 })
        .withMessage("Average rating must be between 0 and 10"),

    body("synopsis")
        .notEmpty()
        .isString()
        .trim()
        .withMessage("Synopsis is required"),

    body("reviews")
        .optional()
        .isArray()
        .withMessage("Reviews must be an array"),
];

export const validateMovie = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    next();
};