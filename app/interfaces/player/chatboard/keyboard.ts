const $ = require('jquery');

export const onKeyPressing = () => {
  $(document).keypress(e => {
    if(e.which == 13) {
      if($('#iptMessage').is(":focus")){
        $('#bSendMessage').click();
      }
    }
  });
}
