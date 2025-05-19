'use client';


import { RegisterCard } from '@/components/register-card'
import store from '@/store/store';
import { Provider } from 'react-redux';
import GoogleMapsWrapper from './google_maps_wrapper';

export default function Home() {
  return (
    <Provider store={store}>
      <GoogleMapsWrapper>
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted font-display">
          <main className="w-[1376px] p-10">
            <RegisterCard />
          </main>
        </div>
      </GoogleMapsWrapper>
    </Provider>

  )
}
