import * as d3 from 'd3';

export const drawHorizontalTable = (dataset, divId) => {
  const keys = Object.keys(dataset[0]);
  console.log(keys);
  const table = d3.select(`#${divId}`)
                  .append('table')
                  .attr('class', 'mx-auto tblCaseStudy');
  const rows = 2;
  let tr;
  for(let i = 0; i < rows; i++){
    tr = table.append('tr');
    for(let j = 0; j < dataset.length; j++){
      tr.append('td')
        .attr('class', 'px-2')
        .text(dataset[j][keys[i]]);
    }
  }
}
