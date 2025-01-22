import lodash from "lodash";

// // Array of holiday objects with name and date properties. 
const holidays = [
  { name: "Christmas", date: new Date("2025-12-25") },
  { name: "Canada Day", date: new Date("2025-07-01") },
  { name: "April Fools", date: new Date("2025-04-01") },
  { name: "New Year", date: new Date("2026-01-01") },
  { name: "Good Friday", date: new Date("2025-04-18") },
  { name: "Victoria Day", date: new Date("2025-05-19") },
  { name: "Labour Day", date: new Date("2025-09-01") },
  { name: "Thanksgiving", date: new Date("2025-10-013") },
  { name: "Boxing Day", date: new Date("2025-12-26") },
]

// Create a new Date object (current date and time), and store it in the today variable.
let today = new Date();

// Calculates the difference in days between the holiday's date and the current date.
holidays.forEach(holiday => {
  let dateDifference = holiday.date - today;
  console.log(Math.ceil(dateDifference / (1000 * 60 * 60 * 24)))
});

// Randomly selects a holiday from the 'holidays' array.
let random_holiday = lodash.sample(holidays)
console.log(random_holiday)

// Find the index of the holiday.
console.log(lodash.findIndex(holidays, { name: "Christmas" }));
console.log(lodash.findIndex(holidays, { name: "Canada Day" }));
console.log(lodash.findIndex(holidays, { name: "April Fools" }));
console.log(lodash.findIndex(holidays, { name: "New Year" }));
console.log(lodash.findIndex(holidays, { name: "Good Friday" }));
console.log(lodash.findIndex(holidays, { name: "Victoria Day" }));
console.log(lodash.findIndex(holidays, { name: "Labour Day" }));
console.log(lodash.findIndex(holidays, { name: "Thanksgiving" }));
console.log(lodash.findIndex(holidays, { name: "Boxing Day" }));
