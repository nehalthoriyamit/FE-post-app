import moment from "moment";

export const formatDate = (date: string | Date) => {
  const inputDate = moment(date);

  // Start of today
  const today = moment().startOf("day");

  // Start of yesterday
  const yesterday = moment().subtract(1, "days").startOf("day");

  // Compare the input date with today and yesterday
  if (inputDate.isSame(today, "day")) {
    return "Today";
  } else if (inputDate.isSame(yesterday, "day")) {
    return "Yesterday";
  } else {
    return inputDate.format("DD MMM YYYY");
  }
};
