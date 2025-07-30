'use client'

import { Switch } from '@/components/ui/switch'
import { updateBrunchDetails } from '@/store/brunch_store'
import { PlusCircleIcon as PlusCircleIconToButton } from '@heroicons/react/24/outline'
import { MinusCircleIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from './typhography'
import { addBrunch, setActiveBrunch } from '../store/brunch_store'
import { setActiveStep } from '../store/step_store'
import { AlertDialogEdit } from './alert_dialog_edit'
import CustomTimeInput from './custom_time_input'
import { Button } from './ui/button'
import { useFormikContext } from 'formik'

const validateHours = (hoursData) => {
  const newErrors = {}

  hoursData.forEach((dayHours, index) => {
    if (!dayHours) return

    const dayErrors = {}
    const { morning, evening } = dayHours

    if (!morning?.open) {
      dayErrors.morning = { ...(dayErrors.morning || {}), open: 'שעת פתיחה חובה' }
    }
    if (!morning?.close) {
      dayErrors.morning = { ...(dayErrors.morning || {}), close: 'שעת סגירה חובה' }
    }

    if ((evening?.open && !evening?.close) || (!evening?.open && evening?.close)) {
      if (!evening?.open) {
        dayErrors.evening = { ...(dayErrors.evening || {}), open: 'שעת פתיחה חובה' }
      }
      if (!evening?.close) {
        dayErrors.evening = { ...(dayErrors.evening || {}), close: 'שעת סגירה חובה' }
      }
    }

    if (morning?.open && morning?.close && morning.open >= morning.close) {
      dayErrors.morning = {
        ...dayErrors.morning,
        open: 'שעת פתיחה חייבת להיות לפני שעת סגירה',
        close: 'שעת סגירה חייבת להיות אחרי שעת פתיחה',
      }
    }

    if (evening?.open && evening?.close && evening.open >= evening.close) {
      dayErrors.evening = {
        ...dayErrors.evening,
        open: 'שעת פתיחה חייבת להיות לפני שעת סגירה',
        close: 'שעת סגירה חייבת להיות אחרי שעת פתיחה',
      }
    }

    if (Object.keys(dayErrors).length > 0) {
      newErrors[index] = dayErrors
    }
  })

  return newErrors
}

const HoursOpenMobile = ({ typeMarketer }) => {

  const dispatch = useDispatch()
  const [isGrouped, setIsGrouped] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const brunches = useSelector((state) => state.brunch.brunches)
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch)
  const brunch = brunches.find((b) => b.id === activeBrunch) || null
  const [localHoursOpen, setLocalHoursOpen] = useState([])
  const [errors, setErrors] = useState({})
  const [showDialog, setShowDialog] = useState(false)
  const [newBranchName, setNewBranchName] = useState('')
  const formik = useFormikContext()

  useEffect(() => {
    const initialHours = Array.from({ length: 7 }, () => ({
      morning: { open: '', close: '' },
      evening: { open: '', close: '' },
    }))

    if (brunch?.hoursOpen) {
      const parsedHours = JSON.parse(JSON.stringify(brunch.hoursOpen))
      parsedHours.forEach((day, index) => {
        if (day) {
          initialHours[index] = { ...initialHours[index], ...day }
        }
      })
      setLocalHoursOpen(initialHours)
      setErrors(validateHours(initialHours))
    } else {
      setLocalHoursOpen(initialHours)
    }
  }, [brunch])

  const handleChange = (day, period, type, value, index) => {
    if (index === undefined || index === null) return;

    let updatedHours = JSON.parse(JSON.stringify(localHoursOpen));

    if (!isGrouped && index === 1) {
      const daysToUpdate = [0, 1, 2, 3, 4, 5];
      daysToUpdate.forEach((dayIndex) => {
        if (!updatedHours[dayIndex]) updatedHours[dayIndex] = { morning: {}, evening: {} };
        if (!updatedHours[dayIndex][period]) updatedHours[dayIndex][period] = {};
        updatedHours[dayIndex][period][type] = value;
      });
    } else {
      if (!updatedHours[index]) updatedHours[index] = { morning: {}, evening: {} };
      if (!updatedHours[index][period]) updatedHours[index][period] = {};
      updatedHours[index][period][type] = value;
    }

    setLocalHoursOpen(updatedHours);

    const validationErrors = validateHours(updatedHours);
    setErrors(validationErrors);
    formik.setFieldValue(`brunches[${activeBrunch}].hoursOpen`, updatedHours);
    dispatch(updateBrunchDetails({
      id: brunch.id,
      hoursOpen: updatedHours,
    }));
  };


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

  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked)
  }

  return (
    <div className="flex h-full w-full flex-col rounded-[40px] bg-white p-6">
      <div className="mb-4 flex flex-row justify-between">
        <Typography className="text-2xl font-bold">
          {typeMarketer === 'agent' ? 'שעות זמינות' : 'שעות פתיחה'}
        </Typography>
        <button
          onClick={() => setIsGrouped((prev) => !prev)}
          type="button"
          className="group flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00]"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-5 w-fit rounded-4xl bg-[#F4F4F4] p-2">
        <div dir="ltr" className="flex w-fit items-center gap-2">
          <span className="text-sm font-semibold text-[#111928]">שעות בתיאום מראש</span>
          <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} className="cursor-pointer duration-300" />
        </div>
      </div>

      <div className="relative flex-1">
        {isSwitchOn && (
          <div className="absolute inset-0 bottom-[0.989px] left-[30.16px] z-10 bg-white/30 backdrop-blur-xs" />
        )}
        <div className="lg:scrollbar-custom flex h-full flex-col text-[22px] font-semibold text-[#F8BD00] lg:max-h-[400px] lg:overflow-y-auto">
          {!isGrouped ? (
            <DayRow
              day="weekdays"
              label="ימים א'-ה'"
              hours={localHoursOpen?.[1]}
              errors={errors?.[1]}
              handleChange={handleChange}
              index={1}
              disabled={isSwitchOn}
            />
          ) : (
            ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'].map((day, idx) => (
              <DayRow
                key={idx}
                day={day}
                label={`יום ${day}`}
                hours={localHoursOpen?.[idx + 1]}
                errors={errors?.[idx + 1]}
                handleChange={handleChange}
                index={idx + 1}
                disabled={isSwitchOn}
              />
            ))
          )}
          <DayRow
            day="שישי"
            label="יום שישי"
            hours={localHoursOpen?.[6]}
            errors={errors?.[6]}
            handleChange={handleChange}
            index={6}
            disabled={isSwitchOn}
            isFriday={true}
          />
        </div>
      </div>
      <Button
        onClick={handleAddBranchClick}
        className="cursor-pointer gap-2 rounded-full border bg-black p-5 text-white hover:border-black hover:bg-white hover:text-black"
      >
        <PlusCircleIconToButton className="h-5 w-5" />
        הוספת סניף נוסף
      </Button>
      <AlertDialogEdit
        open={showDialog}
        value={newBranchName}
        onChange={setNewBranchName}
        onConfirm={handleConfirmAddBranch}
        onCancel={() => setShowDialog(false)}
      />
    </div>
  )
}

const DayRow = ({ day, label, hours, handleChange, errors, index, disabled, isFriday = false }) => {
  const [isEveningVisible, setIsEveningVisible] = useState(false)

  const toggleEvening = () => {
    setIsEveningVisible((prev) => !prev)
  }
  return (
    <div className="mb-4 flex-shrink-0 rounded-xl bg-white">
      <div className={`mb-2 flex items-center ${isFriday ? 'justify-start pr-12' : 'justify-around'}`}>
        <Typography className="text-[24px] font-bold text-[#F8BD00]">{label}</Typography>
        {!isFriday && (
          <button onClick={toggleEvening} disabled={disabled} className="cursor-pointer outline-none">
            {isEveningVisible ? (
              <MinusCircleIcon className="h-[30px] w-[30px] text-black hover:text-[#F8BD00]" />
            ) : (
              <PlusCircleIcon className="h-[30px] w-[30px] text-black hover:text-[#F8BD00]" />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gap-3">
        {isEveningVisible ? <label className="w-full pr-7 text-right text-sm text-black">שעות בוקר</label> : null}
        <div className="flex justify-between gap-8">
          <InputTimeBlock
            label="שעת פתיחה"
            value={hours?.morning?.open}
            onChange={(e) => handleChange(day, 'morning', 'open', e.target.value, index)}
            disabled={disabled}
            error={errors?.morning?.open}
          />
          <InputTimeBlock
            label="שעת סגירה"
            value={hours?.morning?.close}
            onChange={(e) => handleChange(day, 'morning', 'close', e.target.value, index)}
            disabled={disabled}
            error={errors?.morning?.close}
          />
        </div>

        {isEveningVisible && (
          <>
            <label className="mt-3 mb-1 text-sm text-black">שעות ערב</label>
            <div className="flex gap-8">
              <InputTimeBlock
                label="שעת פתיחה"
                value={hours?.evening?.open}
                onChange={(e) => handleChange(day, 'evening', 'open', e.target.value, index)}
                disabled={disabled}
                error={errors?.evening?.open}
              />
              <InputTimeBlock
                label="שעת סגירה"
                value={hours?.evening?.close}
                onChange={(e) => handleChange(day, 'evening', 'close', e.target.value, index)}
                disabled={disabled}
                error={errors?.evening?.close}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const InputTimeBlock = ({ label, value, onChange, disabled, error }) => (
  <div className="flex min-h-[70px] flex-col">
    <label className="text-sm text-black">{label}</label>
    <CustomTimeInput value={value || ''} onChange={onChange} disabled={disabled} error={error} />
  </div>
)

export default HoursOpenMobile
