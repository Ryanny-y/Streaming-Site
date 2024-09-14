import dayjs from 'dayjs'

export const formatDate = (date) => dayjs(date).format('MM/DD/YYYY');

export const formatRatings = (rating) => rating.toFixed(1);

export const formatDuration = (duration) => {
  let hours = (duration / 60).toFixed();
  let minutes = (duration % 60);
  // 96

  return `${hours}:${minutes.toString().padStart(2, '0')}:00`

}