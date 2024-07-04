import React from 'react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} ${month} ${year}`;
};

const FormattedDate = ({ date }) => {
  return <span>{formatDate(date)}</span>;
};

export default FormattedDate;
