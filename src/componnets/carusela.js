import { Box } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Carousela() {
  const brunches = useSelector((state) => state.brunch.brunches || []);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // מהירות הגרירה
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Box
      ref={scrollRef}
      sx={{
        position: 'relative',
        width: '58%',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        cursor: isDragging ? 'grabbing' : 'grab' // משנה סמן לגרירה
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '16px',
          userSelect: 'none', // מונע סימון טקסט לא רצוי בזמן גרירה
        }}
      >
        {brunches.map((brunch) => (
          <CarouselaItem key={brunch.id} item={brunch} />
        ))}
      </Box>
    </Box>
  );
}

function CarouselaItem({ item }) {
  return (
    <div
      style={{
        width: '132px',
        height: '85px',
        padding: '12px',
        borderRadius: '8px',
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: '0.3s',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontWeight: 'bold',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        {item.name}
      </div>
    </div>
  );
}
