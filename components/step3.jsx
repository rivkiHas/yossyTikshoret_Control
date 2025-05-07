'use client';

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../store/step_store";
import { addContactMan, deleteContactMan } from "../store/contact_man_store";
import { Button } from "./ui/button";
import { RegisterForm2 } from "./register_form2";
import { AlertDialogDelete } from "./alert_dialog_delete";

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
    <div className="flex flex-col gap-6  justify-end">
      <div
        className={`
          flex flex-row-reverse gap-8 px-[100px] py-[72px] text-right justify-end
          ${contactMans.length > 2 ? 'overflow-x-auto whitespace-nowrap scrollbar-hide justify-end' : 'justify-end'}
        `}
      >
        {contactMans.map((x, index) => {
          const isScrollable = contactMans.length > 2;
          const widthClass = isScrollable
            ? 'w-1/2 min-w-[50%] flex-shrink-0 '
            : contactMans.length === 1
              ? 'w-1/2'
              : 'w-1/2';

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

      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-4">
          <Button onClick={nextStepInRedux}>סיימתי אפשר לשלוח</Button>
          <Button onClick={previousStepInRedux}>שלב קודם</Button>
        </div>
        <div className="flex gap-4">
          <Button onClick={addContactManHandler}>הוספת איש קשר נוסף</Button>
        </div>
      </div>
    </div>
  );
}
