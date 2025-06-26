'use client';

import React, { useState } from "react";
import axios from '@/lib/axios'
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setActiveStep } from "../../store/step_store";
import { addContactMan, deleteContactMan } from "../../store/contact_man_store";
import { Button } from "../ui/button";
import { RegisterForm2 } from "../register_form2";
import { ArrowLongLeftIcon, PlusCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import AlertSuccess from '../alert_sucsses'
import {
  isPertipStepComplete,
  isContactStepComplete,
  isBrunchStepComplete,
  isAllStepsComplete
} from '@/store/selectors'; 

export default function StepThree() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contactMans = useSelector(state => state.conectMan.contactMans || []);
  const activeStep = useSelector(state => state.stepper.activeStep);
  const [validators, setValidators] = useState({});
  const user = useSelector((state) => state.form.pertip);
  const brunches = useSelector((state) => state.brunch.brunches);

  const isPertipComplete = useSelector(isPertipStepComplete);
  const isContactComplete = useSelector(isContactStepComplete);
  const isBrunchComplete = useSelector(isBrunchStepComplete);
  const isAllComplete = useSelector(isAllStepsComplete);

  const validateFunction = () => {
    return Object.values(validators).every(fn => fn?.() === true);
  };

  const validateAllSteps = () => {
    const validationErrors = [];

    if (!isPertipComplete) {
      validationErrors.push('אנא השלם את כל השדות בשלב פרטי העסק');
    }

    if (!isContactComplete) {
      validationErrors.push('אנא השלם את כל השדות של אנשי הקשר');
    }

    if (!isBrunchComplete) {
      validationErrors.push('אנא השלם את כל השדות של הסניפים');
    }

    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors
    };
  };

  const sendDataToServer = async () => {
    const payload = {
      business_name: user.name,
      email: user.email,
      tax_id: user.id,
      phone: user.phone,
      type: user.typeMarketer,
      brunches: brunches.map(b => ({
        address: b.address,
        brunchName: b.name,
        hours_open: b.hoursOpen.map(day => ({
          morning: [{ open: day.morning.open, close: day.morning.close }],
          evening: [{ open: day.evening.open, close: day.evening.close }]
        }))
      })),
      contact: contactMans.map(c => ({
        contactName: c.name,
        contactPhone: c.phone,
        contactEmail: c.email,
        contactRole: c.role
      }))
    };

    try {
      const response = await axios.post(
        'https://api.yossi-tikshoret.test/api/register',
        payload,

      );

      return response.data;
    } catch (error) {
      let errorMsg = 'שגיאה בשליחת הנתונים לשרת';

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
          case 400:
            errorMsg = data.message || 'נתונים לא תקינים';
            break;
          case 401:
            errorMsg = 'שגיאת הרשאה - אנא התחבר מחדש';
            break;
          case 422:
            if (data.errors) {
              const serverErrors = Object.values(data.errors).flat();
              errorMsg = serverErrors.join(', ');
            } else {
              errorMsg = data.message || 'שגיאת תקינות נתונים';
            }
            break;
          case 500:
            errorMsg = 'שגיאת שרת פנימית - אנא נסה שוב מאוחר יותר';
            break;
          default:
            errorMsg = data.message || `שגיאה ${status}`;
        }
      } else if (error.request) {
        errorMsg = 'שגיאת חיבור לשרת - אנא בדק את החיבור לאינטרנט';
      } else {
        errorMsg = error.message || 'שגיאה לא צפויה';
      }

      throw new Error(errorMsg);
    }
  };

  const nextStepInRedux = async () => {
    //if (!validateFunction()) {
    //  console.log("יש שגיאות בטופס הנוכחי");
    //  setErrorMessage('אנא מלא את כל השדות הנדרשים');
    //  setShowErrorAlert(true);
    // return;
    //  }

    if (activeStep === 2) {
      //  // const validation = validateAllSteps();

      //   if (!validators.isValid) {
      //     setErrorMessage(validation.errors.join('\n'));
      //     setShowErrorAlert(true);
      //     return;
      //   }

      setIsLoading(true);
      try {
        await sendDataToServer();
        dispatch(nextStep());
        setShowAlert(true);
        console.log("הנתונים נשלחו בהצלחה!");
      } catch (error) {
        console.error("שגיאה בשליחה לשרת:", error.message);
        setErrorMessage(error.message);
        setShowErrorAlert(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(nextStep());
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
      setErrorMessage('לא ניתן למחוק, חייב להיות לפחות איש קשר אחד');
      setShowErrorAlert(true);
    }
  };

  const closeErrorAlert = () => {
    setShowErrorAlert(false);
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] px-[20px] md:px-[50px] py-[30px] direction-rtl">
      <div className="grid grid-cols-1 md:grid-cols-1 pr-2 justify-center lg:max-h-[60vh] lg:overflow-y-auto w-full gap-6">
        <div className="flex flex-col gap-6 pr-2 h-full">
          {contactMans.map((x) => (
            <div key={x.id} className="w-full flex justify-start bg-white rounded-[40px] p-4 h-full gap-10">
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
      </div>

      <div className="hidden lg:flex w-full justify-between">
        <Button onClick={addContactManHandler}
          className="cursor-pointer bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full">
          <PlusCircleIcon />
          הוספת איש קשר נוסף
        </Button>

        <div className="hidden lg:flex gap-4">
          <Button onClick={previousStepInRedux}
            className="cursor-pointer flex items-center gap-1 bg-white text-black border border-[#F8BD00] p-5 rounded-full hover:border-black">
            <ArrowLongRightIcon />
            שלב קודם
          </Button>
          <Button
            onClick={nextStepInRedux}
            disabled={isLoading}
            className="flex cursor-pointer items-center gap-3 text-black border border-black p-5 rounded-full relative overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-black hover:shadow-lg active:scale-90
before:absolute before:top-0 before:-right-full before:w-full before:h-full 
before:bg-[#F8BD00] before:transition-all before:duration-500 before:ease-in-out 
before:z-[-1] before:rounded-full hover:before:right-0 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? 'שולח...' : 'סיימתי, אפשר לשלוח'}
            <ArrowLongLeftIcon />
          </Button>
        </div>
      </div>

    </div>

  );
}