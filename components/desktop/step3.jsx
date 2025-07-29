'use client'

import axios from '@/lib/axios'
import { ArrowLongLeftIcon, ArrowLongRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useFormikContext } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContactMan, deleteContactMan } from '../../store/contact_man_store'
import { nextStep, setActiveStep } from '../../store/step_store'
import AlertSuccess from '../alert_sucsses'
import { RegisterForm2 } from '../register_form2'
import TooltipValid from '../tooltip_valid'
import { Button } from '../ui/button'

export default function StepThree() {
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormikContext()
  const activeStep = useSelector((state) => state.stepper.activeStep)
  const [validators, setValidators] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const user = useSelector((state) => state.form.pertip)
  const brunches = useSelector((state) => state.brunch.brunches)
  const contactMans = useSelector((state) => state.conectMan.contactMans || [])
  const salesMap = {
    קווי: 1,
    סלולרי: 2,
    רכבים: 3,
  }
  const resellerTypeIds = user.typeSales.map((sale) => salesMap[sale])

  const sendDataToServer = async () => {
    const payload = {
      business_name: user.name,
      email: user.email,
      tax_id: user.id,
      phone: user.phone,
      type: user.typeMarketer,
      reseller_type_id: resellerTypeIds,
      brunches: brunches.map((b) => ({
        address: b.address,
        brunchName: b.name,
        hours_open: b.hoursOpen.map((day) => ({
          morning: {
            open: {
              open: day.morning.open,
              close: day.morning.close,
            },
          },
          evening: {
            open: {
              open: day.evening.open,
              close: day.evening.close,
            },
          },
        })),
      })),
      contact: contactMans.map((c) => ({
        contactName: c.contactName,
        contactPhone: c.contactPhone,
        contactEmail: c.contactEmail,
        contactRole: c.contactRole,
      })),
    }
    console.log(payload, 'payload')

    try {
      const csrf = () => axios.get('/sanctum/csrf-cookie')
      await csrf()
      const response = await axios.post('/api/register', payload)
      return response.data
    } catch (error) {
      let errorMsg = 'שגיאה בשליחת הנתונים לשרת'

      if (error.response) {
        const status = error.response.status
        const data = error.response.data

        switch (status) {
          case 400:
            errorMsg = data.message || 'נתונים לא תקינים'
            break
          case 401:
            errorMsg = 'שגיאת הרשאה - אנא התחבר מחדש'
            break
          case 422:
            if (data.errors) {
              const serverErrors = Object.values(data.errors).flat()
              errorMsg = serverErrors.join(', ')
            } else {
              errorMsg = data.message || 'שגיאת תקינות נתונים'
            }
            break
          case 500:
            errorMsg = 'שגיאת שרת פנימית - אנא נסה שוב מאוחר יותר'
            break
          default:
            errorMsg = data.message || `שגיאה ${status}`
        }
      } else if (error.request) {
        errorMsg = 'שגיאת חיבור לשרת - אנא בדק את החיבור לאינטרנט'
      } else {
        errorMsg = error.message || 'שגיאה לא צפויה'
      }

      throw new Error(errorMsg)
    }
  }

  const nextStepInRedux = async () => {
    const errors = await formik.validateForm()

    if (Object.keys(errors).length === 0) {
      setFormErrors({})
      if (activeStep >= 2) {
        setIsLoading(true)
        try {
          await sendDataToServer()
          dispatch(nextStep())
          setShowAlert(true)
          return null
        } catch (error) {
          alert(`שגיאה בשליחה לשרת: ${error.message}`)
          return { server: error.message }
        } finally {
          setIsLoading(false)
        }
      } else {
        dispatch(nextStep())
        return null
      }
    } else {
      setFormErrors(errors)

      const createTouchedFromErrors = (errorsObj) => {
        const touched = {}

        Object.keys(errorsObj).forEach((key) => {
          const errorValue = errorsObj[key]

          if (Array.isArray(errorValue)) {
            touched[key] = errorValue.map((itemError, index) => {
              if (typeof itemError === 'object' && itemError !== null) {
                const itemTouched = {}
                Object.keys(itemError).forEach((field) => {
                  itemTouched[field] = true
                })
                return itemTouched
              }
              return true
            })
          } else if (typeof errorValue === 'object' && errorValue !== null) {
            touched[key] = createTouchedFromErrors(errorValue)
          } else {
            touched[key] = true
          }
        })

        return touched
      }

      const touchedFields = createTouchedFromErrors(errors)

      if (touchedFields.contactMans && Array.isArray(touchedFields.contactMans)) {
        touchedFields.contactMans.forEach((contactTouched, index) => {
          if (contactTouched && typeof contactTouched === 'object') {
            Object.keys(contactTouched).forEach((field) => {
              const fieldPath = `contactMans[${index}].${field}`
              formik.setFieldTouched(fieldPath, true)
            })
          }
        })
      }

      Object.keys(touchedFields).forEach((key) => {
        if (!Array.isArray(touchedFields[key])) {
          formik.setFieldTouched(key, true)
        }
      })

      return errors
    }
  }

  const previousStepInRedux = () => {
    dispatch(setActiveStep(activeStep - 1))
  }

  const addContactManHandler = () => {
    dispatch(addContactMan())
  }

  const handleDeleteConfirmation = (contactId) => {
    if (contactMans.length > 1) {
      dispatch(deleteContactMan(contactId))
    } else {
      console.log('לא ניתן למחוק, חייב להיות לפחות איש קשר אחד')
      setErrorMessage('לא ניתן למחוק, חייב להיות לפחות איש קשר אחד')
      setShowErrorAlert(true)
    }
  }

  const closeErrorAlert = () => {
    setShowErrorAlert(false)
    setErrorMessage('')
  }

  return (
    <div className="direction-rtl flex max-w-[1440px] flex-col gap-6 p-5 pb-35 lg:pb-0">
      <div className="grid w-full grid-cols-1 justify-center md:grid-cols-1 lg:h-[60vh] lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-col gap-6 lg:gap-6 lg:pr-2">
          {contactMans.map((x) => (
            <div key={x.id} className="flex w-full justify-start gap-10 rounded-[40px] bg-white p-4">
              <RegisterForm2
                contactId={x.id}
                canDelete={contactMans.length > 1}
                OkFunction={handleDeleteConfirmation}
                setValidator={(fn) => {
                  setValidators((prev) => ({ ...prev, [x.id]: fn }))
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 hidden w-full justify-between px-8 lg:flex">
        <Button
          onClick={addContactManHandler}
          className="cursor-pointer gap-2 rounded-full border bg-black p-5 text-white hover:border-black hover:bg-white hover:text-black"
        >
          <PlusCircleIcon />
          הוספת איש קשר נוסף
        </Button>

        <div className="hidden gap-4 lg:flex">
          <Button
            onClick={previousStepInRedux}
            className="flex cursor-pointer items-center gap-3 rounded-full border border-[#F8BD00] bg-white p-5 text-black hover:border-black hover:bg-white hover:text-black"
          >
            <ArrowLongRightIcon />
            שלב קודם
          </Button>

          <div className="relative mx-auto w-full max-w-[300px]">
            {Object.keys(formErrors).length > 0 && (
              <TooltipValid
                tooltipText={
                  'לא מילאת את כל השדות בטופס.\n' +
                  Object.keys(formErrors)
                    .map((field) => {
                      if (field === 'pertip') return 'שלב 1 - פרטי העסק'
                      if (field === 'brunches') return 'שלב 2 - סניפים'
                      if (field === 'contactMans') return 'שלב 3 - אנשי קשר'
                      return field
                    })
                    .join(', ')
                }
                className="absolute -top-18 right-0 mb-3 w-max max-w-[200px]"
              />
            )}

            <Button
              onClick={nextStepInRedux}
              disabled={isLoading}
              className="relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-black bg-white p-5 text-black shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-right-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-[#F8BD00] before:transition-all before:duration-500 before:ease-in-out hover:scale-105 hover:text-black hover:shadow-lg hover:before:right-0 active:scale-90 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? 'שולח...' : 'סיימתי, אפשר לשלוח'}
              <ArrowLongLeftIcon />
            </Button>
          </div>
        </div>
      </div>
      {showAlert && <AlertSuccess onClose={() => setShowAlert(false)} />}
    </div>
  )
}
