import '../css/style.css';
import './plugins'; /* импортируем все плагины из /plugins/index.js */
import locations from './store/locations';
import favorites from "./store/favorites";
import formUI from './views/form';
import ticketsUI from './views/ticket';
import currencyUI from './views/currency';
import favoritesDropDownUI from './views/favoritesDropDown';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;

  /* обрабатываем событие отправки формы */
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  /* добавляем билет в избранное */
  ticketsUI.container.addEventListener('click', e => {
    if (e.target.classList.contains('add-favorite')) {
      let ticket = JSON.parse(e.target.dataset.currentTicket);
      favorites.addTicketToStore(ticket);
      favoritesDropDownUI.renderFavoriteTickets(favorites.store);
      e.target.innerText = 'Added to favorites';
      e.target.classList.add('darken-4');
    }
  });

  /* удаляем билет из избранного */
  favoritesDropDownUI.container.addEventListener('click', e => {
    if (e.target.classList.contains('delete-favorite')) {
      let ticket = JSON.parse(e.target.dataset.currentTicket);
      favorites.removeTicketFromStore(ticket);
      favoritesDropDownUI.renderFavoriteTickets(favorites.store);
      ticketsUI.renderedItems.forEach(el => {
        if (el.dataset.currentTicket === JSON.stringify(ticket)) {
          el.innerText = 'Add to favorite';
          el.classList.remove('darken-4');
        }
      })
    }
  });

  /* инит приложения */
  async function initApp() {
    await locations.init(); /* ждем получения locations */
    formUI.setAutocompleteData(
      locations.shortCitiesList
    ); /* передаем список городов в autocomplete */
  }

  async function onFormSubmit() {
    /* собираем данные из инпутов */
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({ /* получаем билеты */
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });

    ticketsUI.renderTickets(locations.lastSearch); /* рендерим билеты */
    if (favorites.store.length) {
      favoritesDropDownUI.renderFavoriteTickets(favorites.store);
    }
  }
});