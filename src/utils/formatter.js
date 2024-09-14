import dayjs from 'dayjs'

export const formatDate = (date) => dayjs(date).format('MM/DD/YYYY');

export const formatRatings = (rating) => rating.toFixed(1);

export const formatDuration = (duration) => {
  let hours = Math.floor(duration / 60);
  let minutes = (duration % 60);

  return `${hours}:${minutes.toString().padStart(2, '0')}:00`

}