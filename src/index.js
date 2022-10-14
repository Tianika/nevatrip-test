import { createCards, addTimes } from './components/cards';
import { tripDraw, changeTripHandler } from './components/trip';

const renderPage = () => {
  createCards();
  addTimes();
  tripDraw();
  changeTripHandler();
};

window.addEventListener('load', renderPage);
