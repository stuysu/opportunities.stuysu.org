// converts graphql returned dates into date string
// note that graphql dates are already eastern time dates, so force-adjust to UTC

function toDateStringCustom(date) {
  var userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
  return adjustedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default toDateStringCustom;
