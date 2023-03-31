import { CircularProgress } from '@mui/material';

const FullScreenLoader = () => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'inherit',
        position: 'fixed',
        zIndex: '99999',
        left: 0,
        top: 0,
        overflow: 'hidden'
      }}
    >
      <CircularProgress color="error" />
    </div>
  );
};

export default FullScreenLoader;
