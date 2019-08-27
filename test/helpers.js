module.exports = matrix => {

    if(!Array.isArray(matrix)) {
      return false
    }

    if(matrix.length === 0) {
      return false
    }

    const rowValidation = matrix.map(row => {
      return Array.isArray(row)
    })


    const eachElementIsArray = rowValidation.indexOf(false) > -1 ? false : true;

    if(eachElementIsArray === false){
      //An atomic vector of length 1 is considered as squared matrix  
      if(matrix.length === 1 && !isNaN(matrix[0])) {
        return true;
      }
      return false
    }

    const colNum = matrix.map(row => {
      return row.length;
    });

    const identicalCols = colNum.every( (val, i, arr) => val === arr[0] );

    if(identicalCols === false){
      return false
    }
    const rows = matrix.length;
    const cols = matrix[0].length;

    const equalDimensions = rows === cols ? true : false;

    if(equalDimensions === false){
      return false
    }

    return true
}
