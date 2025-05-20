import mongoose from 'mongoose';
const { Schema } = mongoose;

export const userSchema = new Schema({
    name: String,
    age: Number,
    isMarried: Boolean
});