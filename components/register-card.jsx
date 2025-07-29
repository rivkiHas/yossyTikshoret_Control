import { cn } from '@/lib/utils'
import { stepOneSchema, stepThreeSchema, stepTwoSchema } from '@/lib/validation_schema'
import { Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Tabs } from './desktop/tabs'
import { Tabs2 } from './desktop/tabs2'

export function RegisterCard({ className, ...props }) {
  const activeStep = useSelector((state) => state.stepper.activeStep)
  const initialValues = {
    name: '',
    email: '',
    id: '',
    phone: '',
    typeMarketer: '',
    logo: null,
    brunches: [
      {
        name: 'number1',
        address: '',
        location: {},
        hoursOpen: '',
      },
    ],
    contactMans: [
      {
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        contactRole: 'seller',
      },
    ],
  }

  const getValidationSchema = (activeStep) => {
    switch (activeStep) {
      case 0:
        return Yup.object({
          name: stepOneSchema.fields.name,
          email: stepOneSchema.fields.email,
          id: stepOneSchema.fields.id,
          phone: stepOneSchema.fields.phone,
          typeMarketer: Yup.string().oneOf(['store', 'agent']).required('סוג משווק הוא שדה חובה'),
          logo: stepOneSchema.fields.logo,
        })
      case 1:
        return Yup.object({
          brunches: stepTwoSchema.fields.brunches,
        })
      case 2:
        return Yup.object({
          contactMans: stepThreeSchema,
          name: Yup.string().required('שם הוא שדה חובה'),
          email: Yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
          id: Yup.string().required('תעודת זהות היא שדה חובה'),
          phone: Yup.string().required('טלפון הוא שדה חובה'),
          typeMarketer: Yup.string().oneOf(['store', 'agent']).required('סוג משווק הוא שדה חובה'),
          logo: Yup.mixed().nullable(),
          brunches: stepTwoSchema.fields.brunches,
        })
      default:
        return Yup.object({
          name: Yup.string().required('שם הוא שדה חובה'),
          email: Yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
          id: Yup.string().required('תעודת זהות היא שדה חובה'),
          phone: Yup.string().required('טלפון הוא שדה חובה'),
          typeMarketer: Yup.string().oneOf(['store', 'agent']).required('סוג משווק הוא שדה חובה'),
          logo: Yup.mixed().nullable(),
          brunches: stepTwoSchema.fields.brunches,
          contactMans: stepThreeSchema,
        })
    }
  }

  const handleSubmit = (values) => {
    console.log('Submitting...', values)
  }

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
  )
}
