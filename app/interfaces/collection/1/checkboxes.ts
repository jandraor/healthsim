const $ = require('jquery');

export const reset = () => {
  $('.cb').each(function() {
    $(this)
      .prop('checked', false)
      .attr("disabled", false);
  })
}
