import React from 'react';
import { Form } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput } from '@mui/material';


function ForgotPasswordModal({ open, handleClose, handleChange, handleSubmit, forgotPasswordEmail }) {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { backgroundImage: 'none' },
      }}
    >
      <Form onSubmit={handleSubmit}>

        <DialogTitle>Reset password</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <DialogContentText>
            Enter your account's email address and we'll send you a link to reset your password.
          </DialogContentText>
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="forgotPasswordEmail"
            type="email"
            name="forgotPasswordEmail"
            autoComplete="email"
            placeholder="your@email.com"
            onChange={handleChange}
            value={forgotPasswordEmail}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Continue
          </Button>
        </DialogActions>
      </Form>

    </Dialog>
  );
}

ForgotPasswordModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPasswordModal;
