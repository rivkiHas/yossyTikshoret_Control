'use client'

import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { useFormikContext } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setFormData } from '../../store/form_store'
import { setActiveStep } from '../../store/step_store'
import { RegisterForm1 } from '../register_form1'
import { RegisterFormButton } from '../register_form_button'
import { Button } from '../ui/button'

export default function StepOne({ index }) {
  const dispatch = useDispatch()
  const activeStep = useSelector((state) => state.stepper.activeStep)
  const user = useSelector((state) => state.form.pertip)
  const formik = useFormikContext()

  const handleNextStep = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        const { logo, ...rest } = formik.values
        dispatch(
          setFormData({
            ...rest,
            logo: logo?.name || '',
          })
        )
        dispatch(setActiveStep(activeStep + 1))
      } else {
        formik.setTouched(Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      }
    })
  }

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1440px] flex-col items-end md:px-[50px] lg:px-[20px] lg:py-[30px]">
        <div className="flex w-full flex-col gap-[24px] lg:flex-row lg:gap-[36px]">
          <div className="flex w-full flex-col lg:flex-row lg:gap-4">
            <div className="flex w-full flex-col rounded-[40px] p-4 lg:mx-auto lg:w-1/2">
              <RegisterForm1 />
            </div>
            <div className="flex w-full max-w-[500px] flex-col rounded-[40px] p-4 lg:mx-auto lg:w-1/2">
              <RegisterFormButton />
            </div>
          </div>
        </div>

        <div className="hidden px-8 lg:block">
          <Button
            onClick={handleNextStep}
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-transparent bg-yellow-400 p-5 text-[14px] text-black hover:border-[#F8BD03] hover:bg-white hover:text-black"
          >
            שלב הבא
            <ArrowLongLeftIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
