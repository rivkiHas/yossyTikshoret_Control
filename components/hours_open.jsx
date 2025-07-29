'use client'

import { Switch } from '@/components/ui/switch'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBrunchDetails } from '../store/brunch_store'
import CustomTimeInput from './custom_time_input'
import TooltipValid from './tooltip_valid'
import { Typography } from './typhography'

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

const HoursOpen = ({ typeMarketer }) => {
  const dispatch = useDispatch()
  const [isGrouped, setIsGrouped] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const brunches = useSelector((state) => state.brunch.brunches)
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch)
  const brunch = brunches.find((b) => b.id === activeBrunch) || null
  const [localHoursOpen, setLocalHoursOpen] = useState([])
  const [errors, setErrors] = useState({})
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
    if (index === undefined || index === null) return

    let updatedHours = JSON.parse(JSON.stringify(localHoursOpen))

    if (!isGrouped && index === 1) {
      const daysToUpdate = [1, 2, 3, 4, 5]
      daysToUpdate.forEach((dayIndex) => {
        if (!updatedHours[dayIndex]) updatedHours[dayIndex] = { morning: {}, evening: {} }
        if (!updatedHours[dayIndex][period]) updatedHours[dayIndex][period] = {}
        updatedHours[dayIndex][period][type] = value
      })
    } else {
      if (!updatedHours[index]) updatedHours[index] = { morning: {}, evening: {} }
      if (!updatedHours[index][period]) updatedHours[index][period] = {}
      updatedHours[index][period][type] = value
    }

    setLocalHoursOpen(updatedHours)
    const validationErrors = validateHours(updatedHours)
    setErrors(validationErrors)

    if (brunch && Object.keys(validationErrors).length === 0) {
      dispatch(
        updateBrunchDetails({
          id: brunch.id,
          hoursOpen: updatedHours,
        })
      )
    }
  }

  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked)
  }

  return (
    <div className="flex h-full w-full flex-col rounded-[40px] bg-white">
      {formik.touched?.brunches?.[activeBrunch]?.hoursOpen?.[1]?.morning?.open &&
        formik.errors?.brunches?.[activeBrunch]?.hoursOpen?.[1]?.morning?.open && (
          <TooltipValid message={formik.errors.brunches[activeBrunch].hoursOpen} />
        )}

      <div className="mb-4 flex flex-row justify-between">
        <Typography className="text-2xl font-bold">
          {typeMarketer === 'agent' ? 'שעות זמינות  ' : 'שעות פתיחה '}
        </Typography>
        <button
          onClick={() => setIsGrouped((prev) => !prev)}
          type="button"
          className="group flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00] transition-all delay-1000 duration-500 ease-out hover:w-auto hover:flex-row-reverse hover:rounded-3xl hover:px-3"
        >
          <PencilSquareIcon className="h-5 w-5" />
          <span className="hidden text-base font-bold text-black opacity-0 transition-opacity delay-[1500ms] duration-300 ease-in-out group-hover:inline-block group-hover:opacity-100">
            {isGrouped ? ' עריכת שעות פתיחה' : '  עריכת שעות פתיחה'}
          </span>
        </button>
      </div>

      <div className="mb-5 w-fit rounded-4xl bg-[#F4F4F4] p-2">
        <div dir="ltr" className="flex w-fit items-center gap-2">
          <span className="text-sm font-semibold text-[#111928]">שעות בתיאום מראש</span>
          <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} className={'cursor-pointer duration-300'} />
        </div>
      </div>

      <div className="relative flex-1">
        {isSwitchOn && (
          <div className="absolute inset-0 bottom-[0.989px] left-[30.16px] z-10 bg-white/30 backdrop-blur-xs" />
        )}

        <div className="lg:scrollbar-custom flex h-full flex-col overflow-visible text-[22px] font-semibold text-[#F8BD00] lg:max-h-[400px] lg:overflow-y-auto">
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
              <div key={idx}>
                <DayRow
                  day={day}
                  label={`יום ${day}`}
                  hours={localHoursOpen?.[idx + 1]}
                  errors={errors?.[idx + 1]}
                  handleChange={handleChange}
                  index={idx + 1}
                  disabled={isSwitchOn}
                />
              </div>
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
    </div>
  )
}

const DayRow = ({
  day,
  label,
  hours,
  handleChange,
  errors,
  index,
  disabled,
  isFriday = false,
  forceHideEvening = false,
}) => {
  const [isEveningVisible, setIsEveningVisible] = useState(false)

  const toggleEvening = () => {
    setIsEveningVisible((prev) => !prev)
  }

  return (
    <div className="group relative mb-4 flex-shrink-0 rounded-xl bg-white lg:w-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Typography className="mb-2 text-left text-[24px] font-bold text-[#F8BD00]">{label}</Typography>
          {isEveningVisible && <span className="text-left text-sm text-black"> בוקר</span>}
        </div>
        <div className="flex flex-row-reverse items-center justify-start gap-5 rounded-xl">
          {!isFriday && (
            <button
              onClick={toggleEvening}
              disabled={disabled}
              className="group cursor-pointer duration-300 outline-none hover:rotate-90"
            >
              {!isEveningVisible ? (
                <PlusCircleIcon className="h-[40px] w-[40px] fill-black stroke-white text-white hover:fill-[#F8BD00]" />
              ) : (
                <div className="h-[40px] w-[40px]" />
              )}
            </button>
          )}
          <div className={`flex flex-row items-end gap-3 ${isFriday ? 'ml-[60px]' : ''}`}>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת פתיחה</label>
              <InputTime
                value={hours?.morning?.open || ''}
                onChange={(e) => handleChange(day, 'morning', 'open', e.target.value, index)}
                disabled={disabled}
                error={errors?.morning?.open}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת סגירה</label>
              <InputTime
                value={hours?.morning?.close || ''}
                onChange={(e) => handleChange(day, 'morning', 'close', e.target.value, index)}
                disabled={disabled}
                error={errors?.morning?.close}
              />
            </div>
          </div>
        </div>
      </div>
      {isEveningVisible && !isFriday && (
        <div className="mt-2 flex flex-row-reverse items-center justify-start gap-4 rounded-xl">
          {' '}
          {/* Added margin-top */}
          <button
            onClick={toggleEvening}
            disabled={disabled}
            className="group cursor-pointer duration-300 outline-none hover:rotate-90"
          >
            <MinusCircleIcon className="h-[40px] w-[40px] fill-black stroke-white text-white hover:fill-[#F8BD00]" />
          </button>
          <div className="flex flex-row items-end gap-3">
            <div className="self-center p-5 text-start">
              <span className="text-sm text-black">ערב</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת פתיחה</label>
              <InputTime
                value={hours?.evening?.open || ''}
                onChange={(e) => handleChange(day, 'evening', 'open', e.target.value, index)}
                disabled={disabled}
                error={errors?.evening?.open}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">שעת סגירה</label>
              <InputTime
                value={hours?.evening?.close || ''}
                onChange={(e) => handleChange(day, 'evening', 'close', e.target.value, index)}
                disabled={disabled}
                error={errors?.evening?.close}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const InputTime = ({ onChange, value, disabled, error }) => (
  <div className="flex min-h-[70px] flex-col">
    <CustomTimeInput value={value} onChange={onChange} disabled={disabled} error={error} />
  </div>
)

export default HoursOpen
