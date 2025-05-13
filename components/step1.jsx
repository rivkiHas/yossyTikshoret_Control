'use client'

import React, { useState } from "react";
import { RegisterForm1 } from "./register_form1";
import { RegisterFormButton } from "./register_form_button";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import {nextStep} from '../store/step_store';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
export default function StepOne({index}) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const nextStepInRedux = () => {
   
  };


  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-end w-full max-w-[1440px] px-[50px] py-[30px] gap-10">
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
            className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black p-6 rounded-full">
              שלב הבא
              <ArrowLongLeftIcon/>
          </Button>
        </div>
      </div>
    </div>
  );
}
