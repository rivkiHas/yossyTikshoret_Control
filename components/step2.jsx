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
    dispatch(setActiveBrunch(newBrunch));
  };

  return (


    <div className="flex justify-center">
      <div className="flex flex-col items-end w-full max-w-[1440px] px-[80px] py-[60px] gap-15">
        <div className="flex w-full items-start">
          <div className="flex flex-col w-1/2 text-right">
            <AddressSearchMap brunch={activeBrunch} />
          </div>
          <div className="flex flex-col w-1/2 text-right">
            <HoursOpen brunch={activeBrunch} />
          </div>
        </div>

        <div className='flex flex-row w-full justify-between'>
          <div>
            <Button onClick={AddMoreBrunch}
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full"
            >הוספת סניף נוסף
            </Button>
          </div>
          <div className="flex gap-4">
            <Button onClick={previousStepInRedux}
              className="flex items-center gap-1 bg-white text-black border border-[#F8BD00] px-6 py-2 rounded-full hover:bg-white hover:text-black hover:border-[#F8BD00]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path d="M14.375 7.625L17.5 10.75L14.375 7.625ZM17.5 10.75L14.375 13.875L17.5 10.75ZM17.5 10.75H2.5H17.5Z" fill="black" />
                <path d="M14.375 7.625L17.5 10.75M17.5 10.75L14.375 13.875M17.5 10.75H2.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              שלב קודם
            </Button>
            <Button onClick={nextStepInRedux}
              className="lex item-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full">
              שלב הבא
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path d="M5.625 13.875L2.5 10.75L5.625 13.875ZM2.5 10.75L5.625 7.625L2.5 10.75ZM2.5 10.75H17.5H2.5Z" fill="black" />
                <path d="M5.625 13.875L2.5 10.75M2.5 10.75L5.625 7.625M2.5 10.75H17.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div >
  );
}
