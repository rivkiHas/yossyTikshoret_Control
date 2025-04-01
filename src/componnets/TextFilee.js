import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextOnTextFiled from './TextOnTextFiled';

const TextFilee = ({ header, type, placeholder, value, onChange, name, error, options }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // עדכון שם הקובץ
            onChange && onChange(event);
        }
    };

    const handleFileReset = (event) => {
        event.stopPropagation(); // מונע מהאייקון לגרום לפתיחת העלאת קבצים
        setFileName('');
        document.getElementById(name).value = ''; // איפוס קלט הקובץ
    };
    

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0, alignSelf: 'stretch' }}>
            <TextOnTextFiled header={header} />

            <Box sx={{ position: 'relative', width: '100%' }}>
                {type === 'file' ? (
                    <>
                        <input
                            type="file"
                            name={name}
                            accept=".jpg,.png,.pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id={name}
                        />
                        <label
                            htmlFor={name}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: '6px',
                                border: '1px solid #DBDEDE',
                                backgroundColor: '#FFFFFF',
                                cursor: 'pointer',
                                padding: '9px 12px 9px 15px',
                                boxSizing: 'border-box',
                                fontFamily: 'SimplerPro_HLAR, sans-serif',
                                fontSize: '12px',
                                fontWeight: '400',
                                color: '#4C585B',
                                textAlign: 'right',
                                width: '100%',
                            }}
                        >
                            {fileName ? (
                                // אייקון למחיקה (איקס)
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    onClick={handleFileReset} // מחיקת הקובץ
                                    style={{ marginRight: '8px', cursor: 'pointer' }}
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                // אייקון העלאת קובץ (ברירת מחדל)
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                    style={{ marginRight: '8px', cursor: 'pointer' }}
                                >
                                    <path
                                        d="M2 11.4277V12.9277C2 13.3256 2.15804 13.7071 2.43934 13.9884C2.72064 14.2697 3.10218 14.4277 3.5 14.4277H12.5C12.8978 14.4277 13.2794 14.2697 13.5607 13.9884C13.842 13.7071 14 13.3256 14 12.9277V11.4277M5 5.42773L8 2.42773M8 2.42773L11 5.42773M8 2.42773V11.4277"
                                        stroke="#6B7280"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                            {fileName || placeholder}
                        </label>
                    </>
                ) : type === 'select' ? (
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        style={{
                            padding: '9px 12px 9px 15px',
                            borderRadius: '6px',
                            border: '1px solid #DBDEDE',
                            backgroundColor: '#FFFFFF',
                            boxSizing: 'border-box',
                            textAlign: 'right',
                            fontFamily: 'SimplerPro_HLAR, sans-serif',
                            fontSize: '12px',
                            fontWeight: '400',
                            color: '#4C585B',
                            width: '100%',
                        }}
                    >
                        <option value="">{placeholder}</option>
                        {options?.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        style={{
                            padding: '9px 12px 9px 15px',
                            borderRadius: '6px',
                            border: '1px solid #DBDEDE',
                            backgroundColor: '#FFFFFF',
                            boxSizing: 'border-box',
                            textAlign: 'right',
                            fontFamily: 'SimplerPro_HLAR, sans-serif',
                            fontSize: '12px',
                            fontWeight: '400',
                            color: '#4C585B',
                            width: '100%',
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default TextFilee;
