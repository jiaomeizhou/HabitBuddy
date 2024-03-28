export const convertTimestampToDate = (timestampObject) => {
    const milliseconds = timestampObject.seconds * 1000 + timestampObject.nanoseconds / 1000000;
    const dateObject = new Date(milliseconds);
    return dateObject.toDateString();
};

export const formatDate = (date) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);

    return formattedDate;
}