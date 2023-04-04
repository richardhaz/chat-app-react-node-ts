import moment, { Moment } from 'moment';

export const getTimeDifference = (startDate: Moment, endDate: Moment) => {
  const duration = moment.duration(startDate.diff(endDate));
  return duration;
};

export const getTimeDifferenceInSeconds = (startDate: Moment, endDate: Moment) => {
  const duration = moment.duration(startDate.diff(endDate));
  return duration.asSeconds();
};
