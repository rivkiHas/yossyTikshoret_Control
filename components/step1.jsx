// בקובץ StepOne.jsx
'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { RegisterForm1 } from "./register_form1";
import { RegisterFormButton } from "./register_form_button";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "../store/step_store";
import { setFormData } from "../store/form_store";
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'

export default function StepOne({ index }) {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const user = useSelector((state) => state.form.pertip);

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      mail: user?.mail || "",
      id: user?.id || "",
      phone: user?.phone || "",
      logo: null,
    },
    mode: "onChange",
  });

  const handleNextStep = async () => {
    const isValid = await form.trigger();

    if (!isValid) return;
    dispatch(setFormData(form.getValues()));
    dispatch(setActiveStep(activeStep + 1));
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-end w-full max-w-[1440px] px-[50px] py-[30px] gap-10">
        <div className="flex w-full items-start">
          <div className="flex flex-col w-1/2 text-right">
            <RegisterForm1 form={form} />
          </div>
          <div className="flex flex-col w-1/2 text-right">
            <RegisterFormButton />
          </div>
        </div>

        <div>
          <Button
            onClick={handleNextStep}
            className="flex cursor-pointer items-center gap-2 font-[16px] bg-yellow-400 text-black p-5 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#F8BD03]"
          >
            שלב הבא
            <ArrowLongLeftIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
