const $ = require('jquery');

export const onClick = () => {
  $('#bEqualSpec').click(() => {
    $('.cardTeam').each(function(){
      const mediumPop = 2;
      $(`#${this.id} .selPopSize option:eq(${mediumPop})`)
        .prop('selected', true);

      const mediumInc = 2;
      $(`#${this.id} .selIncSize option:eq(${mediumInc})`)
        .prop('selected', true);

      $(`#${this.id} .cbInfected`).prop('checked', true);
    });
  });
}
