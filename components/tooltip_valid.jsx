'use client';

import React from 'react';

export default function TooltipValid({
    tooltipText = 'שדה חובה',
    className = '',
}) {
    return (
        <div className={`absolute -top-8 left-0 z-10 w-max bg-black text-white text-xs rounded px-2 py-1 ${className}`}>
            { tooltipText }
            < div className = "absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-black" ></div >
    </div >
  );
}
