import { DateTime } from "luxon";
import { countries } from "./countries.js";
import { TimeBucketMessage } from "./time_bucket_message.js";

function main() {
  const randomIndex = Math.floor(Math.random() * countries.length);
  const selectedCountry = countries[randomIndex];

  const currentLocalTime = DateTime.now().setZone(
    selectedCountry.majorTimeZone,
  );
  const timeBucket = toTimeBucket(currentLocalTime);
  const message = new TimeBucketMessage(selectedCountry, timeBucket);
  printTimeBucketMessage(message);
}

function toTimeBucket(dateTime) {
  const hour = dateTime.hour;

  if (hour >= 5 && hour <= 10) return "morning";
  if (hour >= 11 && hour <= 15) return "day";
  if (hour >= 16 && hour <= 18) return "evening";
  if (hour >= 19 && hour <= 23) return "night";
  if (hour >= 0 && hour <= 4) return "lateNight";
}

function printTimeBucketMessage(timeBucketMessage) {
  if (timeBucketMessage.timeBucket === "lateNight") {
    outputLateNightMessage(
      timeBucketMessage.intro(),
      timeBucketMessage.message(),
    );
  } else {
    outputStandardMessage(timeBucketMessage.message());
  }
}

function outputStandardMessage(message) {
  const interval = 800;
  const maxDelay = 1600;
  const lines = message.split("\n");

  lines.forEach((line, index) => {
    const delay = Math.min(index * interval, maxDelay);

    setTimeout(() => {
      console.log(line);
    }, delay);
  });
}

function outputLateNightMessage(intro, message) {
  console.log(intro);
  typeMessage(message);
}

function typeMessage(message) {
  let index = 0;

  const id = setInterval(() => {
    if (index >= message.length) {
      clearInterval(id);
      return;
    }

    process.stdout.write(message[index]);
    index++;
  }, 300);
  return;
}

main();
