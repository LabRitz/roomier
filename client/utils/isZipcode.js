export const isZipcode = (val) => {
  return /[0-9]{5}/.test(val)
}