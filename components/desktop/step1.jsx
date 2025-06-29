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

export default function StepOne({ index}) {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const user = useSelector((state) => state.form.pertip);

  // const form = useForm({
  //   defaultValues: {
  //     name: user?.name || "",
  //     email: user?.email || "",
  //     id: user?.id || "",
  //     phone: user?.phone || "",
  //     logo: null,
  //   },
  //   mode: "onChange",
  // });

  // const handleNextStep = async () => {

  //   dispatch(setFormData(form.getValues()));
  //   dispatch(setActiveStep(activeStep + 1));
  // };
const handleNextStep = () => {
  dispatch(setFormData(formik.values));
  dispatch(setActiveStep(activeStep + 1));
};

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-end w-full max-w-[1440px] px-[20px] md:px-[50px] py-[30px] ">
        <div className="flex flex-col lg:flex-row w-full gap-[24px] lg:gap-[36px]">
          <div className="flex flex-col lg:flex-row w-full gap-6">
            <div className="flex flex-col lg:w-1/2 w-full max-w-[500px] mx-auto p-4 rounded-[40px]">
              <RegisterForm1/>
            </div>

            <div className="flex flex-col lg:w-1/2 w-full max-w-[500px] mx-auto  p-4 rounded-[40px]">
              <RegisterFormButton/>
            </div>
          </div>

        </div>


        <div className="hidden lg:block">
          <Button
            onClick={handleNextStep}
            className="flex cursor-pointer items-center gap-2 text-[16px] bg-yellow-400 text-black p-5 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#F8BD03]"
          >
            שלב הבא
            <ArrowLongLeftIcon />
          </Button>
        </div>
      </div>
    </div>


  );
}
