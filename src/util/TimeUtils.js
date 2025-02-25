export class TimeUtils {
  static parseStampToLocal(timeStamp) {
    const dateTimeRegex = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}):/;
    const match = timeStamp.match(dateTimeRegex);
    return match ? `${match[1]} ${match[2]}` : "";
  }
}
