const $ = require('jquery');

export const onClick = () => {
  $('#bRandomSpec').click(() => {
    $('.cardTeam').each(function(){
      // 0 is excluded given that it's 'please choose'
      const randomPop = Math.round(Math.random() * 2 + 1);
      $(`#${this.id} .selPopSize option:eq(${randomPop})`)
        .prop('selected', true);

      const randomPop2 = Math.round(Math.random() * 2 + 1);
      $(`#${this.id} .selIncSize option:eq(${randomPop2})`)
        .prop('selected', true)
    });
  });
}
