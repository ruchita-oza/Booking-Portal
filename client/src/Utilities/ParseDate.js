function getTime(date) {
  return date.getHours() + ":" + date.getMinutes();
}

const PadZeros = function (number) {
  if (parseInt(number) < 10) {
    return "0" + number;
  }
  return number;
};

const Convert24To12Time = function (dt) {
  let Hour = dt.getHours();
  let Minutes = dt.getMinutes();
  let Meridian = "AM";
  if (Hour > 12) {
    Hour -= 12;
    Meridian = "PM";
  }
  if (Hour == 12) {
    Meridian = "PM";
  }

  Hour = PadZeros(Hour);
  Minutes = PadZeros(Minutes);

  return Hour + ":" + Minutes + " " + Meridian;
};

const ParseDate = function (date, time_required = false) {
  var new_date = new Date(date);
  try {
    var return_date = "";
    var parse_date = date.split("T");
    var date_part = parse_date[0];
    var time_part = parse_date[1];
    var date_splitted = date_part.split("-");
    return_date +=
      PadZeros(new_date.getDate()) +
      "/" +
      PadZeros(new_date.getMonth() + 1) +
      "/" +
      new_date.getFullYear();
    if (time_required) {
      var time_splitted = time_part.split(":");
      return_date += " " + Convert24To12Time(new_date);
    }

    return return_date;
  } catch (e) {
    console.log(e.toString());
  }
};

const getYear = function (date) {
  try {
    var parse_date = date.split("T")[0].split("-");
    return parse_date[0];
  } catch (e) {
    console.log(e.toString());
  }
};

const dateWithDay = function (date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var new_date = new Date(date);
  return (
    days[new_date.getDay()] +
    ", " +
    months[new_date.getMonth()] +
    " " +
    PadZeros(new_date.getDate()) +
    " " +
    PadZeros(new_date.getFullYear()) +
    " " +
    Convert24To12Time(new_date)
  );
};

module.exports = { ParseDate, getYear, dateWithDay };
