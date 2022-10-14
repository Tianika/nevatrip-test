const DIRECTIONS = {
  oneWay: 'из A в B',
  backWay: 'из B в A',
  round: 'из A в B и обратно в А',
};

const tripData = {
  direction: DIRECTIONS.oneWay,
  oneTripTime: 50,
  priceOneDirection: 700,
  priceRoundTrip: 1200,
  startTime: '',
  tickets: 0,
  price: 700,
};

const HOUR = 15;
const LOCAL_DIFF = 180;
const date = new Date();
const utsMinute = -date.getTimezoneOffset();
const utcHour = utsMinute / 60;

const isTimeEarlier = (time) => {
  return Number(tripData.startTime) + Number(tripData.oneTripTime) > time;
};

const getMinutes = (time) => {
  const [hours, minutes] = time.split(':');

  return Number(hours) * 60 + Number(minutes) - LOCAL_DIFF + utsMinute;
};

const getTime = (add = 0) => {
  return (HOUR + utcHour + add) % 24;
};

const formatTimeToStr = (time) => {
  const hour = Math.floor(time / 60) % 24;
  const minutes = time % 60;

  return `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
};

const getWordEnd = (num) => {
  if (num % 10 === 1 && num !== 11) {
    return '';
  }

  if ((num % 10 === 2 || num % 10 === 3 || num % 10 === 4) && (num < 10 || num > 20)) {
    return 'а';
  }

  return 'oв';
};

export const changeTripHandler = () => {
  const tripDirection = document.querySelector('#route');
  const tripA = document.querySelector('.trip-select.timeA');
  const tripB = document.querySelector('.trip-select.timeB');
  const selectorA = document.querySelector('#timeA');
  const selectorB = document.querySelector('#timeB');
  const countTickets = document.querySelector('#num');
  const totalBtn = document.querySelector('.trip-total__button');
  const message = document.querySelector('.total-message');
  const times = document.querySelectorAll('#timeB option');

  tripData.startTime = selectorA.value;

  const checkTimeB = () => {
    times.forEach((time) => {
      time.disabled = isTimeEarlier(time.value);
    });

    let a = true;
    times.forEach((time) => {
      if (!time.disabled && a) {
        time.selected = true;
        a = false;
      }
    });
  };

  tripDirection.addEventListener('change', (event) => {
    const direction = event.target.value;

    if (direction === DIRECTIONS.oneWay) {
      tripData.direction = DIRECTIONS.oneWay;
      tripData.startTime = selectorA.value;
      tripData.price = tripData.priceOneDirection;
      tripA.classList.remove('invisible');
      tripB.classList.add('invisible');
    } else if (direction === DIRECTIONS.backWay) {
      tripData.direction = DIRECTIONS.backWay;
      tripData.startTime = selectorB.value;
      tripData.price = tripData.priceOneDirection;
      tripB.classList.remove('invisible');
      tripA.classList.add('invisible');

      times.forEach((time) => {
        time.disabled = false;
      });
    } else if (direction === DIRECTIONS.round) {
      tripData.direction = DIRECTIONS.round;
      tripData.startTime = selectorA.value;
      tripA.classList.remove('invisible');
      tripB.classList.remove('invisible');
      tripData.price = tripData.priceRoundTrip;
      checkTimeB();
    }
  });

  selectorA.addEventListener('click', (event) => {
    tripData.startTime = event.target.value;

    if (tripData.direction === DIRECTIONS.round) {
      checkTimeB();
    }
  });

  selectorB.addEventListener('click', (event) => {
    if (tripData.direction !== DIRECTIONS.round) {
      tripData.startTime = event.target.value;
    }
  });

  countTickets.addEventListener('change', (event) => {
    tripData.tickets = Number(event.target.value);
  });

  totalBtn.addEventListener('click', () => {
    const { direction, oneTripTime, startTime, tickets, price } = tripData;

    let tripTime = oneTripTime;
    let finish = Number(startTime) + oneTripTime;

    if (direction === DIRECTIONS.round) {
      const secondTrip = Number(selectorB.value);
      finish = secondTrip + oneTripTime;
      tripTime = secondTrip - selectorA.value + oneTripTime;
    }

    const finishTime = formatTimeToStr(finish);

    if (tickets > 0) {
      message.innerHTML = `
        Вы выбрали ${tickets} билет${getWordEnd(tickets)} по маршруту ${direction} стоимостью ${
        tickets * price
      }р.
        Это путешествие займет у вас ${tripTime} минут.
        Теплоход отправляется в ${formatTimeToStr(startTime)}, а прибудет в ${finishTime}.
      `;
    } else {
      message.innerHTML = `
        Введите количество билетов
      `;
    }
  });
};

export const tripDraw = () => {
  const tripContainer = document.querySelector('#trip');

  tripContainer.innerHTML += `
  <div class="trip-select">
    <label for="time">Выберите направление</label>
    <select name="route" id="route">
      <option value="из A в B">из A в B</option>
      <option value="из B в A">из B в A</option>
      <option value="из A в B и обратно в А">из A в B и обратно в А</option>
    </select>
  </div>
  <div class="trip-select timeA">
    <label for="timeA">Выберите время</label>
    <select name="timeA" id="timeA">
      <option value="${getMinutes('18:00')}">${getTime()}:00 (из A в B)</option>
      <option value="${getMinutes('18:30')}">${getTime()}:30 (из A в B)</option>
      <option value="${getMinutes('18:45')}">${getTime()}:45 (из A в B)</option>
      <option value="${getMinutes('19:00')}">${getTime(1)}:00 (из A в B)</option>
      <option value="${getMinutes('19:15')}">${getTime(1)}:15 (из A в B)</option>
      <option value="${getMinutes('21:00')}">${getTime(3)}:00 (из A в B)</option>
    </select>
  </div>
  <div class="trip-select timeB invisible">
    <label for="timeB">Выберите время</label>
    <select name="timeB" id="timeB">
      <option value="${getMinutes('18:30')}">${getTime()}:30 (из B в A)</option>
      <option value="${getMinutes('18:45')}">${getTime()}:45 (из B в A)</option>
      <option value="${getMinutes('19:00')}">${getTime(1)}:00 (из B в A)</option>
      <option value="${getMinutes('19:15')}">${getTime(1)}:15 (из B в A)</option>
      <option value="${getMinutes('19:35')}">${getTime(1)}:35 (из B в A)</option>
      <option value="${getMinutes('21:50')}">${getTime(3)}:50 (из B в A)</option>
      <option value="${getMinutes('21:55')}">${getTime(3)}:55 (из B в A)</option>
    </select>
  </div>
  <div class="trip-total">
    <label for="num">Количество билетов</label>
    <input id="num" type="number" min="1" />
    <button class="trip-total__button">Посчитать</button>
  </div>
  <div class="total-message"></div>
  `;
};
