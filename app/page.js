'use client'

import { RegisterCard } from '@/components/register-card'
import store from '@/store/store'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import GoogleMapsWrapper from './google_maps_wrapper'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true)
      setTimeout(() => setShowSplash(false), 800) // משך האנימציה
    }, 1000) // זמן הצגת הספלש לפני האנימציה
    return () => clearTimeout(timer)
  }, [])

  return (
    <Provider store={store}>
      <GoogleMapsWrapper>
        <div className="relative w-full overflow-hidden bg-muted font-display">
          {showSplash && (
            <div
              className={`fixed inset-0 z-50 flex h-screen items-center justify-center bg-[#F8BD00] ${animateOut ? 'animate-slideUpOut' : ''}`}
            >
              <Image
                src="/images/logo_main.svg"
                alt="לוגו קונטרול"
                className="object-contain"
                width="990"
                height="141"
              />
            </div>
          )}

          {!showSplash && (
            <div className="flex min-h-svh flex-col items-center justify-center">
              <main className="w-full p-2 lg:max-w-[1376px] lg:p-10">
                <RegisterCard />
              </main>
            </div>
          )}
        </div>
      </GoogleMapsWrapper>
    </Provider>
  )
}
