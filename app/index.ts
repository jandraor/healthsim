import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-social/bootstrap-social.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import * as d3 from 'd3';

import 'bootstrap';

import * as templates from './templates.ts';

/**
* Convenience method to fetch and decode JSON.
*/
const fetchJSON = async (url, method = 'GET') => {
try {
const response = await fetch(url, {method, credentials: 'same-origin'});
return response.json();
} catch (error) {
return {error};
}
};



/**
 * Show an alert to the user.
 */
const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.hs-alerts');
  const html = templates.alert({type, message});
  alertsElement.insertAdjacentHTML('beforeend', html);
};

/**
 * Use Window location hash to show the specified view.
 */
const showView = async() => {
  const mainElement = document.body.querySelector('.hs-main');
  const [view, ...params] = window.location.hash.split('/');

  switch(view) {
    case '#welcome':
      const session = await fetchJSON('/api/session');
      mainElement.innerHTML = templates.welcome({session});
      //Width and height
      var w = 500;
      var h = 50;
      const dataset = [ 5, 10, 15, 20, 25 ];

      var svg = d3.select(".hs-main").append("svg");
      console.log(dataset);
      var circles = svg.selectAll("circle")
                      .data(dataset)
                      .enter()
                      .append("circle");

                      circles.attr("cx", function(d, i) {
                return (i * 50) + 25;
                })
                .attr("cy", h/2)
                .attr("r", function(d) {
                return d;
                });

      if (session.error) {
        showAlert(session.error);
      }
      break;
    default:
      // Unrecognised view.
      throw Error(`Unrecognised view: ${view}`);
    }
  };

// Page setup.
(async () => {
  const session = await fetchJSON('/api/session');
  document.body.innerHTML = templates.main({session});
  window.addEventListener('hashchange', showView);
  showView().catch(err => window.location.hash = '#welcome');
})();
