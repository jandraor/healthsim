import * as map from "../../components/map.ts";

export const build = initParams => {
  console.log(initParams)
  const n_teams = initParams.otherTeams.length + 1;
  map.drawSquaredIsland('svgMap', n_teams);
}
