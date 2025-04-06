import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextOnTextFiled from './TextOnTextFiled';
export default function TextFile({ header, placeholder }) {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
            autoComplete="off"
        >
            <div>
                <TextOnTextFiled header={header} />

                <TextField
                    id="outlined-size-small"
                    size="small"
                    color='#DBDEDE'
                    focused
                    placeholder={placeholder}
                    sx={{ padding: '12px 16px 12px 20px', gap: '10px', color: '#DBDEDE' }}
                />
            </div>
        </Box>
    );
}
