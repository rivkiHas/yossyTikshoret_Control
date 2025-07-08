import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils'
import { Tabs } from './desktop/tabs'
import {Tabs2} from './desktop/tabs2'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema
} from '@/lib/validation_schema';


export function RegisterCard({ className, ...props }) {
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const initialValues = {
    name: '',
    email: '',
    id: '',
    phone: '',
    typeMarketer: '',
    logo: null,
    brunches: [
      {
        name: '',
        address: '',
        location: { lat: '', lng: '' },
        hoursOpen: [],
      }
    ],
    contactMans: [
      {
        name: '',
        phone: '',
        email: '',
        role: ''
      }
    ],
  };

  const getValidationSchema = (step) => {
    switch (step) {
      case 0:
        return Yup.object({
          name: stepOneSchema.fields.name,
          email: stepOneSchema.fields.email,
          id: stepOneSchema.fields.id,
          phone: stepOneSchema.fields.phone,
          typeMarketer: Yup.string().oneOf(['store', 'agent']).required('סוג משווק הוא שדה חובה'),
          logo: stepOneSchema.fields.logo,
        });
      case 1:
        return Yup.object({
          brunches: stepTwoSchema,
        });
      case 2:
        return Yup.object({
          contactMans: stepThreeSchema,
        });
      default:
        return Yup.object(); // בלי ולידציה
    }
  };

  const handleSubmit = (values) => {
    console.log('Submitting...', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema(activeStep)}
      onSubmit={handleSubmit}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {(formik) => (
        <Form>
          <div className={cn('lg:flex lg:space-x-[28px]', className)} {...props}>
            <div className="block md:hidden">
              <Tabs2 />
            </div>
            <div className="hidden md:block">
              <Tabs />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
