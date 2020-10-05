import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

/* инициализируем select */
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

/* экспортируем функцию для получения инстанса select */
export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

/* инициализируем autocomplete */
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete);

/* экспортируем функцию для получения инстанса autocomplete */
export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

/* инициализируем datepicker */
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: 'yyyy-mm'
});

/* экспортируем функцию для получения инстанса datepicker */
export function getDatepickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}

/* инициализируем dropdown */
const dropDown = document.querySelectorAll('.dropdown-trigger');
M.Dropdown.init(dropDown);

/* экспортируем функцию для получения инстанса dropdown */
export function getDropDownInstance(elem) {
  return M.Dropdown.getInstance(elem)
}