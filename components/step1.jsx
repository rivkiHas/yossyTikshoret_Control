'use client'

import React, { useState } from "react";
import { RegisterForm1 } from "./register_form1";
import { RegisterFormButton } from "./register_form_button";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import {nextStep} from '../store/step_store';

export default function StepOne() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const nextStepInRedux = () => {
    dispatch(nextStep());
  };


  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-end w-full max-w-[1440px] px-[80px] py-[60px] gap-15">
        <div className="flex w-full items-start">
          <div className="flex flex-col w-1/2 text-right">
            <RegisterForm1 />
          </div>
          <div className="flex flex-col w-1/2 text-right">
            <RegisterFormButton />
          </div>
        </div>

        <div >
          <Button
            onClick={nextStepInRedux}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full"
          >
            שלב הבא
          </Button>
        </div>
      </div>
    </div>
  );
}
