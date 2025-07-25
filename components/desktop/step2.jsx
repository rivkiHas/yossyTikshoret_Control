'use client';
import { Tab } from '@headlessui/react'
import AddressSearchMap from '../address_search_map';
import HoursOpen from '../hours_open';
import HoursOpenMobile from '../hours_open_mobile';
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, setActiveStep } from "../../store/step_store";
import { addBrunch, removeBrunch, setActiveBrunch } from "../../store/brunch_store";
import { Button } from "../ui/button";
import { ArrowLongLeftIcon, PlusCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import IconButton from '../icon_button';
import { useState, useEffect } from 'react';
import { AlertDialogEdit } from '../alert_dialog_edit'
import Carusel from "../carusel";
import { useFormikContext } from 'formik';


export default function StepTwo({ brunch: propBrunch }) {
    const dispatch = useDispatch();
    const brunches = useSelector((state) => state.brunch.brunches);
    const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer)
    const activeStep = useSelector((state) => state.stepper.activeStep)
    const activeBrunch = useSelector((state) => state.brunch.activeBrunch);
    const formik = useFormikContext();
    const [forceValidate, setForceValidate] = useState(false);

    const brunch = propBrunch || brunches.find(b => b.id === activeBrunch);

    useEffect(() => {
        if (propBrunch && propBrunch.id && propBrunch.id !== activeBrunch) {
            dispatch(setActiveBrunch(propBrunch.id));
        }
    }, [propBrunch, activeBrunch]);

    const [showDialog, setShowDialog] = useState(false);
    const [newBranchName, setNewBranchName] = useState('');


    const nextStepInRedux = async () => {
        formik.validateForm().then((errors) => {
            console.log("formik errors:", errors);
            console.log("formik values:", formik.values);
            if (Object.keys(errors).length === 0) {

                if (brunches.length === 1) {
                    dispatch(setActiveStep(activeStep + 1));
                } else {
                    const currentBrunchIndex = brunches.findIndex(b => b.id === activeBrunch);
                    if (currentBrunchIndex < brunches.length - 1) {
                        const nextBrunch = brunches[currentBrunchIndex + 1];
                        dispatch(setActiveBrunch(nextBrunch.id));
                        dispatch(setActiveStep(2 + currentBrunchIndex + 1));
                    } else {
                        dispatch(setActiveStep(2 + brunches.length));
                    }
                }
            } else {
                formik.setTouched(
                    Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
                );
            }
        });
    };


    const previousStepInRedux = () => {
        if (brunches.length === 1) {
            dispatch(setActiveStep(activeStep - 1));
        } else {
            const currentBrunchIndex = brunches.findIndex(b => b.id === activeBrunch);
            if (currentBrunchIndex > 0) {
                const prevBrunch = brunches[currentBrunchIndex - 1];
                dispatch(setActiveBrunch(prevBrunch.id));
                dispatch(setActiveStep(2 + currentBrunchIndex - 1));
            } else {
                dispatch(setActiveStep(0));
            }
        }
    };

    const handleAddBranchClick = () => {
        setShowDialog(true);
    };

    const handleConfirmAddBranch = () => {
        const newId = Math.max(...brunches.map(b => b.id), 0) + 1;
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
        <div className="flex justify-center">
            <div className="flex flex-col w-full max-w-[1440px] lg:px-[20px] lg:py-[30px] items-end">
                <div className="flex flex-col lg:flex-row w-full h-full lg:gap-[30px]">
                    <div className="flex flex-col lg:flex-row w-full h-full lg:gap-8">
                        <div className="flex flex-col w-full h-full lg:p-4 p-5">
                            <AddressSearchMap typeMarketer={typeMarketer} />
                        </div>
                        <div className='lg:p-5 p-5 w-full'>
                            <div className="flex flex-col h-full bg-white rounded-[40px]">
                                <div className="hidden lg:block">
                                    <HoursOpen typeMarketer={typeMarketer} />
                                </div>
                                <div className="block lg:hidden">
                                    <HoursOpenMobile typeMarketer={typeMarketer} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-end justify-between px-8">
                    {typeMarketer === "store" && (
                        <div className="hidden lg:flex flex-row gap-4">
                            <Button onClick={handleAddBranchClick}
                                className="cursor-pointer bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full"
                            >
                                <PlusCircleIcon className="w-5 h-5" />
                                הוספת סניף נוסף
                            </Button>
                            {brunches.length > 1 && brunch && (
                                <IconButton
                                    headerText="מחיקה"
                                    onConfirm={() => handleDeleteConfirmation(brunch)}
                                    contactId={brunch.id}
                                    text="האם ברצונך למחוק את הסניף הזה?"
                                />
                            )}
                        </div>
                    )}

                    {typeMarketer === "agent" && (
                        <div className="hidden lg:block lg:w-[43%]">
                            <Carusel activeBrunch={activeBrunch} />
                        </div>
                    )}

                    <div className="hidden lg:flex gap-4">
                        <Button onClick={previousStepInRedux}
                            className="cursor-pointer flex items-center bg-white text-black border border-[#F8BD00]  p-5 gap-3 rounded-full hover:bg-white hover:text-black hover:border-black"
                        >
                            <ArrowLongRightIcon className="w-5 h-5" />
                            שלב קודם
                        </Button>
                        <Button onClick={nextStepInRedux}
                            className="cursor-pointer flex items-center gap-2 bg-yellow-400 text-black p-5 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#F8BD03]">
                            שלב הבא
                            <ArrowLongLeftIcon className="w-5 h-5" />
                        </Button>
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
        </div>
    );
}