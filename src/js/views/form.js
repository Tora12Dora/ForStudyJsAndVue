import {
  getAutocompleteInstance,
  getDatepickerInstance
} from "../plugins/materialize";

class FormUI {
  constructor(autocompleteInstance, datepickerInstance) {
    this._form = document.forms["location-controls"]; /* свойство приватное */
    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.depart = document.getElementById("datepicker-depart");
    this.return = document.getElementById("datepicker-return");

    /* получаем инстансы */
    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departDatePicker = datepickerInstance(this.depart);
    this.returnDatePicker = datepickerInstance(this.return);
  }

  /* создаем геттер для получения формы */
  get form() {
    return this._form;
  }

  /* геттеры для получения данных из инпутов */
  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDatePicker.toString();
  }

  get returnDateValue() {
    return this.returnDatePicker.toString();
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickerInstance);

export default formUI;