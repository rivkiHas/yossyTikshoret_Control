'use client'

import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Autocomplete, GoogleMap, Marker } from '@react-google-maps/api'
import { useFormikContext } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBrunchDetails } from '../store/brunch_store'
import Carusel from './carusel'
import TooltipValid from './tooltip_valid'
import { Typography } from './typhography'

const containerStyle = {
  height: '100%',
  width: '100%',
  flexShrink: 0,
  alignSelf: 'stretch',
  borderRadius: '8px',
  background: "url('<path-to-image>') -212.782px -5.3px / 237.14% 102.469% no-repeat lightgray",
  position: 'relative',
  overflow: 'hidden',
  minHeight: '300px',
}

const customMarkerIcon = {
  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  fillColor: '#F8BD00',
  fillOpacity: 2,
  strokeColor: '#FFFFFF',
  strokeWeight: 3,
  scale: 3,
}

export default function AddressSearchMap({ typeMarketer }) {
  const dispatch = useDispatch()
  const autocompleteRef = useRef(null)
  const formik = useFormikContext()
  const brunches = useSelector((state) => state.brunch.brunches)
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch)
  const brunch = brunches.find((b) => b.id === activeBrunch) || brunches[0]
  const address = brunch?.address || ''
  const location = brunch?.location || null

  const [localInputValue, setLocalInputValue] = useState(address || '')
  const [isEditing, setIsEditing] = useState(false)

  const defaultBrunchName =
    brunch?.name?.trim() !== '' ? brunch.name : `${brunches.findIndex((b) => b.id === activeBrunch) + 1}`

  const [brunchName, setBrunchName] = useState(defaultBrunchName)

  useEffect(() => {
    setLocalInputValue(address)
  }, [address])

  useEffect(() => {
    if (!address.trim()) return
    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(interval)
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results[0]?.geometry?.location) {
            const newLocation = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            }
            if (!location || newLocation.lat !== location.lat || newLocation.lng !== location.lng) {
              formik.setFieldValue(`brunches[${activeBrunch}].location`, newLocation)
              dispatch(
                updateBrunchDetails({
                  id: activeBrunch,
                  location: newLocation,
                })
              )
            }
          }
        })
      }
    }, 300)
    return () => clearInterval(interval)
  }, [address])

  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete
  }

  const handleEditBrunch = () => {
    setIsEditing(true)
  }

  const handleInputChange = (value) => {
    setLocalInputValue(value)
  }

  const handleSaveBrunch = () => {
    setIsEditing(false)
    formik.setFieldValue(`brunches[${activeBrunch}].name`, brunchName)
    dispatch(
      updateBrunchDetails({
        id: brunch.id,
        name: brunchName,
      })
    )
  }

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        if (typeMarketer !== 'agent') {
          formik.setFieldValue(`brunches[${activeBrunch}].location`, newLocation)
          formik.setFieldValue(`brunches[${activeBrunch}].address`, place.formatted_address)
          dispatch(
            updateBrunchDetails({
              id: brunch.id,
              address: place.formatted_address,
              location: newLocation,
            })
          )
        }
        setLocalInputValue(place.formatted_address)
      }
    }
  }

  const handleAddBranch = () => {
    if (!localInputValue.trim()) {
      alert('אנא הכנס כתובת להוספה')
      return
    }

    const place = autocompleteRef.current?.getPlace?.()

    if (!place || !place.geometry) {
      alert('אנא בחר כתובת מהרשימה של גוגל (Autocomplete)')
      return
    }

    const newLocation = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }

    const newId = Math.max(...brunches.map((b) => b.id), 0) + 1

    const newBrunch = {
      id: newId,
      address: place.formatted_address || localInputValue,
      location: newLocation,
      hoursOpen: [
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
        { morning: { open: '', close: '' }, evening: { open: '', close: '' } },
      ],
      name: place.formatted_address || localInputValue,
    }
    setLocalInputValue('')
  }

  return (
    <div className="flex flex-col rounded-[40px] bg-white p-5 lg:h-[60vh] lg:p-5">
      <div className="mb-4 flex items-center gap-2 lg:justify-between">
        <div className="flex flex-row items-center justify-around text-[24px] font-bold">
          {typeMarketer === 'agent' ? (
            <span className="block">אזור פעילות</span>
          ) : brunches.length === 1 ? (
            <span className="block">כתובת חנות</span>
          ) : (
            <>
              <span className="block">כתובת חנות: </span>
              {isEditing ? (
                <input
                  type="text"
                  value={brunchName}
                  onChange={(e) => setBrunchName(e.target.value)}
                  onBlur={handleSaveBrunch}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveBrunch()}
                  autoFocus
                  className="w-1/2 px-1 outline-none"
                  style={{ fontSize: '24px', fontWeight: 'bold' }}
                />
              ) : (
                <span className="block">{brunchName}</span>
              )}
            </>
          )}
        </div>

        {typeMarketer === 'store' && brunches.length > 1 && (
          <button onClick={handleEditBrunch} className="cursor-pointer rounded-full p-1 hover:bg-gray-100">
            <PencilSquareIcon className="h-7 w-7 text-black" />
          </button>
        )}
      </div>

      <Typography className="mb-4 text-[16px] font-medium">
        {typeMarketer === 'agent' ? 'אזור פעילות' : brunches.length > 1 ? `כתובת חנות: ${brunchName}` : 'כתובת חנות'}
      </Typography>

      <div className="flex flex-1 flex-col gap-4">
        {typeMarketer === 'agent' ? (
          <div className="relative w-full">
            <div className="relative flex flex-col gap-3">
              <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                <input
                  type="text"
                  placeholder="חפש מיקום נוסף"
                  value={localInputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddBranch()
                    }
                  }}
                  className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-muted-foreground transition-colors focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </Autocomplete>
              {formik.touched?.brunches?.[activeBrunch]?.address &&
                formik.errors?.brunches?.[activeBrunch]?.address && (
                  <TooltipValid tooltipText={formik.errors.brunches[activeBrunch].address} />
                )}
            </div>

            <button
              type="button"
              onClick={handleAddBranch}
              className="absolute top-0 left-0 flex h-11 items-center justify-center px-3 text-gray-500 hover:text-gray-700"
              aria-label="Add new location"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path
                  d="M14.6631 14L11.1985 10.5354M11.1985 10.5354C12.1362 9.59765 12.663 8.32583 12.663 6.9997C12.663 5.67357 12.1362 4.40175 11.1985 3.46403C10.2607 2.52632 8.98892 1.99951 7.66279 1.99951C6.33665 1.99951 5.06484 2.52632 4.12712 3.46403C3.1894 4.40175 2.6626 5.67357 2.6626 6.9997C2.6626 8.32583 3.1894 9.59765 4.12712 10.5354C5.06484 11.4731 6.33665 11.9999 7.66279 11.9999C8.98892 11.9999 10.2607 11.4731 11.1985 10.5354Z"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="relative flex w-full flex-col space-y-6">
            <div>
              <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                <input
                  type="text"
                  placeholder="הכנס כתובת..."
                  value={localInputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-muted-foreground transition-colors focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </Autocomplete>
            </div>

            {formik.touched?.brunches?.[activeBrunch]?.address && formik.errors?.brunches?.[activeBrunch]?.address && (
              <TooltipValid tooltipText={formik.errors.brunches[activeBrunch].address} />
            )}
          </div>
        )}

        <div className="h-full min-h-[500px] flex-1 lg:min-h-[300px]">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location || { lat: 32.0853, lng: 34.7818 }}
            zoom={location ? 15 : 10}
          >
            {location && <Marker position={location} icon={customMarkerIcon} />}
          </GoogleMap>
        </div>
      </div>
      {typeMarketer === 'agent' && (
        <div className="mt-4 lg:hidden">
          <Carusel activeBrunch={activeBrunch} />
        </div>
      )}
    </div>
  )
}
