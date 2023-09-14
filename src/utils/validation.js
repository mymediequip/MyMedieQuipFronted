import * as yup from "yup";


const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const fnameSchema = yup.string().min(2).max(30).required("Please Enter Your Name")

export const lnameSchema = yup.string().min(2).max(30).required()

export const pnumberSchema = yup.string().matches(/^[0-9]{12}$/, "Please Enter Mobile Number with code").required("Please Enter Mobile Number with code")

export const emailSchema = yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ , "Invalid email address").required("Email address is required"); 

export const nationalitySchema = yup.string().required("Please Enter Your Country Name"); 

export const gstinSchema = yup.string().matches(gstinRegex); 

export const pancardSchema = yup.string().matches(panRegex).required(); 

export const equipmentName = yup.string().required("Equipment Name Required !")

export const pincodeSchema = yup.string().matches(/^[0-9]{6}$/, "PIN code must be exactly 6 digits").required("PinCode is Required")

export const addressSchema = yup.string().required("Please Enter Your Full Address")

export const stateSchema = yup.string().required("Please Enter your State")

export const citySchema = yup.string().required("Please Enter your City")

export const addressTypeSchema = yup.string().required("Please Choose Address Type")


















