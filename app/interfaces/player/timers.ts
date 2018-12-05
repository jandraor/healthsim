import * as d3 from 'd3';

export const countdown = () => {
  // Set the date we're counting down to
  //const countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();
  const startTime = d3.timeSecond(new Date());
  const countDownDate = d3.timeMinute.offset(startTime,5);
  const totalDistance = countDownDate - startTime;

  const timer = setInterval(() => {

  // Get todays date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  const pctDistance = 100 * distance / totalDistance;

  // Time calculations for minutes and seconds
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="pbCountdown"
  d3.select('#pbCountdown')
    .style('width', `${pctDistance}%`)
    .text(`${minutes}m ${seconds}s`);


  // If the count down is finished, write some text
  // if (distance < 0) {
  //   clearInterval(x);
  //   document.getElementById("demo").innerHTML = "EXPIRED";
  // }
}, 1000);
}
