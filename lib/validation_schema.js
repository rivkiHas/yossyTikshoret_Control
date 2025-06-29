import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const stepOneSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'שם העסק חייב להכיל לפחות 2 תווים')
        .required('שם העסק הוא שדה חובה'),
    email: Yup.string()
        .email('כתובת אימייל לא תקינה')
        .required('אימייל הוא שדה חובה'),
    id: Yup.string()
        .min(7, 'מספר זיהוי חייב להכיל לפחות 7 תווים')
        .required('ח.פ / ע.מ הוא שדה חובה'),
    phone: Yup.string()
        .matches(phoneRegExp, 'מספר טלפון לא תקין')
        .required('טלפון הוא שדה חובה'),
    typeMarketer: Yup.string()
        .required('סוג העסק הוא שדה חובה'),
    typeSales: Yup.array()
        .min(1, 'יש לבחור לפחות אפשרות אחת')
        .required('סוג המכירות הוא שדה חובה'),
    logo: Yup.mixed().optional(),
});

export const branchSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'שם הסניף הוא שדה חובה')
        .required('שם הסניף הוא שדה חובה'),
    address: Yup.string()
        .min(5, 'כתובת חייבת להכיל לפחות 5 תווים')
        .required('כתובת היא שדה חובה'),
    location: Yup.object().shape({
        lat: Yup.number().required('קו רוחב נדרש'),
        lng: Yup.number().required('קו אורך נדרש'),
    }).required('מיקום נדרש'),
    hoursOpen: Yup.array().of(
        Yup.object().shape({
            morning: Yup.object().shape({ 
                open: Yup.string(), 
                close: Yup.string() 
            }),
            evening: Yup.object().shape({ 
                open: Yup.string(), 
                close: Yup.string() 
            }),
        })
    ).test('at-least-one-day', 'יש להגדיר שעות פתיחה לפחות ליום אחד', function(value) {
        if (!value || value.length === 0) return false;
        
        return value.some(day => {
            if (!day) return false;
            const morningValid = day.morning?.open && day.morning?.close;
            const eveningValid = day.evening?.open && day.evening?.close;
            return morningValid || eveningValid;
        });
    }),
    weekday: Yup.object().shape({
        morning: Yup.object().shape({ 
            open: Yup.string(), 
            close: Yup.string() 
        }),
        evening: Yup.object().shape({ 
            open: Yup.string(), 
            close: Yup.string() 
        }),
    }),
});

export const stepTwoSchema = Yup.array()
    .of(branchSchema)
    .min(1, 'חייב להיות לפחות סניף אחד');

export const contactManSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'שם איש קשר חייב להכיל לפחות 2 תווים')
        .required('שם איש קשר הוא שדה חובה'),
    phone: Yup.string()
        .matches(phoneRegExp, 'מספר טלפון לא תקין')
        .required('טלפון הוא שדה חובה'),
    email: Yup.string()
        .email('כתובת אימייל לא תקינה')
        .required('אימייל הוא שדה חובה'),
    role: Yup.string()
        .required('תפקיד הוא שדה חובה'),
    brunchId: Yup.string().when('$hasMultipleBranches', {
        is: true,
        then: (schema) => schema.required('יש לבחור סניף'),
        otherwise: (schema) => schema.optional()
    })
});

export const stepThreeSchema = Yup.array()
    .of(contactManSchema)
    .min(1, 'חייב להיות לפחות איש קשר אחד');