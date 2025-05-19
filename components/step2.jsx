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
import { LoadScript } from "@react-google-maps/api";
import { useState } from 'react';
import { AddBrunchDialog } from './alert_dialog_delete'
import { DatabaseBackup } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_LIBRARIES = ["places"];


export default function StepTwo({ brunch }) {
  const dispatch = useDispatch();
  const brunches = useSelector((state) => state.brunch.brunches);
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch)
  const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer)
  const activeStep = useSelector((state) => state.stepper.activeStep)

  const [showDialog, setShowDialog] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');

  const nextStepInRedux = () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const previousStepInRedux = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleAddBranchClick = () => {
    setShowDialog(true);
  };


  const handleConfirmAddBranch = () => {
    const newId = Math.max(...brunches.map(b => b.id)) + 1;
    const newBrunch = {
      id: newId,
      address: '',
      location: { lat: 32.0853, lng: 34.7818 },
      hoursOpen: [
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
        { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
      ],
      weekday: { morning: { open: "", close: "" }, evening: { open: "", close: "" } },
      name: newBranchName || `סניף חדש`,
    };
    dispatch(addBrunch(newBrunch));
    dispatch(setActiveBrunch(newId));
    setShowDialog(false);
    setNewBranchName('');
  };

  const handleDeleteConfirmation = (brunch) => {
    if (brunches.length > 1) {
      dispatch(removeBrunch(brunch));
    } else {
      console.log("לא ניתן למחוק, חייב להיות לפחות איש קשר אחד");
    }
  };
  
  return (

    <div className="flex justify-center">
      <div className="flex flex-col items-end w-full max-w-[1440px] px-[50px] py-[30px] gap-10">
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
            <div className='flex flex-row gap-4 '>
              <Button onClick={handleAddBranchClick}
                className="bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full"
              >
                <PlusCircleIcon />
                הוספת סניף נוסף
              </Button>
              {brunches.length > 1 &&
                <IconButton text="מחיקה" onConfirm={() => { handleDeleteConfirmation() }} contactId={brunch.id} />
              }
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={previousStepInRedux}
              className="flex items-center gap-1 bg-white text-black border border-[#F8BD00]  p-5 gap-2 rounded-full hover:bg-white hover:text-black hover:border-black"
            >
              <ArrowLongRightIcon />
              שלב קודם
            </Button>
            <Button onClick={nextStepInRedux}
              className="flex items-center gap-2 bg-yellow-400 text-black p-5 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#F8BD03]">
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
    </div >
  );
}
