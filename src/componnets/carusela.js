import React from 'react';
import { useSelector } from 'react-redux';

export default function Carousela() {
  const brunches = useSelector((state) => state.brunch.brunches);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-4">
        {brunches.map((brunch) => (
          <div
            key={brunch.id}
            className="relative min-w-[150px] h-[100px] rounded-2xl overflow-hidden shadow-md bg-gray-200 flex items-center justify-center transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/map-placeholder.png"
              alt="map"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <span className="relative text-black font-semibold text-lg whitespace-nowrap">
              {brunch.address || 'ללא כתובת'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
 