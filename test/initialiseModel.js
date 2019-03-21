const assert = require('chai').assert;
const model = require('../modelSimulation/main.js');
const csvReader = require('csvtojson');

describe('initialise 10-country model', () => {
  const countriesTemplate = './R_Models/games/game_1/model/data/CountriesTemplate.csv';
  const virusSeverity = 0;

  describe('production mode', () => {
    let initialisationResult;

    before(async function() {
      this.timeout(5000);
      const initConditions = await csvReader().fromFile(countriesTemplate);
      initialisationResult = await model.initialise(initConditions, virusSeverity);
    })

    it(`should return an array`, () => {
      assert.isArray(initialisationResult)
    });
  });

  describe('test mode', () => {
    let initialisationResult, countries;
    const filePath = "./R_Models/games/game_1/model/data/Countries.csv";
    const fs = require('fs');

    before(async function(){
      if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      this.timeout(5000);
      const initConditions = await csvReader().fromFile(countriesTemplate);
      const testMode = true;
      initialisationResult = await model.initialise(initConditions, virusSeverity, testMode);
      countries = initialisationResult.countries;
    });

    it(`should return an object`, () => {
      assert.isObject(initialisationResult)
    });

    it(`should create a file named countries.csv`, () => {
      assert(fs.existsSync(filePath)) ;
    });

    it(`should have a 'countries' property`, () => {
      assert.property(initialisationResult, 'countries');
    })

    it(`should have a 'stocks' property`, () => {
      assert.property(initialisationResult, 'stocks');
    })

    it(`countries property should be an array`, () => {
      assert.isArray(countries)
    });

    it(`countries property should be of lenght 10`, () => {
      assert.lengthOf(countries, 10)
    } );

    it(`countries property should have specified keys in each element`, async() => {
      const expectedKeys = [
        'Name', 'Population', 'Category', 'ReportingDelay',
        'InitAntiviralStockpile', 'InitVaccineStockpile', 'InitVentilatorStockpile',
        'InitialFinancialResources', 'AntiviralCostPerUnit', 'VaccineCostPerUnit',
        'VentilatorCostPerUnit', 'Infected'];

      const validationResult = countries.map(row => {
        const keys = Object.keys(row);
        const rowValidation = expectedKeys.reduce((accumulator, currentValue) => {
          const search = keys.indexOf(currentValue);
          const validation = search > -1 ? true : false;
          return accumulator && validation;
        }, true);
        return rowValidation
      });
      const expectedResult = Array(10).fill(true);
      assert.deepEqual(validationResult, expectedResult);
    });
  });
});

describe('initialise single-country model', () => {
  describe('test mode', () => {
    let initialisationResult, stocks;

    before(async function(){
      this.timeout(5000);
      const countriesTemplate = './R_Models/games/game_1/model/data/singleCountryTemplate.csv';
      const initConditions = await csvReader().fromFile(countriesTemplate);
      const virusSeverity = 0;
      const testMode = true;
      initialisationResult = await model.initialise(initConditions, virusSeverity, testMode);
      stocks = initialisationResult.stocks;
      const filepath = './R_Models/games/game_1/model/Vensim/BOT/single_team_initialValues.csv'
      const data = await csvReader().fromFile(filepath);
      const vensimInit = data[0]
    })

    it(`should return an object`, () => {
      assert.isObject(initialisationResult)
    });

    it(`should have a 'stocks' property`, () => {
      assert.property(initialisationResult, 'stocks');
    });

    it(`stocks property should be an object`, () => {
      assert.isObject(initialisationResult.stocks);
    })

    it(`the number of stocks should be equal to Vensim's number of stocks`, () => {
      const actual = Object.keys(stocks).length;
      const expected = 42 // This should be obtained dynamically
      assert.equal(actual, expected)
    });

    it(`should return the stocks specified in the R script for the transmission sector`, () => {
      const tm_model_stocks = ["_TM_S","_TM_I1","_TM_I2","_TM_IQ","_TM_IAV",
        "_TM_IS","_TM_RV","_TM_RAV","_TM_RQ","_TM_RNI", "_TM_RAR","_TM_RS",
        "_TM_NRR","_TM_LTM", "_TM_RIR"]
      const expected = tm_model_stocks.map(stock => {return `Alpha${stock}`});
      const regex = "_TM_";
      const actual = Object.keys(stocks)
        .filter(stock => {return stock.match(regex)});
      assert.deepEqual(actual, expected);
    });

    it(`should return the stocks specified in the R script for the financial sector`, () => {
      const fm_model_stocks = ["_FM_R","_FM_TFRD","_FM_TSOVAC","_FM_TSOA",
        "_FM_TSOVEN","_FM_TFRR"]
      const expected = fm_model_stocks.map(stock => {return `Alpha${stock}`});
      const regex = "_FM_";
      const actual = Object.keys(stocks)
        .filter(stock => {return stock.match(regex)});
      assert.deepEqual(actual, expected);
    });

    it(`should return the stocks specified in the R script for the vaccine sector`, () => {
      const vac_model_stocks = ["_VAC_VSL","_VAC_VS","_VAC_TVSHR","_VAC_TVR",
        "_VAC_TVD","_VAC_TVS", "_VAC_TVO"]
      const expected = vac_model_stocks.map(stock => {return `Alpha${stock}`});
      const regex = "_VAC_";
      const actual = Object.keys(stocks)
        .filter(stock => {return stock.match(regex)});
      assert.deepEqual(actual, expected);
    });

    it(`should return the stocks specified in the R script for the antiviral sector`, () => {
      const av_model_stocks = ["_AVR_AVSL","_AVR_AVS","_AVR_TAVSHR","_AVR_TAVR",
        "_AVR_TAVD","_AVR_TAVS","_AVR_TAO"]
      const expected = av_model_stocks.map(stock => {return `Alpha${stock}`});
      const regex = "_AVR_";
      const actual = Object.keys(stocks)
        .filter(stock => {return stock.match(regex)});
      assert.deepEqual(actual, expected);
    });

    it(`should return the stocks specified in the R script for the ventilator sector`, () => {
      const ven_model_stocks = ["_VEN_VSL","_VEN_VS","_VEN_VIU","_VEN_TVR",
        "_VEN_TVD","_VEN_TVS","_VEN_TVO"]
      const expected = ven_model_stocks.map(stock => {return `Alpha${stock}`});
      const regex = "_VEN_";
      const actual = Object.keys(stocks)
        .filter(stock => {return stock.match(regex)});
      assert.deepEqual(actual, expected);
    });

    it(`should return the stock _CDL`, () => {
      assert.isAbove(Object.keys(stocks).indexOf('Alpha_CDL'), -1);
    })

    it(`should return the same initial values as Vensim model`, async() => {
      const filepath = './R_Models/games/game_1/model/Vensim/BOT/single_team_initialValues.csv'
      const data = await csvReader().fromFile(filepath);
      const expected = data[0];
      Object.keys(expected).forEach(key => {
        expected[key] = parseFloat((expected[key]))
      });
      const actual = stocks;
      assert.deepEqual(actual, expected)
    })

  });
});
