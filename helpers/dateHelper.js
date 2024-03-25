export const convertTimestampToDate = (timestampObject) => {
    const milliseconds = timestampObject.seconds * 1000 + timestampObject.nanoseconds / 1000000;
    const dateObject = new Date(milliseconds);
    return dateObject.toDateString();
};