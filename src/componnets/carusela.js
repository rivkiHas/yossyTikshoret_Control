import React from 'react';
import { useSelector } from 'react-redux';
import CustomButton from './CustomButton';
import { Box } from 'lucide-react';
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
            {/* <img
              src="/map-placeholder.png"
              alt="map"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <span className="relative text-black font-semibold text-lg whitespace-nowrap">
              {brunch.address || 'ללא כתובת'}
            </span> */}
            <CarouselaItem item={brunch} />
          </div>
        ))}
      </div>
    </div>
  );
}
function CarouselaItem({item}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: '227px',
        height: '146px',
        borderRadius: "40px",
        overflow: "hidden",
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: 3,
        cursor: "pointer",
        transition: "0.3s",
        
        "&:hover": {
          opacity: 0.9,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          backgroundColor: "white",
          padding: "8px 16px",
          borderRadius: "20px",
          fontWeight: "bold",
          boxShadow: 1,
        }}
      >
        {item.name}
      </Box>
    </Box>
  );
}