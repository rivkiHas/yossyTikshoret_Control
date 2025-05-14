'use client';

import AddressSearchMap from './address_search_map';
import HoursOpen from './hours_open';
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../store/step_store";
import { addBrunch, setActiveBrunch } from "../store/brunch_store";
import { Button } from "./ui/button";
import { ArrowLongLeftIcon, PlusCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { AlertDialog } from './ui/alert-dialog';


export default function StepTwo({ brunch }) {
  const dispatch = useDispatch();
  const brunches = useSelector((state) => state.brunch.brunches);
  const typeMarketer = useSelector((state) => state.typeMarketer);
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch)
  const activeStep = useSelector((state) => state.activeStep)

  const nextStepInRedux = () => {
    dispatch(nextStep());

  };

  const previousStepInRedux = () => {
    dispatch(prevStep());
  };

  const AddMoreBrunch = () => {
    
    const newId = brunches.length + 1;
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
      name: "סניף חדש",

    };

    dispatch(addBrunch(newBrunch));
    dispatch(setActiveBrunch(newBrunch.id));
    
  };
  console.log(activeBrunch);
  
  return (
   
    <div className="flex justify-center">
      <div className="flex flex-col items-end w-full max-w-[1440px] px-[50px] py-[30px] gap-10">
        <div className="flex w-full items-start">
          <div className="flex flex-col w-1/2 text-right">
            <AddressSearchMap brunch={brunches.find(x=>x.id==activeBrunch)} />
          </div>
          <div className="flex flex-col w-1/2 text-right">
            <HoursOpen brunch={brunches.find(x=>x.id==activeBrunch)} />
          </div>
        </div>

        <div className='flex flex-row w-full justify-between'>
          <div>
            <Button onClick={AddMoreBrunch}
              className="bg-black hover:bg-gray-800 text-white p-5 gap-2 rounded-full"
            >
              <PlusCircleIcon />
              הוספת סניף נוסף
            </Button>
          </div>
          <div className="flex gap-4">
            <Button onClick={previousStepInRedux}
              className="flex items-center gap-1 bg-white text-black border border-[#F8BD00]  p-5 gap-2 rounded-full hover:bg-white hover:text-black hover:border-[#F8BD00]"
            >
             <ArrowLongRightIcon/>
              שלב קודם
            </Button>
            <Button onClick={nextStepInRedux}
              className="lex item-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black  p-5 gap-2 rounded-full">
              שלב הבא
              <ArrowLongLeftIcon/>
            </Button>
          </div>
        </div>
      </div>
    </div >
  );
}
