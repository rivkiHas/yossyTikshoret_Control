'use client';

import AddressSearchMap from './address_search_map';
import HoursOpen from './hours_open';
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../store/step_store";
import { addBrunch, setActiveBrunch } from "../store/brunch_store";
import { Button } from "./ui/button";


export default function StepTwo({ brunch }) {
  const dispatch = useDispatch();
  const brunches = useSelector((state) => state.brunch.brunches);
  const typeMarketer = useSelector((state) => state.typeMarketer);
  const activeBrunch = useSelector((state) => state.activeBrunch)
  const activeStep = useSelector((state) => state.activeStep)

  const nextStepInRedux = () => {
    dispatch(nextStep());

  };

  const previousStepInRedux = () => {
    dispatch(prevStep());
  };

  const AddMoreBrunch = () => {
    const newId = brunches.length + 1
    const newBrunch = {
      newId,
      address: '',
      name: "סניף חדש",
    }
    dispatch(
      addBrunch({ newBrunch }),
      setActiveBrunch(newBrunch)
    )
  };
  return (

    
    <div className="w-full flex justify-center">

      <div className="flex flex-col items-end w-full max-w-[1440px] px-[100px] py-[72px] gap-10">
        <div className="flex w-full items-start">
          <div className="flex flex-col w-1/2 text-right">
            <AddressSearchMap brunch={activeBrunch} />
          </div>
          <div className="flex flex-col w-1/2 text-right">
            <HoursOpen brunch={activeBrunch} />
          </div>
        </div>
        <div className="flex flex-row justify-between ">
          <div className="flex gap-4">
            <Button onClick={nextStepInRedux}> שלב הבא </Button>
            <Button onClick={previousStepInRedux}>שלב קודם</Button>
          </div>
          <div className="flex gap-4">
            <Button onClick={AddMoreBrunch}>הוספת סניף נוסף</Button>
          </div>
        </div>
      </div>
    </div >
  );
}
