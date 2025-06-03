'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, setActiveStep } from "../../store/step_store";
import { addContactMan, deleteContactMan } from "../../store/contact_man_store";
import { Button } from "../ui/button";
import { RegisterForm2 } from "../register_form2";
import { ArrowLongLeftIcon, PlusCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import AlertSuccess from '../alert_sucsses'



export default function StepThree() {
  const dispatch = useDispatch();
  const [validateFunction, setValidateFunction] = useState(() => () => true);
  const [showAlert, setShowAlert] = useState(false); // חדש
  const contactMans = useSelector(state => state.conectMan.contactMans || []);
  const activeStep = useSelector(state => state.stepper.activeStep);
  const [validators, setValidators] = useState({});

  const nextStepInRedux = async () => {
    setShowAlert(true);

    if (validateFunction()) {
      if (activeStep === 2) {
        try {
          await sendDataToServer();
          setShowAlert(true);
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
    dispatch(setActiveStep(activeStep - 1));
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
    <div className="flex flex-col gap-6 max-w-[1440px] px-[50px] py-[30px] direction-rtl ">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-30 max-h-[70vh] overflow-y-auto pr-2">

        {contactMans.map((x, index) => (
          <div key={x.id} className="ml-20">
            <RegisterForm2
              contactId={x.id}
              canDelete={contactMans.length > 1}
              OkFunction={handleDeleteConfirmation}
              setValidator={(fn) => {
                setValidators((prev) => ({ ...prev, [x.id]: fn }));
              }}
            />
          </div>
        ))}

      </div>

      <div className='flex flex-row w-full justify-between'>
        <div>
          <Button onClick={addContactManHandler}
            className=" cursor-pointer bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full">
            <PlusCircleIcon />
            הוספת איש קשר נוסף
          </Button>
        </div>

        <div className="flex gap-4">
          <Button onClick={previousStepInRedux}
            className=" cursor-pointer flex items-center gap-1 bg-white text-black border border-[#F8BD00]  p-5 gap-2 rounded-full hover:bg-white hover:text-black hover:border-black">
            <ArrowLongRightIcon />
            שלב קודם
          </Button>
          <Button onClick={nextStepInRedux}
            className="flex cursor-pointer items-center gap-3 text-black border border-black p-5 rounded-full relative overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-black hover:shadow-lg active:scale-90 
before:absolute before:top-0 before:-right-full before:w-full before:h-full 
before:bg-[#F8BD00] before:transition-all before:duration-500 before:ease-in-out 
before:z-[-1] before:rounded-full hover:before:right-0"
          >
            סיימתי, אפשר לשלוח
            <ArrowLongLeftIcon />
          </Button>
        </div>
      </div>

      {/* פופאפ אלרט */}
      {showAlert && <AlertSuccess onClose={() => setShowAlert(false)} />}
    </div >
  );
}
