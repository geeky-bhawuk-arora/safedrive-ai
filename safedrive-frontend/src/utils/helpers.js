export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString();
};

export const calculatePERCLOS = (eyeClosureData) => {
  // Calculate percentage of eye closure
  return Math.round(eyeClosureData * 100);
};

export const getStatusFromPERCLOS = (perclos) => {
  if (perclos < 20) return 'alert';
  if (perclos < 40) return 'drowsy';
  return 'danger';
};