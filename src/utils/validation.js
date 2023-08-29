import * as yup from "yup";


const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const fnameSchema = yup.string().min(2).max(30).required()

export const lnameSchema = yup.string().min(2).max(30).required()

export const pnumberSchema = yup.string().matches(/^[0-9]{10}$/).required()

export const emailSchema = yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).required(); 

export const nationalitySchema = yup.string().required(); 

export const gstinSchema = yup.string().matches(gstinRegex); 

export const pancardSchema = yup.string().matches(panRegex).required(); 

export const equipmentName = yup.string().required("Equipment Name Required !")



