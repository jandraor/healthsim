import * as d3 from 'd3';

export const drawSquaredIsland = (svg_Id, n_countries) => {
  const countries_available = [
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
    'Iota', 'Kappa'
  ];

  const countries = countries_available.filter((country, i) => {
    return i < n_countries
  });

  const margin = {'top': 5, 'left': 5, 'right': 5, 'bottom': 5}

  const svg = d3.select(`#${svg_Id}`)
      .attr('class', 'd-block mx-auto');

  const length = 100;

  countries.forEach((country, i) => {
    const pos = i + 1;
    const row = Math.ceil(pos / 3);
    const col = (pos % 3 === 0) ? 3 : pos % 3;
    svg.append('rect')
        .attr('x', margin.top + length * (col - 1))
        .attr('y', margin.left + length * (row - 1))
        .attr('width', length)
        .attr('height', length)
        .attr('stroke', '#8A8F8A')
        .attr('fill', '#C9D7C4')

    svg.append('text')
       .attr('x', (margin.top + length * (col - 1)) +  length / 2)
       .attr('y', (margin.left + length * (row - 1)) + length / 2)
       .attr('text-anchor', 'middle')
       .text(country)
  })
}
