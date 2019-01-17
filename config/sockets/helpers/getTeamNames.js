
const getTeamNames = (gameId, gameCollection) => {
  const ids = gameCollection.gameList.map(elem => {
    return elem.id;
  });
  const gamePos = ids.indexOf(gameId);
  const teamNames = gameCollection.gameList[gamePos].teams.map(elem => {
    return elem.name;
  });
  return teamNames
}

module.exports = getTeamNames;
