'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { RegisterForm1 } from "../register_form1";
import { RegisterFormButton } from "../register_form_button";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "../../store/step_store";
import { setFormData } from "../../store/form_store";
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { useFormikContext } from 'formik';

export default function StepOne({ index }) {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const user = useSelector((state) => state.form.pertip);
  const formik = useFormikContext();

// const handleNextStep = () => {
//   formik.validateForm().then((errors) => {
//     if (Object.keys(errors).length === 0) {
//       dispatch(setFormData(formik.values));
//       dispatch(setActiveStep(activeStep + 1));
//     } else {
//       formik.setTouched(
//         Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
//       );
//     }
//   });
// };
const handleNextStep = () => {
  formik.validateForm().then((errors) => {
    if (Object.keys(errors).length === 0) {
      const { logo, ...rest } = formik.values;
      dispatch(setFormData({
        ...rest,
        logo: logo?.name || "" 
      }));

      dispatch(setActiveStep(activeStep + 1));
    } else {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
    }
  });
};


  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-end w-full max-w-[1440px] lg:px-[20px] md:px-[50px] lg:py-[30px] ">
        <div className="flex flex-col lg:flex-row w-full gap-[24px] lg:gap-[36px]">
          <div className="flex flex-col lg:flex-row w-full lg:gap-4">
            <div className="flex flex-col lg:w-1/2 w-full lg:mx-auto p-4 rounded-[40px]">
              <RegisterForm1 />
            </div>
            <div className="flex flex-col lg:w-1/2 w-full max-w-[500px] lg:mx-auto p-4 rounded-[40px]">
              <RegisterFormButton />
            </div>
          </div>

        </div>


        <div className="hidden lg:block px-8">
          <Button
            onClick={handleNextStep}
            type="button"
            className="flex cursor-pointer items-center gap-2 text-[14px] bg-yellow-400 text-black p-5 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#F8BD03]"
          >
            שלב הבא
            <ArrowLongLeftIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}