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
import { useFormikContext } from 'formik';

export default function StepThree() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const formik = useFormikContext();
  const contactMans = useSelector(state => state.conectMan.contactMans || []);
  const activeStep = useSelector(state => state.stepper.activeStep);
  const [validators, setValidators] = useState({});
  const user = useSelector((state) => state.form.pertip);
  const brunches = useSelector((state) => state.brunch.brunches);
  const salesMap = {
    "קווי": 1,
    "סלולרי": 2,
    "רכבים": 3,
  };
  const resellerTypeIds = user.typeSales.map((sale) => salesMap[sale]);


  const sendDataToServer = async () => {
    const payload = {
      business_name: user.name,
      email: user.email,
      tax_id: user.id,
      phone: user.phone,
      type: user.typeMarketer,
      reseller_type_id: resellerTypeIds,
      brunches: brunches.map(b => ({
        address: b.address,
        brunchName: b.name,
        hours_open: b.hoursOpen.map(day => ({
          morning: {
            open: {
              open: day.morning.open,
              close: day.morning.close
            },
            close: {
              open: "00:00",
              close: "00:00"
            }
          },
          evening: {
            open: {
              open: day.evening.open,
              close: day.evening.close
            },
            close: {
              open: "00:00",
              close: "00:00"
            }
          }
        }))
      })),
      contact: contactMans.map(c => ({
        contactName: c.contactName,
        contactPhone: c.contactPhone,
        contactEmail: c.contactEmail,
        contactRole: c.contactRole
      }))
    };
    console.log(payload, "payload");

    try {
      const csrf = () => axios.get('/sanctum/csrf-cookie')
      await csrf();
      const response = await axios.post(
        '/api/register',
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
  const errors = await formik.validateForm();

  if (Object.keys(errors).length === 0) {
    if (activeStep >= 2) {
      setIsLoading(true);
      try {
        await sendDataToServer();
        dispatch(nextStep());
        setShowAlert(true);
        console.log("הנתונים נשלחו בהצלחה!");
        return null; 
      } catch (error) {
        console.error("שגיאה בשליחה לשרת:", error.message);
        setErrorMessage(error.message);
        setShowErrorAlert(true);
        return { server: error.message };
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(nextStep());
      return null; 
    }
  } else {
    formik.setTouched(
      Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return errors; 
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
    <div className="flex flex-col gap-6 max-w-[1440px] lg:pb-0 p-5 pb-25 direction-rtl">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:pr-2 justify-center lg:h-[60vh]  lg:overflow-y-auto w-full ">
        <div className="flex flex-col lg:pr-2 lg:gap-6 gap-6">
          {contactMans.map((x) => (
            <div key={x.id} className="w-full flex justify-start bg-white rounded-[40px] p-4 gap-10">
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

      <div className="hidden lg:flex w-full justify-between px-8">
        <Button onClick={addContactManHandler}
          className="cursor-pointer bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full">
          <PlusCircleIcon />
          הוספת איש קשר נוסף
        </Button>

        <div className="hidden lg:flex gap-4">
          <Button onClick={previousStepInRedux}
            className="cursor-pointer flex items-center bg-white text-black border border-[#F8BD00]  p-5 gap-3 rounded-full hover:bg-white hover:text-black hover:border-black"
          >
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