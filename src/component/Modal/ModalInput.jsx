import React from 'react'
import { Box, Typography, Modal } from '@mui/material';

function ModalInput({ open, onClose, children }) {
    const style = {
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: 300, sm: 400 },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography component={'span'} variant={'body2'}>
                    {children}
                </Typography>
            </Box>
        </Modal>
    )
}

export default ModalInput;