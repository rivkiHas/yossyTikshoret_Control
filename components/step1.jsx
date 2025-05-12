'use client'

import React, { useState } from "react";
import { RegisterForm1 } from "./register_form1";
import { RegisterFormButton } from "./register_form_button";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { nextStep } from '../store/step_store';

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
            className="lex item-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full">
            שלב הבא
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
              <path d="M5.625 13.875L2.5 10.75L5.625 13.875ZM2.5 10.75L5.625 7.625L2.5 10.75ZM2.5 10.75H17.5H2.5Z" fill="black" />
              <path d="M5.625 13.875L2.5 10.75M2.5 10.75L5.625 7.625M2.5 10.75H17.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
