import type { Request, Response, NextFunction } from "express";
import type Joi from "joi";

export const validateRequest = (
  schema: Joi.ObjectSchema,
  property: "body" | "params"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    req[property] = value;
    next();
  };
};