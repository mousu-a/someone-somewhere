import { greetings } from "./greetings.js";
import { localScenes } from "./localScenes.js";

const TIME_BUCKET_ALIAS = {
  evening: "day",
  lateNight: "night",
};

export class TimeBucketMessage {
  constructor(country, timeBucket) {
    this.timeBucket = timeBucket;
    this.country = country;
  }

  message() {
    if (this.timeBucket === "lateNight") return this.lateNightMessage();

    const message = [this.intro(), this.greeting(), this.localScene()].join(
      "\n",
    );
    return message;
  }

  lateNightMessage() {
    return "Zzz...z";
  }

  intro() {
    const nationalFlag = this.buildNationalFlag(this.country.code);
    return `${nationalFlag} ${this.country.name}`;
  }

  greeting() {
    const normalizedTimeBucket =
      TIME_BUCKET_ALIAS[this.timeBucket] ?? this.timeBucket;
    return greetings[normalizedTimeBucket][this.country.code];
  }

  localScene() {
    return localScenes[this.timeBucket][this.country.code];
  }

  buildNationalFlag(countryCode) {
    const nationalFlag = [...countryCode]
      .map((char) => {
        const regionalIndicatorOffset = "🇦".codePointAt(0) - "A".codePointAt(0);
        const regionalIndicator = char.codePointAt(0) + regionalIndicatorOffset;
        return String.fromCodePoint(regionalIndicator);
      })
      .join("");

    return nationalFlag;
  }
}
