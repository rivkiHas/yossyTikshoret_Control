'use client';
import { Tab } from '@headlessui/react'
import AddressSearchMap from './address_search_map';
import HoursOpen from './hours_open';
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, setActiveStep } from "../store/step_store";
import { addBrunch, removeBrunch, setActiveBrunch } from "../store/brunch_store";
import { Button } from "./ui/button";
import { ArrowLongLeftIcon, PlusCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import IconButton from './icon_button';
import { useState, useEffect } from 'react';
import { AddBrunchDialog } from './alert_dialog_delete'


export default function StepTwo({ brunch: propBrunch }) {
  const dispatch = useDispatch();
  const brunches = useSelector((state) => state.brunch.brunches);
  const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer)
  const activeStep = useSelector((state) => state.stepper.activeStep)
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch);

  // אם יש brunch שנשלח כפרופ, השתמש בו; אחרת, השתמש בסניף הפעיל מהסטור
  const brunch = propBrunch || brunches.find(b => b.id === activeBrunch);

  // עדכון הסניף הפעיל כאשר הוא משתנה דרך הפרופס
  useEffect(() => {
    if (propBrunch && propBrunch.id !== activeBrunch) {
      dispatch(setActiveBrunch(propBrunch.id));
    }
  }, [propBrunch, activeBrunch, dispatch]);

  const [showDialog, setShowDialog] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');

  const nextStepInRedux = () => {
    // אם יש רק סניף אחד, עבור לשלב הבא
    if (brunches.length === 1) {
      dispatch(setActiveStep(activeStep + 1));
    } else {
      // אם יש יותר מסניף אחד, עבור לסניף הבא או לשלב השלישי
      const currentBrunchIndex = brunches.findIndex(b => b.id === activeBrunch);
      if (currentBrunchIndex < brunches.length - 1) {
        // יש עוד סניף אחרי הנוכחי
        const nextBrunch = brunches[currentBrunchIndex + 1];
        dispatch(setActiveBrunch(nextBrunch.id));
        // מחשב את האינדקס של הסניף בטאבים (2 + currentBrunchIndex + 1)
        dispatch(setActiveStep(2 + currentBrunchIndex + 1));
      } else {
        // זה הסניף האחרון, עבור לשלב 3
        dispatch(setActiveStep(2 + brunches.length)); // אינדקס של שלב 3 בטאבים
      }
    }
  };

  const previousStepInRedux = () => {
    // אם יש רק סניף אחד, חזור לשלב הראשון
    if (brunches.length === 1) {
      dispatch(setActiveStep(activeStep - 1));
    } else {
      // אם יש יותר מסניף אחד, חזור לסניף הקודם או לשלב הראשון
      const currentBrunchIndex = brunches.findIndex(b => b.id === activeBrunch);
      if (currentBrunchIndex > 0) {
        // יש סניף לפני הנוכחי
        const prevBrunch = brunches[currentBrunchIndex - 1];
        dispatch(setActiveBrunch(prevBrunch.id));
        // מחשב את האינדקס של הסניף בטאבים (2 + currentBrunchIndex - 1)
        dispatch(setActiveStep(2 + currentBrunchIndex - 1));
      } else {
        // זה הסניף הראשון, חזור לשלב 1
        dispatch(setActiveStep(0));
      }
    }
  };

  const handleAddBranchClick = () => {
    setShowDialog(true);
  };

  const handleConfirmAddBranch = () => {
    const newId = Math.max(...brunches.map(b => b.id)) + 1;
    const newBrunch = {
      id: newId,
      name: newBranchName || `סניף ${brunches.length + 1}`,
      address: "",
      location: {
        lat: 32.0853,
        lng: 34.7818
      },
      hoursOpen: [
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } }
      ],
      weekday: { morning: { open: "", close: "" }, evening: { open: "", close: "" } }
    };
    dispatch(addBrunch(newBrunch));
    dispatch(setActiveBrunch(newId));

    // עדכון האינדקס של הסניף החדש בטאבים
    const newBrunchIndex = brunches.length;
    dispatch(setActiveStep(2 + newBrunchIndex));

    setShowDialog(false);
    setNewBranchName('');
  };

  const handleDeleteConfirmation = (brunch) => {
    if (brunches.length > 1) {
      const brunchIndex = brunches.findIndex(b => b.id === brunch.id);
      dispatch(removeBrunch(brunch.id));

      // עדכון הסניף הפעיל והשלב הפעיל אחרי המחיקה
      if (brunchIndex > 0) {
        // אם יש סניף קודם, עבור אליו
        const prevBrunch = brunches[brunchIndex - 1];
        dispatch(setActiveBrunch(prevBrunch.id));
        dispatch(setActiveStep(2 + brunchIndex - 1));
      } else if (brunches.length > 1) {
        // אם יש סניף אחרי הנוכחי, עבור אליו
        const nextBrunch = brunches[1];
        dispatch(setActiveBrunch(nextBrunch.id));
        dispatch(setActiveStep(2));
      } else {
        // אם זה הסניף האחרון שנשאר, השאר בשלב 2
        dispatch(setActiveStep(1));
      }
    } else {
      console.log("לא ניתן למחוק, חייב להיות לפחות סניף אחד");
    }
  };

  // אם אין סניף פעיל, אל תרנדר
  if (!brunch) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-end w-full max-w-[1440px] px-[50px] py-[30px]">
        <div className="flex w-full items-start">
          <div className="flex flex-col w-1/2 text-right">
            <AddressSearchMap canEdit={brunches.length > 1} typeMarketer={typeMarketer} />
          </div>
          <div className="flex flex-col w-1/2 text-right">
            <HoursOpen />
          </div>
        </div>

        <div className='flex flex-row w-full justify-between'>
          <div>
            <div className='flex flex-row gap-4'>
              <Button onClick={handleAddBranchClick}
                className="cursor-pointer bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full"
              >
                <PlusCircleIcon />
                הוספת סניף נוסף
              </Button>

              {brunches.length > 1 && brunch &&
                <IconButton
                  headerText="מחיקה"
                  onConfirm={() => { handleDeleteConfirmation(brunch) }}
                  contactId={brunch.id}
                  text={"האם ברצונך למחוק את הסניף זה?"}
                />
              }
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={previousStepInRedux}
              className="cursor-pointer flex items-center gap-1 bg-white text-black border border-[#F8BD00]  p-5 gap-2 rounded-full hover:bg-white hover:text-black hover:border-black"
            >
              <ArrowLongRightIcon />
              שלב קודם
            </Button>
            <Button onClick={nextStepInRedux}
              className="cursor-pointer flex items-center gap-2 bg-yellow-400 text-black p-5 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#F8BD03]">
              שלב הבא
              <ArrowLongLeftIcon />
            </Button>
          </div>
        </div>
      </div>
      <AddBrunchDialog
        open={showDialog}
        value={newBranchName}
        onChange={setNewBranchName}
        onConfirm={handleConfirmAddBranch}
        onCancel={() => setShowDialog(false)}
      />
    </div>
  );
}