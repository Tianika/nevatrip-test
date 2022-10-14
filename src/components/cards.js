const CARDS = [
  {
    label: {
      tag: 'new',
      text: 'Новинка',
    },
    src: '../assets/jpg/trip1.jpg',
    name: 'trip1',
    duration: '2 часа',
    title: 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    describes: [
      'Билет на целый день',
      'Неограниченное число катаний',
      '6 остановок у главных достопримечательностей',
    ],
    times: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    prices: {
      basic: '900 &#x20bd;',
      landing: '1200 &#x20bd на причале',
    },
  },
  {
    label: {
      tag: 'year',
      text: 'Круглый год',
    },
    src: '../assets/jpg/trip2.jpg',
    name: 'trip2',
    duration: '2 часа',
    title: 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    describes: [
      'Билет на целый день',
      'Неограниченное число катаний',
      '6 остановок у главных достопримечательностей',
    ],
    times: ['12:00', '13:00', '14:00', '15:00'],
    prices: {
      basic: '900 &#x20bd;',
      landing: '1200 &#x20bd на причале',
    },
  },
  {
    label: {
      tag: 'none',
      text: '',
    },
    src: '../assets/jpg/trip3.jpg',
    name: 'trip3',
    duration: '2 часа',
    title: 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    describes: [
      'Билет на целый день',
      'Неограниченное число катаний',
      '6 остановок у главных достопримечательностей',
    ],
    times: ['12:00', '13:00', '14:00'],
    prices: {
      basic: '1 500 &#x20bd;',
      landing: '',
    },
  },
];

const cardDraw = ({ label, src, name, duration, title, describes, times, prices }) => {
  const createDescribes = () => {
    let fragment = '';

    describes.forEach((describe) => {
      fragment += `<li class="card-describe__item">${describe}</li>`;
    });

    return fragment;
  };

  const createTimes = () => {
    let fragment = '';

    if (times.length < 5) {
      times.forEach((time) => {
        fragment += `<li class="card-times__item">${time}</li>`;
      });
    } else {
      for (let i = 0; i < 3; i++) {
        fragment += `<li class="card-times__item">${times[i]}</li>`;
      }

      fragment += `<li class="card-times__item else">еще...</li>`;

      for (let i = 3; i < times.length; i++) {
        fragment += `<li class="card-times__item invisible">${times[i]}</li>`;
      }
    }

    return fragment;
  };

  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="card-trip-label ${label.tag}">${label.text}</div>
    <img class="card-image" src=${src} alt=${name} />
    <div class="card-about">
      <div class="card-title">
        ${title}
      </div>
      <div class="card-trip-time">${duration}</div>
      <div class="card-describe">
        <ul>
        ${createDescribes()}
        <li class="card-describe__item today">
          Ближайший рейс сегодня
          <div class="break"></div>
          <ul class="card-times">
            ${createTimes()}
          </ul>
        </li>
      </div>
      <div class="card-total">
        <div class="card-prices">
          <div class="basic-price">${prices.basic}</div>
          <div class="landing-price">${prices.landing}</div>
        </div>
        <button class="card-more">Подробнее</button>
      </div>
    </div>
  `;

  return card;
};

export const createCards = () => {
  const layout = document.querySelector('.cards-container');

  CARDS.forEach((card) => {
    const newCard = cardDraw(card);
    layout.appendChild(newCard);
  });
};

export const addTimes = () => {
  const elseBtn = document.querySelector('.card-times__item.else');

  elseBtn.addEventListener('click', () => {
    const timeContainer = document.querySelector('.card-times');
    timeContainer.classList.add('flex');

    const invisibleTimes = document.querySelectorAll('.invisible');

    invisibleTimes.forEach((time) => {
      time.classList.remove('invisible');
    });

    elseBtn.classList.add('invisible');
  });
};
