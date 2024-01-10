import { NextFunction } from "express";
import { NotAcceptable } from "http-errors";
import { isValidObjectId } from "mongoose";

export const validateObjectId = (id: string, next: NextFunction) => {
  if (!isValidObjectId(id)) {
    next(NotAcceptable("Invalid Object Id"));
  }
  return;
};
