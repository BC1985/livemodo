export const postedAt = strDate => {
  const date = new Date(strDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = `${date.getHours()}: ${date.getMinutes()}`;
  return `${month}/${day}/${year} at ${time}`;
};

export const showDate = str =>{
  const date = new Date(str);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}
