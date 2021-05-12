import { format } from "date-fns";

export const dateAndTime = (str, type ) => {
  const date = new Date(str);
  const formattedDate = format(date, type);
  return  formattedDate 
};