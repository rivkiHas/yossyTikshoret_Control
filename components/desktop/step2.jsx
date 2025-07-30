'use client'
import { ArrowLongLeftIcon, ArrowLongRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBrunch, removeBrunch, setActiveBrunch } from '../../store/brunch_store'
import { setActiveStep } from '../../store/step_store'
import AddressSearchMap from '../address_search_map'
import { AlertDialogEdit } from '../alert_dialog_edit'
import Carusel from '../carusel'
import HoursOpen from '../hours_open'
import HoursOpenMobile from '../hours_open_mobile'
import IconButton from '../icon_button'
import { Button } from '../ui/button'

export default function StepTwo({ brunch: propBrunch }) {
  const dispatch = useDispatch()
  const brunches = useSelector((state) => state.brunch.brunches)
  const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer)
  const activeStep = useSelector((state) => state.stepper.activeStep)
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch)
  const formik = useFormikContext()
  const [forceValidate, setForceValidate] = useState(false)

  const brunch = propBrunch || brunches.find((b) => b.id === activeBrunch)

  useEffect(() => {
    if (propBrunch && propBrunch.id && propBrunch.id !== activeBrunch) {
      dispatch(setActiveBrunch(propBrunch.id))
    }
  }, [propBrunch, activeBrunch])

  const [showDialog, setShowDialog] = useState(false)
  const [newBranchName, setNewBranchName] = useState('')

  const nextStepInRedux = async () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        if (brunches.length === 1) {
          dispatch(setActiveStep(activeStep + 1))
        } else {
          const currentBrunchIndex = brunches.findIndex((b) => b.id === activeBrunch)
          if (currentBrunchIndex < brunches.length - 1) {
            const nextBrunch = brunches[currentBrunchIndex + 1]
            dispatch(setActiveBrunch(nextBrunch.id))
            dispatch(setActiveStep(2 + currentBrunchIndex + 1))
          } else {
            dispatch(setActiveStep(2 + brunches.length))
          }
        }
      } else {
        formik.setTouched(Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
        formik.setErrors(errors)
        setForceValidate((prev) => !prev)
        console.log('Validation errors:', errors) // Log validation errors for debugging;
        
      }
    })
  }

  const previousStepInRedux = () => {
    if (brunches.length === 1) {
      dispatch(setActiveStep(activeStep - 1))
    } else {
      const currentBrunchIndex = brunches.findIndex((b) => b.id === activeBrunch)
      if (currentBrunchIndex > 0) {
        const prevBrunch = brunches[currentBrunchIndex - 1]
        dispatch(setActiveBrunch(prevBrunch.id))
        dispatch(setActiveStep(2 + currentBrunchIndex - 1))
      } else {
        dispatch(setActiveStep(0))
      }
    }
  }

  const handleAddBranchClick = () => {
    setShowDialog(true)
  }

  const handleConfirmAddBranch = () => {
    const newId = Math.max(...brunches.map((b) => b.id), 0) + 1
    const newBrunch = {
      id: newId,
      name: newBranchName || `${brunches.length + 1}`,
      address: '',
      location: {
        lat: 32.0853,
        lng: 34.7818,
      },
      hoursOpen: [
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
      ],
    }

    dispatch(addBrunch(newBrunch))
    dispatch(setActiveBrunch(newId))
    const newBrunchIndex = brunches.length
    dispatch(setActiveStep(2 + newBrunchIndex))
    setShowDialog(false)
    setNewBranchName('')
  }

  const handleDeleteConfirmation = (brunch) => {
    if (brunches.length > 1) {
      const brunchIndex = brunches.findIndex((b) => b.id === brunch.id)
      dispatch(removeBrunch(brunch.id))
      if (brunchIndex > 0) {
        const prevBrunch = brunches[brunchIndex - 1]
        dispatch(setActiveBrunch(prevBrunch.id))
        dispatch(setActiveStep(2 + brunchIndex - 1))
      } else if (brunches.length > 1) {
        const nextBrunch = brunches[1]
        dispatch(setActiveBrunch(nextBrunch.id))
        dispatch(setActiveStep(2))
      } else {
        dispatch(setActiveStep(1))
      }
    } else {
      console.log('לא ניתן למחוק, חייב להיות לפחות סניף אחד')
    }
  }

  if (!brunch) {
    return null
  }

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1440px] flex-col items-end lg:px-[20px] lg:py-[30px]">
        <div className="flex h-full w-full flex-col lg:flex-row lg:gap-[30px]">
          <div className="flex h-full w-full flex-col lg:flex-row lg:gap-8">
            <div className="flex h-full w-full flex-col p-5 lg:p-4">
              <AddressSearchMap typeMarketer={typeMarketer} />
            </div>
            <div className="w-full p-5 lg:p-5">
              <div className="flex h-full flex-col rounded-[40px] bg-white">
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
          {typeMarketer === 'store' && (
            <div className="hidden flex-row gap-4 lg:flex">
              <Button
                onClick={handleAddBranchClick}
                className="cursor-pointer gap-2 rounded-full border bg-black p-5 text-white hover:border-black hover:bg-white hover:text-black"
              >
                <PlusCircleIcon className="h-5 w-5" />
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

          {typeMarketer === 'agent' && (
            <div className="hidden lg:block lg:w-[43%]">
              <Carusel activeBrunch={activeBrunch} />
            </div>
          )}

          <div className="hidden gap-4 lg:flex">
            <Button
              onClick={previousStepInRedux}
              className="flex cursor-pointer items-center gap-3 rounded-full border border-[#F8BD00] bg-white p-5 text-black hover:border-black hover:bg-white hover:text-black"
            >
              <ArrowLongRightIcon className="h-5 w-5" />
              שלב קודם
            </Button>
            <Button
              onClick={nextStepInRedux}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-transparent bg-yellow-400 p-5 text-black hover:border-[#F8BD03] hover:bg-white hover:text-black"
            >
              שלב הבא
              <ArrowLongLeftIcon className="h-5 w-5" />
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
  )
}
