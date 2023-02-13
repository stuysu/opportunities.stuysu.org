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
    onClose
}) {
    
    const [isOpen, setOpen] = React.useState(false);
    
    if (open && !isOpen) setOpen(true);

    return (
        <div>
            <Dialog
            open={isOpen}
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
                <Button onClick={() => {
                    setOpen(false);
                    onClose();
                    if (onCancel) onCancel();
                }}>Cancel</Button>
                <Button onClick={() => {
                    setOpen(false);
                    onClose();
                    if (onConfirm) onConfirm();
                }} autoFocus>Confirm</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}