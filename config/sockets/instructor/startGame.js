'use strict';

const startGame = (socket, gameCollection, io, payload) => {
  const initConditions = payload.initConditions;
  console.log('=============Start===Init Conditions==========================');
  console.log(initConditions);
  console.log('=============End=====Init Conditions==========================');
  const writeCsv = require('../../../helpers/csvFiles.js');
  writeCsv(initConditions, './R_Models/games/game_1/model/data/Countries.csv');
  const exec = require('child_process').exec;
  const filePath = 'R_Models/games/game_1/srv_initialise.R';
  const fs = require('fs');
  if(!fs.existsSync(filePath)){
      const error = {
        'statusCode': 404,
        'error': 'File not found'
      };
      console.log(error);
  }

  exec(`Rscript ${filePath}`, (error, stdout, stderr) => {
    console.log(`stdout srv_initialise: ${stdout}`);
    const initValues = JSON.parse(stdout);
    console.log('==========================================================');
    console.log('The instructor wants to start the game');
    console.log(payload);
    console.log('==========================================================');
    const gameId = payload.gameId;
    console.log('======================Game Collection=====================');
    console.log(gameCollection);
    console.log('==========================================================');
    const ids = gameCollection.gameList.map(elem => {
      return elem.id;
    });
    const gamePos = ids.indexOf(gameId);
    //it might be replaced by
    //gamePos = findGamePos(gameId);
    gameCollection.gameList[gamePos].status = 'on flight';
    const teamNames = gameCollection.gameList[gamePos].teams.map(elem => {
      return elem.name;
    });
    console.log('======================Initial stock values==================');
    console.log(initValues);
    console.log('======================Initial stock values==================');

    teamNames.forEach(elem => {
      const recipientTeam = elem;
      const otherTeams = teamNames.filter(elem2 => {
        return elem2 != recipientTeam;
      });

      const teamData = initValues.filter(dataRow => {
        return dataRow.Name === recipientTeam;
      });

      console.log(teamData);

      const playerPayload = {
        'yourTeam': recipientTeam,
        'otherTeams': otherTeams,
        'resources': {
          'antivirals': teamData[0].InitAntiviralStockpile,
          'vaccines': teamData[0].InitVaccineStockpile,
          'ventilators': teamData[0].InitVentilatorStockpile,
          'financial': teamData[0].InitialFinancialResources,
        },
        'unitCosts': {
          'antivirals': teamData[0].AntiviralCostPerUnit,
          'vaccines': teamData[0].VaccineCostPerUnit,
          'ventilators': teamData[0].VentilatorCostPerUnit,
        }
      }
      console.log('==========================Object teams======================');
      console.log(playerPayload);
      console.log('============================================================');
      io.to(`${recipientTeam}_${gameId}`).emit('game started', playerPayload);
    });
    const instructorPayload = {
      'teams': teamNames,
      'rounds': payload.rounds
    }
    io.to(`instructor_${gameId}`).emit('game started', instructorPayload);
    console.log('=========================Game===============================');
    gameCollection.gameList[gamePos]
    console.log('============================================================');
  });
}

module.exports = startGame;
