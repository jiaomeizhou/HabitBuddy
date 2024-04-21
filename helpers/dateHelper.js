// This file contains helper functions for date manipulation

// Function to convert a timestamp object to a date object
export const convertTimestampToDate = (timestampObject) => {
    const milliseconds = timestampObject.seconds * 1000 + timestampObject.nanoseconds / 1000000;
    const dateObject = new Date(milliseconds);
    return dateObject.toDateString();
};

// Function to convert a date object to a timestamp object
export const formatDate = (date) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);

    return formattedDate;
}