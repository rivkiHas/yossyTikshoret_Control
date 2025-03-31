import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function MiniHeader({ placeholder }) {
  return (
    <Box
      sx={{
        display: 'flex', // שימוש ב-flex
        justifyContent: 'flex-end', // מיישר את התוכן לימין
        alignItems: 'center', // מיישר את התוכן במרכז
        alignSelf: 'stretch', // יישור של הקונטיינר לרוחב
      }}
    >
      <Typography
        sx={{
          color: 'var(--Dark-Dark-4, #4B5563)', // צבע הטקסט
          textAlign: 'right', // יישור הטקסט לימין
          fontFamily: 'SimplerPro_HLAR', // הגדרת הגופן
          fontSize: '12px', // גודל הגופן
          fontStyle: 'normal', // סגנון גופן רגיל
          fontWeight: 400, // משקל הגופן
          lineHeight: '24px', // גובה שורה
        }}
      >
        {placeholder}
      </Typography>
    </Box>
  );
}

export default MiniHeader; // ייצוא ברירת מחדל של הקומפוננטה
