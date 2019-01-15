const $ = require('jquery');
const selectpicker = require('bootstrap-select');

export const buildSelects = () => {
  $('.selectpicker').selectpicker();
}

/**
 * Add options in a select
 * @param {Object} params - Function's parameters.
 * @param {string} params.items - Array of objects. Each object has two keys: the value of the option & its display text.
 * @param {string} params.selectId - Id of the select which options will be added.
 */
export const addOptions = params => {
  console.log(params.items);
  $.each(params.items, function (i, item) {
    $(`#${params.selectId}`).append($('<option>', {
        value: item.value,
        text : item.text
    }));
  });
}

export const buildGroup = selectClass => {
  $(`.${selectClass}`).each(function() {
    $(this).selectpicker();
  })
}
