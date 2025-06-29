import { cn } from '@/lib/utils'
import { Tabs } from './desktop/tabs'
import Tabs2 from './desktop/tabs2'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema
} from '@/lib/validation_schema';


export function RegisterCard({ className, ...props }) {
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

  const validationSchema = Yup.object({
    name: stepOneSchema.fields.name,
    email: stepOneSchema.fields.email,
    id: stepOneSchema.fields.id,
    phone: stepOneSchema.fields.phone,
    typeMarketer: stepOneSchema.fields.typeMarketer,
    logo: stepOneSchema.fields.logo,
    brunches: stepTwoSchema,
    contactMans: stepThreeSchema,
  });


  const handleSubmit = (values) => {
    console.log('Submitting...', values);
  };
  debugger;

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {(formik) => (
        <Form>
          <div className={cn('flex space-x-[28px]', className)} {...props}>
            <div className="block md:hidden">
              <Tabs2/>
            </div>
            <div className="hidden md:block">
              <Tabs/>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
