const countryJson = require('../fixtures/country.json');

 function countryFunc() {
   let length = countryJson.list.length;
   function random (length) {
     return Math.floor(Math.random() * length);
   }

   let fromCountryName = countryJson.list[random (length)];
   let toCountryName = countryJson.list[random (length)];

  do toCountryName = countryJson.list[random (length)];
  while (fromCountryName === toCountryName);

  return {
    fromCountryName: fromCountryName,
    toCountryName: toCountryName
  };
}


function randomDateGenerator() {
  let today = new Date();
  let minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);

  let maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 11);
  maxDate.setDate(today.getDate());

  // Rastgele bir başlangıç tarihi oluşturun
  let randomDepartDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));

  // Rastgele bir dönüş tarihi oluşturun
  let minReturnDate = new Date(randomDepartDate);
  minReturnDate.setDate(randomDepartDate.getDate() + 1);

  // Dönüş tarihi, başlangıç tarihinden sonraki bir tarih olmalı
  if (minReturnDate > maxDate) {
    minReturnDate = new Date(maxDate);
  }

  let maxReturnDate = new Date(maxDate);
  let randomReturnDate = new Date(minReturnDate.getTime() + Math.random() * (maxReturnDate.getTime() - minReturnDate.getTime()));

  // Ay isimlerini alın
  let departMonthName = randomDepartDate.toLocaleString('default', { month: 'long' });
  let returnMonthName = randomReturnDate.toLocaleString('default', { month: 'long' });

  let departDay = randomDepartDate.getDate();
  let departYear = randomDepartDate.getFullYear();

  let returnDay = randomReturnDate.getDate();
  let returnYear = randomReturnDate.getFullYear();

  return {
    depart: `${departDay} ${departMonthName} ${departYear}`,
    return: `${returnDay} ${returnMonthName} ${returnYear}`
  };
}


function randomizeNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = {
  /** @function randomUser
   * @description Creating Random Data
   * @returns object
   */
  randomUser: function () {
    const countryData = countryFunc();
    let ticketWay = Math.random() < 0.5;
    let throughFlight = Math.random() < 0.5;
    const adult = randomizeNumber(1, 4);
    const child = randomizeNumber(0, 4);
    const maxBaby = Math.min(adult, randomizeNumber(0, adult));
    return {
      fromCountry: countryData.fromCountryName,
      toCountry: countryData.toCountryName,
      startDate: randomDateGenerator().depart,
      endDate: !ticketWay ? randomDateGenerator().return : "",
      oneWayTicket: ticketWay,
      throughFlight: throughFlight,
      passenger: {
        adult: adult,
        child: child,
        baby: maxBaby
      }
    };
  },
};