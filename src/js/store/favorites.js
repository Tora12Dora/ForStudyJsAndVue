import {formatDate} from '../helpers/date';

class Favorites {
  constructor() {
    this.store = []; /* заводим пустой массив хранилища */
  }

  addTicketToStore(ticket) {
    let isInStore = this.isTicketInStore(ticket); /* булево значение нахождения/ненахождения
     билета в избранном */

    if (isInStore) { /* если билет уже есть в избранном, выводим сообщение и прекращаем работу */
      M.toast({html: 'Ticket had already added to favorite list', classes: 'pink darken-2'});
      return;
    }

    this.store.push(ticket); /* добавляем билет в избранное и вводим соответствующее сообщение */
    M.toast({html: 'Ticket has added to favorite list', classes: 'green lighten-1'});
  }

  isTicketInStore(ticket) { /* проверяем, находится ли билет в избранном */
    return this.store.some(item => JSON.stringify(item) === JSON.stringify(ticket))
  }

  removeTicketFromStore(ticket) {
    M.toast({html: 'Ticket has removed from favorite list', classes: 'green lighten-1'});
    this.store = this.store.filter(item => {
      return JSON.stringify(item) !== JSON.stringify(ticket);
    });
  }
}

const favorites = new Favorites();
export default favorites