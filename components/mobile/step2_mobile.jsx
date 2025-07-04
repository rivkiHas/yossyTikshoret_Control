'use client';
import AddressSearchMap from '../address_search_map';
import HoursOpen from './hours_open_mobile';
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, setActiveStep } from "../../store/step_store";
import { addBrunch, removeBrunch, setActiveBrunch } from "../../store/brunch_store";
import { Button } from "../ui/button";
import {  PlusCircleIcon } from '@heroicons/react/24/outline'
import IconButton from '../icon_button';
import { useState, useEffect } from 'react';
import { AlertDialogEdit } from '../alert_dialog_edit'


export default function StepTwo({ brunch: propBrunch }) {
    const dispatch = useDispatch();
    const brunches = useSelector((state) => state.brunch.brunches);
    const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer)
    const activeStep = useSelector((state) => state.stepper.activeStep)
    const activeBrunch = useSelector((state) => state.brunch.activeBrunch);

    const brunch = propBrunch || brunches.find(b => b.id === activeBrunch);

    useEffect(() => {
        if (propBrunch && propBrunch.id && propBrunch.id !== activeBrunch) {
            console.log("step2", propBrunch.id);

            dispatch(setActiveBrunch(propBrunch.id));

        }
    }, [propBrunch, activeBrunch, dispatch]);

    const [showDialog, setShowDialog] = useState(false);
    const [newBranchName, setNewBranchName] = useState('');





    const handleAddBranchClick = () => {
        setShowDialog(true);
    };

    const handleConfirmAddBranch = () => {
        const newId = Math.max(...brunches.map(b => b.id)) + 1;
        const newBrunch = {
            id: newId,
            name: newBranchName || `${brunches.length + 1}`,
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

        const newBrunchIndex = brunches.length;
        dispatch(setActiveStep(2 + newBrunchIndex));

        setShowDialog(false);
        setNewBranchName('');
    };

    const handleDeleteConfirmation = (brunch) => {
        if (brunches.length > 1) {
            const brunchIndex = brunches.findIndex(b => b.id === brunch.id);
            dispatch(removeBrunch(brunch.id));

            if (brunchIndex > 0) {
                const prevBrunch = brunches[brunchIndex - 1];
                dispatch(setActiveBrunch(prevBrunch.id));
                dispatch(setActiveStep(2 + brunchIndex - 1));
            } else if (brunches.length > 1) {
                const nextBrunch = brunches[1];
                dispatch(setActiveBrunch(nextBrunch.id));
                dispatch(setActiveStep(2));
            } else {
                dispatch(setActiveStep(1));
            }
        } else {
            console.log("לא ניתן למחוק, חייב להיות לפחות סניף אחד");
        }
    };

    if (!brunch) {
        return null;
    }

    return (
        <div >
            <div className=' justify-center items-center min-h-screen'>
                <div className="flex flex-col w-full gap-10 ">
                    <div className="flex flex-col text-right rounded-[40px] bg-white p-6">
                        <AddressSearchMap typeMarketer={typeMarketer} />
                    </div>
                    <div className="flex flex-col text-right rounded-[40px] bg-white p-6">
                        <HoursOpen typeMarketer={typeMarketer} />
                    </div>
                </div>

                <div className={`flex flex-row w-full ${typeMarketer === "חנות" ? "justify-between" : "justify-end"}`}>
                    {typeMarketer == "חנות" && <div>
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
                    </div>}

                </div>
            </div>
            <AlertDialogEdit
                open={showDialog}
                value={newBranchName}
                onChange={setNewBranchName}
                onConfirm={handleConfirmAddBranch}
                onCancel={() => setShowDialog(false)}
            />
        </div>
    );
}