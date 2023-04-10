import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '@/redux/useTypedRedux';
import { AuthThunk } from '@/redux/auth/auth.thunk';

interface ConfirmLogoutProps {
  openConfirmLogout: boolean;
  setOpenConfirmLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmLogoutDialog: React.FC<ConfirmLogoutProps> = ({ openConfirmLogout, setOpenConfirmLogout }) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpenConfirmLogout(false);
  };

  return (
    <div>
      <Dialog
        open={openConfirmLogout}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { backgroundColor: '#1a1a1a' } }}
        /* TransitionComponent={Transition} */
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: 'white' }}>
          {'Do you want to logout?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'lightgray' }}>
            Click logout to terminate your current session
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => dispatch(AuthThunk.logout())} autoFocus sx={{ color: 'white' }}>
            LogOut
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmLogoutDialog;
