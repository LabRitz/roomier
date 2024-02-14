export const isNonNumberString = (val) => {
  return /^([a-zA-Z_\-\.]+)/.test(val)
}