function passArr(arr) {
  if (arr.length === 0) return true;
  return arr.every(v => {
    return v !== undefined && v !== null && v !== '' && !isNaN(v);
  });
}

export default passArr;