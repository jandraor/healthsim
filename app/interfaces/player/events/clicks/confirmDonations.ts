const $ = require('jquery');

export const build = () => {
  const buttons = ['bCnfAntDon'];
  $(`#${buttons[0]}`).click(() => {
    let totalDonation = 0;
    $(`.lAntDon`).each(function() {
      const donationValue = parseInt($(`#${this.id}`).text());
      totalDonation = totalDonation + donationValue;
    });
    $(`#lAntToDonate`).text(totalDonation);
  });
}
