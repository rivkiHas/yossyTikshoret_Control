// lib/validationSchemas.js
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Schema for Step 1: Business Details
export const stepOneSchema = Yup.object().shape({
    name: Yup.string().required('שם העסק הוא שדה חובה'),
    email: Yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
    id: Yup.string().required('ח.פ / ע.מ הוא שדה חובה'),
    phone: Yup.string().matches(phoneRegExp, 'מספר טלפון לא תקין').required('טלפון הוא שדה חובה'),
    typeMarketer: Yup.string().required('סוג העסק הוא שדה חובה'),
    logo: Yup.mixed().optional(),
});

// Schema for a single Branch (used in Step 2)
export const branchSchema = Yup.object().shape({
    name: Yup.string().required('שם הסניף הוא שדה חובה'),
    address: Yup.string().required('כתובת היא שדה חובה'),
    location: Yup.object().shape({
        lat: Yup.number().required(),
        lng: Yup.number().required(),
    }).required(),
    hoursOpen: Yup.array().of(
        Yup.object().shape({
            morning: Yup.object().shape({ open: Yup.string(), close: Yup.string() }),
            evening: Yup.object().shape({ open: Yup.string(), close: Yup.string() }),
        })
    ),
    weekday: Yup.object().shape({
        morning: Yup.object().shape({ open: Yup.string(), close: Yup.string() }),
        evening: Yup.object().shape({ open: Yup.string(), close: Yup.string() }),
    }),
});

// Schema for Step 2: All Brunches
export const stepTwoSchema = Yup.array().of(branchSchema).min(1, 'חייב להיות לפחות סניף אחד');


// Schema for a single Contact Person (used in Step 3)
export const contactManSchema = Yup.object().shape({
    name: Yup.string().required('שם איש קשר הוא שדה חובה'),
    phone: Yup.string().matches(phoneRegExp, 'מספר טלפון לא תקין').required('טלפון הוא שדה חובה'),
    email: Yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
    role: Yup.string().required('תפקיד הוא שדה חובה'),
});

// Schema for Step 3: All Contact Men
export const stepThreeSchema = Yup.array().of(contactManSchema).min(1, 'חייב להיות לפחות איש קשר אחד');