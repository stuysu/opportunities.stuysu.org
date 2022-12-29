import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

/* 
    title: String
    description: String,
    open: Boolean,
    onCancel: Function,
    onConfirm: Function,
    
*/

export default function ConfirmationDialog({
    title,
    description,
    open,
    onCancel,
    onConfirm,
}) {
    return (
        <div>
            <Dialog
            open={open}
            >
            {title && (<DialogTitle>
                {title}
            </DialogTitle>)}
            {description && (<DialogContent>
                <DialogContentText>
                {description}
                </DialogContentText>
            </DialogContent>)}
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} autoFocus>Confirm</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}