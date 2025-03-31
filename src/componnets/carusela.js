import React from 'react';
import { useSelector } from 'react-redux';

export default function Carousela() {
  const brunches = useSelector((state) => state.brunch.brunches);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-4">
        {brunches.map((brunch) => (
          <CarouselaItem key={brunch.id} item={brunch} />
        ))}
      </div>
    </div>
  );
}

function CarouselaItem({ item }) {
  return (
    <div
      className="flex flex-col justify-center items-center gap-[6.503px] flex-shrink-0"
      style={{
        width: '132px',
        height: '84.899px',
        padding: '12px 22.11px',
        aspectRatio: '132 / 84.90',
        borderRadius: '8px',
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: '0.3s',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontWeight: 'bold',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {item.name}
      </div>
    </div>
  );
}