'use client'

import { useFormikContext } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setFormData } from '../store/form_store'
import { CustomButton, CustomButtonRectangle } from './custom_button'
import { Typography } from './typhography'

export function RegisterFormButton() {
  const dispatch = useDispatch()
  const { typeMarketer, typeSales = [] } = useSelector((state) => state.form.pertip)
  const formik = useFormikContext()

  const marketerOptions = [
    {
      value: 'agent',
      label: 'סוכן',
      image: 'images/agent.png',
    },
    {
      value: 'store',
      label: 'חנות',
      image: 'images/store.png',
    },
  ]

  const salesOptions = [
    {
      value: 'קווי',
      label: 'קווי',
      image: 'images/line.png',
    },
    {
      value: 'סלולרי',
      label: 'סלולרי',
      image: 'images/phone.png',
    },
    {
      value: 'רכבים',
      label: 'רכבים',
      image: 'images/cars.png',
    },
  ]

  const handleSelectMarketer = (value) => {
    dispatch(setFormData({ typeMarketer: value }))
    formik.setFieldValue('typeMarketer', value)
  }

  const handleSelectSales = (value) => {
    const updated = typeSales.includes(value) ? typeSales.filter((item) => item !== value) : [...typeSales, value]
    dispatch(setFormData({ typeSales: updated }))
    formik.setFieldValue('typeSales', updated)
  }

  return (
    <div className="flex w-full flex-col items-start gap-10 lg:gap-[24px] lg:bg-transparent lg:p-0">
      <div className="flex w-full flex-col justify-center rounded-[40px] bg-white p-4 lg:p-4">
        <Typography className="text-[24px] font-bold">סוג משווק</Typography>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
          {marketerOptions.map((item) => (
            <CustomButton
              key={item.value}
              item={item}
              selected={typeMarketer === item.value}
              handleSelect={handleSelectMarketer}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col justify-center gap-6 rounded-[40px] bg-white p-4 lg:p-4">
        <div className="flex w-full flex-row items-center justify-between gap-2 sm:flex-row sm:gap-0">
          <Typography className="text-[24px] font-bold">סוג המכירות</Typography>
          <Typography className="text-black-500 text-sm font-medium">אפשר לבחור יותר מאפשרות אחת</Typography>
        </div>

        <div className="flex w-full flex-col gap-6">
          {salesOptions.map((item) => (
            <CustomButtonRectangle
              key={item.value}
              item={item}
              selected={typeSales.includes(item.value)}
              handleSelect={handleSelectSales}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
