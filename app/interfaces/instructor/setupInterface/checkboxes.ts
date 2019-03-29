const $ = require('jquery');

export const build = () => {
  $('.cbInfected').change(function() {
    const id = this.id;

    if(this.checked) {
      $('.cbInfected').each((i, obj) => {
        if(obj.id != id) {
          $(`#${obj.id}`).attr("disabled", true)
        }
      });
    }

    if(!this.checked) {
      $('.cbInfected').each((i, obj) => {
        if(obj.id != id) {
          $(`#${obj.id}`).attr("disabled", false)
        }
      });
    }
  });
}
