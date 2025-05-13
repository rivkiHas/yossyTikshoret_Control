'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../store/step_store";
import { addContactMan, deleteContactMan } from "../store/contact_man_store";
import { Button } from "./ui/button";
import { RegisterForm2 } from "./register_form2";
import { ArrowLongLeftIcon, PlusCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'

export default function StepThree() {
  const dispatch = useDispatch();
  const [validateFunction, setValidateFunction] = useState(() => () => true);
  const contactMans = useSelector(state => state.conectMan.contactMans || []);
  const activeStep = useSelector(state => state.stepper.activeStep);

  const nextStepInRedux = async () => {
    if (validateFunction()) {
      if (activeStep === 2) {
        try {
          await sendDataToServer();
        } catch (error) {
          console.log("שגיאה בשליחה");
        }
      } else {
        dispatch(nextStep());
      }
    } else {
      console.log("יש שגיאות בטופס");
    }
  };

  const previousStepInRedux = () => {
    dispatch(prevStep());
  };

  const addContactManHandler = () => {
    dispatch(addContactMan());
  };

  const handleDeleteConfirmation = (contactId) => {
    if (contactMans.length > 1) {
      dispatch(deleteContactMan(contactId));
    } else {
      console.log("לא ניתן למחוק, חייב להיות לפחות איש קשר אחד");
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-center max-w-[1440px] px-[100px] py-[72px] gap-15 ">
      <div
        className={`flex flex-row-reserve gap-10 text-right 
          ${contactMans.length > 2 ? 'overflow-x-auto whitespace-nowrap scrollbar-hide ' : 'justify-end'}
        `}
      >
        {contactMans.map((x, index) => {
          const isScrollable = contactMans.length > 2;
          const widthClass = isScrollable
            ? 'w-2/5 min-w-[50%] flex-shrink-0'
            : contactMans.length === 1
              ? 'w-2/5'
              : 'w-2/5';

          return (
            <div key={x.id} className={widthClass}>
              <RegisterForm2
                contactId={x.id}
                canDelete={contactMans.length > 1}
                OkFunction={handleDeleteConfirmation}
              />
            </div>
          );
        })}
      </div>

      <div className='flex flex-row w-full justify-between'>

        <div>
          <Button onClick={addContactManHandler}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full"
          >
            <PlusCircleIcon />
            הוספת איש קשר נוסף
          </Button>
        </div>

        <div className="flex gap-4">
          <Button onClick={previousStepInRedux}
            className="flex items-center gap-1 bg-white text-black border border-[#F8BD00] px-6 py-2 rounded-full hover:bg-white hover:text-black hover:border-[#F8BD00]"
          >
            <ArrowLongRightIcon />
            שלב קודם
          </Button>
          <Button onClick={nextStepInRedux}
            className="lex item-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full">
            שלב הבא
            <ArrowLongLeftIcon/>
          </Button>
        </div>
      </div>
    </div >
  );
}
