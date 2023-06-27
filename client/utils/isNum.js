// Validate whether input is number
export const isNum = (val) => {
  const regex = /^[0-9\b]+$/;

  return (val === '' || regex.test(val));
};
