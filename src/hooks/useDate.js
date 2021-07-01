const useDate = () => {
  function getDayOfTheWeek(dayNumber) {
    let dayOfTheWeek = '';
    switch (dayNumber) {
      case 0:
        dayOfTheWeek = 'Nedelja';
        break;
      case 1:
        dayOfTheWeek = 'Ponedeljak';
        break;
      case 2:
        dayOfTheWeek = 'Utorak';
        break;
      case 3:
        dayOfTheWeek = 'Srijeda';
        break;
      case 4:
        dayOfTheWeek = 'Cetvrtak';
        break;
      case 5:
        dayOfTheWeek = 'Petak';
        break;
      case 6:
        dayOfTheWeek = 'Subota';
        break;
      default:
        dayOfTheWeek = 'No day in the week available';
    }
    return dayOfTheWeek;
  }

  function getMonthOfTheYear(monthNumber) {
    let monthOfTheYear = '';
    switch (monthNumber) {
      case 0:
        monthOfTheYear = 'januar';
        break;
      case 1:
        monthOfTheYear = 'februar';
        break;
      case 2:
        monthOfTheYear = 'mart';
        break;
      case 3:
        monthOfTheYear = 'april';
        break;
      case 4:
        monthOfTheYear = 'maj';
        break;
      case 5:
        monthOfTheYear = 'juni';
        break;
      case 6:
        monthOfTheYear = 'juli';
        break;
      case 7:
        monthOfTheYear = 'august';
        break;
      case 8:
        monthOfTheYear = 'septembar';
        break;
      case 9:
        monthOfTheYear = 'oktobar';
        break;
      case 10:
        monthOfTheYear = 'novembar';
        break;
      case 11:
        monthOfTheYear = 'decembar';
        break;
      default:
        monthOfTheYear = 'No month in the year available';
    }
    return monthOfTheYear;
  }

  function getStringDate(date) {
    const dateCreated = new Date(date);
    const weekDay = getDayOfTheWeek(dateCreated.getDay());
    const month = getMonthOfTheYear(dateCreated.getMonth());
    const day = dateCreated.getDate();
    const year = dateCreated.getFullYear();
    const hours = dateCreated.getHours();
    const minutes = dateCreated.getMinutes();
    const seconds = dateCreated.getSeconds();
    const dateString = `${weekDay}, ${day}. ${month} ${year}. ${
      hours < 10 ? `0${hours}` : hours
    }:${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    return dateString;
  }

  return {
    getStringDate,
  };
};

export default useDate;
