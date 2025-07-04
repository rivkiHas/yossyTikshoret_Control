'use client';
import { Tab } from '@headlessui/react'
import AddressSearchMap from '../address_search_map';
import HoursOpen from '../hours_open';
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

    const brunch = propBrunch || brunches.find(b => b.id === activeBrunch);

    useEffect(() => {
        if (propBrunch && propBrunch.id && propBrunch.id !== activeBrunch) {
            dispatch(setActiveBrunch(propBrunch.id));
        }
    }, [propBrunch, activeBrunch, dispatch]);

    // Sync Redux brunches with Formik
    useEffect(() => {
        const formikBrunches = brunches.map(b => ({
            name: b.name || '',
            address: b.address || '',
            location: b.location || { lat: '', lng: '' },
            hoursOpen: b.hoursOpen || []
        }));
        
        formik.setFieldValue('brunches', formikBrunches);
    }, [brunches]);

    const [showDialog, setShowDialog] = useState(false);
    const [newBranchName, setNewBranchName] = useState('');

    const nextStepInRedux = () => {
        // Validate current step but don't block navigation
        formik.validateForm().then(() => {
            // Update Formik with current branch data
            const currentBranchData = {
                ...formik.values,
                brunches: brunches.map(b => ({
                    name: b.name || '',
                    address: b.address || '',
                    location: b.location || { lat: '', lng: '' },
                    hoursOpen: b.hoursOpen || []
                }))
            };
            formik.setValues(currentBranchData);

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
            weekday: { morning: { open: "", close: "" }, evening: { open: "", close: "" } }
        };
        dispatch(addBrunch(newBrunch));
        dispatch(setActiveBrunch(newId));
        const newBrunchIndex = brunches.length;
        dispatch(setActiveStep(2 + newBrunchIndex));
        
        // Add to Formik
        const newFormikBranch = {
            name: newBrunch.name,
            address: newBrunch.address,
            location: newBrunch.location,
            hoursOpen: newBrunch.hoursOpen
        };
        formik.setFieldValue('brunches', [...formik.values.brunches, newFormikBranch]);
        
        setShowDialog(false);
        setNewBranchName('');
    };

    const handleDeleteConfirmation = (brunch) => {
        if (brunches.length > 1) {
            const brunchIndex = brunches.findIndex(b => b.id === brunch.id);
            dispatch(removeBrunch(brunch.id));

            // Remove from Formik
            const updatedBrunches = formik.values.brunches.filter((_, index) => index !== brunchIndex);
            formik.setFieldValue('brunches', updatedBrunches);

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

    // Check for validation errors in current branch
    const currentBranchIndex = brunches.findIndex(b => b.id === activeBrunch);
    const branchErrors = formik.errors.brunches?.[currentBranchIndex];
    const hasErrors = branchErrors && Object.keys(branchErrors).length > 0;

    return (
        <div className="flex justify-center ">
            <div className="flex flex-col items-end w-full max-w-[1440px] px-[20px] py-[30px]">
                <div className="flex flex-col lg:flex-row w-full h-full gap-[24px] lg:gap-[36px]">
                    <div className="flex flex-col lg:flex-row w-full h-full gap-6">
                        <div className="flex flex-col lg:w-1/2 w-full h-full">
                            <AddressSearchMap typeMarketer={typeMarketer} />
                        </div>

                        <div className="flex flex-col lg:w-1/2 w-full h-full lg:h-auto p-4 bg-white rounded-[40px]">
                            <HoursOpen typeMarketer={typeMarketer} />
                            <Button onClick={handleAddBranchClick}
                                className="lg:hidden cursor-pointer bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full"
                            >
                                <PlusCircleIcon className="w-5 h-5" />
                                הוספת סניף נוסף
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-center justify-between mt-8">
                    {typeMarketer === "חנות" ? (
                        <div className='hidden lg:flex flex-row gap-4'>
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
                    ) : (
                        <Carusel activeBrunch={activeBrunch} />
                    )}

                    <div className="hidden lg:flex gap-4">
                        <Button onClick={previousStepInRedux}
                            className="cursor-pointer flex items-center bg-white text-black border border-[#F8BD00]  p-5 gap-3 rounded-full hover:bg-white hover:text-black hover:border-black"
                        >
                            <ArrowLongRightIcon className="w-5 h-5" />
                            שלב קודם
                        </Button>
                        <Button 
                            onClick={nextStepInRedux}
                            className={`cursor-pointer flex items-center gap-2 p-5 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#F8BD03] ${
                                hasErrors ? 'bg-orange-400 text-black border-orange-500' : 'bg-yellow-400 text-black'
                            }`}
                        >
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