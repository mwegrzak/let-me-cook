import * as React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';


export default function FilterBar() {

    const handleClick = () => {
        console.info('You clicked the filter chip.');
    };

    return (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                gap: 3,
                overflow: 'auto',
            }}
        >
            <Chip onClick={handleClick} size="medium" label="Wszystkie kategorie" />
            <Chip
                onClick={handleClick}
                size="medium"
                label="Śniadania"
                sx={{
                    backgroundColor: 'transparent',
                    border: 'none',
                }}
            />
            <Chip
                onClick={handleClick}
                size="medium"
                label="Obiady"
                sx={{
                    backgroundColor: 'transparent',
                    border: 'none',
                }}
            />
            <Chip
                onClick={handleClick}
                size="medium"
                label="Desery"
                sx={{
                    backgroundColor: 'transparent',
                    border: 'none',
                }}
            />
            <Chip
                onClick={handleClick}
                size="medium"
                label="Przekąski"
                sx={{
                    backgroundColor: 'transparent',
                    border: 'none',
                }}
            />
        </Box>
    );
}
