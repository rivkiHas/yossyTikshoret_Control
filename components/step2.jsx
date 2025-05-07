'use client';

import { useState } from "react";
import AddressSearchMap from './address_search_map';
// import DeleteIcon from "@/components/buttons/DeleteIcon";
// import PopUpNameBrunch from "@/components/popups/PopUpNameBrunch";
import HoursOpen from './hours_open';
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../store/step_store";
import { addBrunch } from "../store/brunch_store";
import { Button } from "./ui/button";


export default function StepTwo({ brunch }) {
  const dispatch = useDispatch();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // const brunches = useSelector((state) => state.brunch.brunches);
  const typeMarketer = useSelector((state) => state.typeMarketer);

  const nextStepInRedux = () => {
    dispatch(nextStep());
  };

  const previousStepInRedux = () => {
    dispatch(prevStep());
  };

  const AddMoreBrunch = () => {
    dispatch(
      addBrunch({
        id: brunches.length + 1,
        address: '',
        name: "סניף חדש",
      })
    );
    setIsPopUpOpen(true);
  };

  const closePopup = () => {
    setIsPopUpOpen(false);
  };

  // const lastBrunch = brunches[brunches.length - 1];

  return (
    <div className="flex flex-col items-stretch">
     
        <div className="flex flex-row justify-around">
          <HoursOpen brunch={brunch} />
          <AddressSearchMap brunch={brunch} typeMarketer={typeMarketer} />
        </div>
     

      <div className="flex flex-row justify-between mt-6">
        <div className="flex flex-row gap-4">
          <Button
            onClick={nextStepInRedux}
          >
            שלב הבא
          </Button>
          <Button
            onClick={previousStepInRedux}

          >
            שלב קודם
          </Button>
        </div>

        <div className="flex flex-row gap-4">
          {typeMarketer === 'חנות' &&
            brunch > 0 && (
              <DeleteIcon
                key={brunch.id}
                functionName="brunch"
                placeholder="?האם ברצונך למחוק סניף זה"
                Id={lastBrunch.id}
              />
            )
          }

          <Button
            onClick={AddMoreBrunch}
          >
            הוספת סניף נוסף
          </Button>
        </div>
      </div>

      {isPopUpOpen && (
        <PopUpNameBrunch
          closePopup={closePopup}
          activeBrunch={lastBrunch}
        />
      )}
    </div>
  );
}
