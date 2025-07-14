import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const stepOneSchema = Yup.object().shape({
    name: Yup.string().required('שם העסק הוא שדה חובה'),
    email: Yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
    id: Yup.string().required('ח.פ / ע.מ הוא שדה חובה'),
    phone: Yup.string().matches(phoneRegExp, 'מספר טלפון לא תקין').required('טלפון הוא שדה חובה'),
    typeMarketer: Yup.string().required('סוג העסק הוא שדה חובה'),
    //logo: Yup.mixed().optional(),
});

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

export const stepTwoSchema = Yup.object().shape({
  brunches: Yup.array()
    .of(branchSchema)
    .min(1, 'חייב להיות לפחות סניף אחד')
});


export const contactManSchema = Yup.object().shape({
    contactName: Yup.string().required('שם איש קשר הוא שדה חובה'),
    contactPhone: Yup.string().matches(phoneRegExp, 'מספר טלפון לא תקין').required('טלפון הוא שדה חובה'),
    contactEmail: Yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
    contactRole: Yup.string().required('תפקיד הוא שדה חובה'),
});

export const stepThreeSchema = Yup.array().of(contactManSchema).min(1, 'חייב להיות לפחות איש קשר אחד');


export const fullFormSchema = Yup.object().shape({
  name: Yup.string().required('שם העסק הוא שדה חובה'),
  email: Yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
  id: Yup.string().required('ח.פ / ע.מ הוא שדה חובה'),
  phone: Yup.string().matches(phoneRegExp, 'מספר טלפון לא תקין').required('טלפון הוא שדה חובה'),
  typeMarketer: Yup.string().oneOf(['store', 'agent']).required('סוג משווק הוא שדה חובה'),
  logo: Yup.mixed().nullable(),

  brunches: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('שם הסניף הוא שדה חובה'),
      address: Yup.string().required('כתובת היא שדה חובה'),
      location: Yup.object().shape({
        lat: Yup.number().typeError('lat חייב להיות מספר').required(),
        lng: Yup.number().typeError('lng חייב להיות מספר').required(),
      }).required(),
      hoursOpen: Yup.array().of(
        Yup.object().shape({
          morning: Yup.object().shape({
            open: Yup.string(),
            close: Yup.string(),
          }),
          evening: Yup.object().shape({
            open: Yup.string(),
            close: Yup.string(),
          }),
        })
      ),
    })
  ).min(1, 'חייב להיות לפחות סניף אחד'),

  contactMans: Yup.array().of(
    Yup.object().shape({
      contactName: Yup.string().required('שם איש קשר הוא שדה חובה'),
      contactPhone: Yup.string().matches(phoneRegExp, 'מספר טלפון לא תקין').required('טלפון הוא שדה חובה'),
      contactEmail: Yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
      contactRole: Yup.string().required('תפקיד הוא שדה חובה'),
    })
  ).min(1, 'חייב להיות לפחות איש קשר אחד'),
});
