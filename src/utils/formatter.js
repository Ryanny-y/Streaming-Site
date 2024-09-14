import dayjs from 'dayjs'

export const formatDate = (date) => dayjs(date).format('MM/DD/YYYY');