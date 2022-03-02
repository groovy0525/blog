function getDate(dateInfo: string) {
  const date = new Date(dateInfo);
  const isToday = new Date().getDate() === date.getDate();
  const time = `${date.getHours()} : ${date.getMinutes()}`;

  return {
    date: `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`,
    time: isToday ? time : null,
  };
}

export default getDate;
