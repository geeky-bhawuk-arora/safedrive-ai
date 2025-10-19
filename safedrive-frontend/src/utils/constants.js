// export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// export const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/s';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

export const DRIVER_STATES = {
  ALERT: 'alert',
  DROWSY: 'drowsy',
  DANGER: 'danger'
};

export const STATUS_CONFIG = {
  alert: {
    icon: '🟢',
    label: 'ALERT',
    color: 'green'
  },
  drowsy: {
    icon: '🟡',
    label: 'DROWSY',
    color: 'yellow'
  },
  danger: {
    icon: '🔴',
    label: 'DANGER',
    color: 'red'
  }
};

export const THRESHOLDS = {
  PERCLOS_WARNING: 20,
  PERCLOS_DANGER: 40,
  HRV_LOW: 40,
  STEERING_HIGH: 10
};