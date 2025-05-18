'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../store/step_store";
import { addContactMan, deleteContactMan } from "../store/contact_man_store";
import { Button } from "./ui/button";
import { RegisterForm2 } from "./register_form2";
import { ArrowLongLeftIcon, PlusCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import AlertSuccess from './alert_sucsses'



export default function StepThree() {
  const dispatch = useDispatch();
  const [validateFunction, setValidateFunction] = useState(() => () => true);
  const [showAlert, setShowAlert] = useState(false); // חדש
  const contactMans = useSelector(state => state.conectMan.contactMans || []);
  const activeStep = useSelector(state => state.stepper.activeStep);

  const nextStepInRedux = async () => {
    setShowAlert(true); // פותח את הפופ-אפ

    if (validateFunction()) {
      if (activeStep === 2) {
        try {
          await sendDataToServer(); // ודא שהפונקציה הזו מוגדרת
          setShowAlert(true); // פותח את הפופ-אפ
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
    <div className="flex flex-col gap-6 justify-center max-w-[1440px] px-[50px] py-[30px] gap-10 ">
      <div className={`flex flex-row-reverse text-right 
          ${contactMans.length > 2 ? 'overflow-x-auto whitespace-nowrap scrollbar-hide' : 'justify-start'}`}>
        {contactMans.map((x, index) => (
          <div key={x.id} className="ml-20">
            <RegisterForm2
              contactId={x.id}
              canDelete={contactMans.length > 1}
              OkFunction={handleDeleteConfirmation}
            />
          </div>
        ))}
      </div>

      <div className='flex flex-row w-full justify-between'>
        <div>
          <Button onClick={addContactManHandler}
            className="bg-black hover:bg-gray-800 text-white p-5 gap-2 rounded-full">
            <PlusCircleIcon />
            הוספת איש קשר נוסף
          </Button>
        </div>

        <div className="flex gap-4">
          <Button onClick={previousStepInRedux}
            className="flex items-center gap-1 bg-white text-black border border-[#F8BD00] p-5 rounded-full hover:bg-white hover:text-black hover:border-[#F8BD00]">
            <ArrowLongRightIcon />
            שלב קודם
          </Button>
          <Button onClick={nextStepInRedux}
            className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black p-5 rounded-full">
            סיימתי, אפשר לשלוח
            <ArrowLongLeftIcon />
          </Button>
        </div>
      </div>

      {/* פופאפ אלרט */}
      {showAlert && <AlertSuccess onClose={() => setShowAlert(false)} />}
    </div>
  );
}
