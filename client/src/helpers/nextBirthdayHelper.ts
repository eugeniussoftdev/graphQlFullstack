
export function getNextBirthdayMessageHelper({
  yearOfBirth,
  name,
  country,
}: any) {
  const birthDate = new Date(yearOfBirth);

  const today = new Date();

  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const age = nextBirthday.getFullYear() - birthDate.getFullYear();

  const message = `Hello ${name} from ${country}. On ${nextBirthday.getDate()} of ${getMonthName(
    nextBirthday.getMonth()
  )}, you will be ${age} years old!`;

  return message;
}

function getMonthName(month: number) {
  const monthNames = [
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
  return monthNames[month];
}
