import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { FiSettings } from 'react-icons/fi';
import { RiNotification3Line } from 'react-icons/ri';

const actions = [
  { icon: <FiSettings />, name: 'Copy' },
  { icon: <FiSettings />, name: 'Save' },
  { icon: <FiSettings />, name: 'Print' },
  { icon: <RiNotification3Line />, name: 'Share' }
];

export const MuiSpeedDial = () => {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default MuiSpeedDial;
