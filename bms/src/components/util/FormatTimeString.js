// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// https://github.com/leejaehyup/react-native-timestamp-timer-hooks/blob/master/example/src/util.ts

// -----------------------------------------------------

const FormatTimeString = {};

const counter = (time) => {
  let msecs = time % 1000;

  if (msecs < 10) {
    msecs = `00${msecs}`;
  } else if (msecs < 100) {
    msecs = `0${msecs}`;
  }
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(time / 60000);
  let hours = Math.floor(time / 3600000);
  seconds = seconds - minutes * 60;
  minutes = minutes - hours * 60;
  let formatted;
  formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;

  return [formatted, seconds];
};

const dateTime = (time) => {
  return new Date(time).toUTCString();
};

const dateString = (date) => {
  const datePicker = new Date(date);

  const year = datePicker.getFullYear();
  let month = datePicker.getMonth() + 1; // months start at 0
  let day = datePicker.getDate();

  //phpMyAdmin does not accept dates without leading zeros !!!!
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  const startDate = `${year}/${month}/${day}`;
  return startDate;
};

FormatTimeString.counter = (time) => counter(time);
FormatTimeString.dateTime = (time) => dateTime(time);
FormatTimeString.dateString = (date) => dateString(date);

export default FormatTimeString;
