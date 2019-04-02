const assert = require('chai').assert;

module.exports = {
  'transmissionSector': function() {
    it(`In the transmission sector, all stocks should be non-negative`, function() {
      const bot = this.result.bot;
      const teams = this.teams;
      if(bot === undefined) {
        assert(false, 'bot property not found')
      }

      if(teams === undefined) {
        assert(false, 'teams property not found')
      }
      const tm_model_stocks = ["_TM_S","_TM_I1","_TM_I2","_TM_IQ","_TM_IAV",
        "_TM_IS","_TM_RV","_TM_RAV","_TM_RQ","_TM_RNI", "_TM_RAR","_TM_RS",
        "_TM_NRR","_TM_LTM", "_TM_RIR"];

      const tmStocks = [];

      teams.forEach(team => {
        tm_model_stocks.forEach(stock => {
          tmStocks.push(`${team}${stock}`)
        });
      });

      tmStocks.forEach(stock => {
        bot.forEach(row => {
          assert.isAtLeast(row[stock], 0);
        })
      })
    });
  },
  'financialSector': function() {
    it(`In the financial sector, all stocks should be non-negative`, function() {
      const bot = this.result.bot;
      const teams = this.teams;

      if(bot === undefined) {
        assert(false, 'bot property not found')
      }

      if(teams === undefined) {
        assert(false, 'teams property not found')
      }

      const fm_model_stocks = ["_FM_R","_FM_TFRD","_FM_TSOVAC","_FM_TSOA",
        "_FM_TSOVEN","_FM_TFRR"]

      const fmStocks = [];

      teams.forEach(team => {
        fm_model_stocks.forEach(stock => {
          fmStocks.push(`${team}${stock}`)
        });
      });

      fmStocks.forEach(stock => {
        bot.forEach(row => {
          assert.isAtLeast(row[stock], 0);
        })
      })
    });
  },
  'vaccineSector': function() {
    it(`In the vaccine sector, all stocks should be non-negative`, function() {
      const bot = this.result.bot;
      const teams = this.teams;

      if(bot === undefined) {
        assert(false, 'bot property not found')
      }

      if(teams === undefined) {
        assert(false, 'teams property not found')
      }

      const vac_model_stocks = ["_VAC_VSL","_VAC_VS","_VAC_TVSHR","_VAC_TVR",
        "_VAC_TVD","_VAC_TVS", "_VAC_TVO"]

      const vacStocks = [];

      teams.forEach(team => {
        vac_model_stocks.forEach(stock => {
          vacStocks.push(`${team}${stock}`)
        });
      });

      vacStocks.forEach(stock => {
        bot.forEach(row => {
          assert.isAtLeast(row[stock], 0);
        })
      })
    });
  },
  'antiviralSector': function () {
    it(`In the antiviral sector, all stocks should be non-negative`, function() {
      const bot = this.result.bot;
      const teams = this.teams;

      if(bot === undefined) {
        assert(false, 'bot property not found')
      }

      if(teams === undefined) {
        assert(false, 'teams property not found')
      }

      const av_model_stocks = ["_AVR_AVSL","_AVR_AVS","_AVR_TAVSHR","_AVR_TAVR",
        "_AVR_TAVD","_AVR_TAVS","_AVR_TAO"]

      const avStocks = [];

      teams.forEach(team => {
        av_model_stocks.forEach(stock => {
          avStocks.push(`${team}${stock}`)
        });
      });

      avStocks.forEach(stock => {
        bot.forEach(row => {
          assert.isAtLeast(row[stock], 0);
        })
      })
    });
  },
  'ventilatorSector': function() {
    it(`In the ventilator sector, all stocks should be non-negative`, function() {
      const bot = this.result.bot;
      const teams = this.teams;

      if(bot === undefined) {
        assert(false, 'bot property not found')
      }

      if(teams === undefined) {
        assert(false, 'teams property not found')
      }
      
      const ven_model_stocks = ["_VEN_VSL","_VEN_VS","_VEN_VIU","_VEN_TVR",
        "_VEN_TVD","_VEN_TVS","_VEN_TVO"]

      const venStocks = [];

      teams.forEach(team => {
        ven_model_stocks.forEach(stock => {
          venStocks.push(`${team}${stock}`)
        });
      });

      venStocks.forEach(stock => {
        bot.forEach(row => {
          assert.isAtLeast(row[stock], 0);
        })
      })
    });
  }

}
