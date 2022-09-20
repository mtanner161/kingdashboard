// This file contains a bunch of helper functions used in
// the Mins MineralModel.js main model driver

// Simple function to convert json object to array

function parseJsonFile(value)
{
    var data = new Array();
    var header = [];

    let j = 0;
    value.forEach((res) => {

        j = j + 1;

        const rows = Object.keys(res).map(key => [key, res[key]]);

        if (j == 1)
        {
            for (let i = 0; i < rows.length; i++)
            {
                let temp = rows[i];
                header.push(temp[0]);
            }
        }

        var dd = [];

        let rowLength = rows.length;
        for (let i = 0; i < rowLength; i++)
        {
            let temp = rows[i];
            dd[i] = temp[1];
        }

        data.push(dd);

    })

    return [header, data];
}

// Function to include potential to vary lifetimes vs demand

function MFA(n, r)
{
    var ratio = n / r;
    var f = (3.5/r) * (Math.pow(ratio, 2.5) * Math.exp(-Math.pow(ratio, 3.5)));
    return f;
}

// Simple function to compute difference between all the rows in an array

function arrayDiff(inArray)
{
    let numRows = inArray.length;

    let outArray = new Array();
    for (let i = 0; i < numRows-1; i++)
    {
        let newRow = [];
        for (let j = 0; j < inArray[i].length; j++)
        {
            newRow[j] = inArray[i+1][j] - inArray[i][j];
        }
        outArray[i] = newRow;
    }
    return outArray;
}

// Simple function to remove a selected column from an array

function removeColumn(array, remIdx)
{
    var m = array.length;
    var n = array[0].length;
    var out = [];
    for (let i = 0; i < m; i++) {
        out[i] = [];
        let k = 0;
        for (let j = 0; j < n; j++) {
            if (j != remIdx) {
                out[i][k] = array[i][j];
                k = k + 1;
            }
        }
    }
    return out;
};

// Simple function to extract a single column from an array

function getColumn(matrix, col)
{
    var column = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
 }

 // Simple function to extract a single row from an array

function getRow(matrix, col)
{
    var column = [];
    for(var i = 0; i < matrix[0].length; i++){
       column.push(matrix[col][i]);
    }
    return column;
 }

// Simple function to subtract all the elements of two matrices

function subtractMatrices(mat1, mat2)
{
    var size1 = mat1.length;
    var size2 = mat1[0].length;

    var result = [];

    if (size2 != undefined)
    {
        var size3 = mat1[0][0].length;
        if (size3 != undefined)
        {
            for (let i = 0; i < size1; i++)
            {
                result[i] = [];
                for (let j = 0; j < size2; j++)
                {
                    result[i][j] = [];
                    for (let k = 0; k < size3; k++)
                    {
                        result[i][j][k] = mat1[i][j][k] - mat2[i][j][k];
                    }
                }
            }
        } else
        {
            for (let i = 0; i < size1; i++)
            {
                result[i] = [];
                for (let j = 0; j < size2; j++)
                {
                    result[i][j] = mat1[i][j] - mat2[i][j];
                }
            }
        }
    } else
    {
        for (let i = 0; i < size1; i++)
        {
            result[i] = mat1[i] - mat2[i];
        }
    }
    return result;
}

// Simple function to subtract all the elements of two matrices, up to dimension 3

function addMatrices(mat1, mat2)
{
    var size1 = mat1.length;
    var size2 = mat1[0].length;

    var result = [];

    if (size2 != undefined)
    {
        var size3 = mat1[0][0].length;
        if (size3 != undefined)
        {
            for (let i = 0; i < size1; i++)
            {
                result[i] = [];
                for (let j = 0; j < size2; j++)
                {
                    result[i][j] = [];
                    for (let k = 0; k < size3; k++)
                    {
                        result[i][j][k] = mat1[i][j][k] + mat2[i][j][k];
                    }
                }
            }
        } else
        {
            for (let i = 0; i < size1; i++)
            {
                result[i] = [];
                for (let j = 0; j < size2; j++)
                {
                    result[i][j] = mat1[i][j] + mat2[i][j];
                }
            }
        }
    } else
    {
        for (let i = 0; i < size1; i++)
        {
            result[i] = mat1[i] + mat2[i];
        }
    }
    return result;
}

// Simple function to add vector to kth negative diagonal

function addVectorToNegDiag(D, value, k)
{
    var numRows = D.length;

    for (let i = 0; i < numRows-k; i++)
    {
        D[k+i][i] = value;
    }

    return D;
}

// Create an array of dimension (w x h) with values in all entries

function makeArray(w, h, value) {
    var arr = [];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
            arr[i][j] = value;
        }
    }
    return arr;
}


function inverse(A)
{
    var temp,
    N = A.length,
    E = [];
   
    for (let i = 0; i < N; i++)
    {
        E[i] = [];
    }
   
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++) {
        E[i][j] = 0;
        if (i == j)
          E[i][j] = 1;
      }
   
    for (let k = 0; k < N; k++)
    {
      temp = A[k][k];
   
      for (let j = 0; j < N; j++)
      {
        A[k][j] /= temp;
        E[k][j] /= temp;
      }
   
      for (let i = k + 1; i < N; i++)
      {
        temp = A[i][k];
   
        for (let j = 0; j < N; j++)
        {
          A[i][j] -= A[k][j] * temp;
          E[i][j] -= E[k][j] * temp;
        }
      }
    }
   
    for (let k = N - 1; k > 0; k--)
    {
      for (let i = k - 1; i >= 0; i--)
      {
        temp = A[i][k];
   
        for (let j = 0; j < N; j++)
        {
          A[i][j] -= A[k][j] * temp;
          E[i][j] -= E[k][j] * temp;
        }
      }
    }
   
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        A[i][j] = E[i][j];

    return A;

  }

  function matrixMultiply(a, b)
  {
    var aNumRows = a.length, aNumCols = a[0].length;
    var bNumCols = b[0].length;
    var m = new Array(aNumRows);
    if (bNumCols == null)
    {
        bNumCols = 1;
    }
    for (var r = 0; r < aNumRows; ++r)
    {
      m[r] = new Array(bNumCols);
      for (var c = 0; c < bNumCols; ++c)
      {
        m[r][c] = 0;
        for (var i = 0; i < aNumCols; ++i)
        {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return m;
  }


  function matrixVectorMultiply(a, b)
  {
    var aNumRows = a.length;
    var aNumCols = a[0].length;
    var bNumRows = b.length;

    var m = [];

    for (var r = 0; r < aNumRows; ++r)
    {
        m[r] = 0;
        for (var i = 0; i < aNumCols; ++i)
        {
            m[r] += a[r][i] * b[i];
        }
    }
    return m;
  }

  // Return the transpose of a matrix

  function transpose(a)
  {
    return Object.keys(a[0]).map(function(c) {
       return a.map(function(r) {
          return r[c];
       });
    });
  }

  function replaceBlanksWithZeros(inArray)
  {
    var numRows = inArray.length;
    var numCols = inArray[0].length;
    var outArray = new Array(numRows);

    for (var i = 0; i < numRows; i++)
    {
        outArray[i] = new Array(numCols);
        for (var j = 0; j < numCols; j++)
        {
            if (inArray[i][j] == '')
            {
                outArray[i][j] = 0.0;
            } else {
                outArray[i][j] = inArray[i][j];
            }
        }
    }
    return outArray;
  }

  function replaceNegValuesWithZeros(inArray)
  {
    var numRows = inArray.length;
    var numCols = inArray[0].length;
    var outArray = new Array(numRows);

    for (var i = 0; i < numRows; i++)
    {
        outArray[i] = new Array(numCols);
        for (var j = 0; j < numCols; j++)
        {
            if (inArray[i][j] < 0.0)
            {
                outArray[i][j] = 0.0;
            } else {
                outArray[i][j] = inArray[i][j];
            }
        }
    }
    return outArray;
  }

  function arrayElementByElementMult(inArray1, inArray2)
  {
    var numRows = inArray1.length;
    var numCols = inArray1[0].length;
    var outArray = new Array(numRows);

    for (var i = 0; i < numRows; i++)
    {
        outArray[i] = new Array(numCols);
        for (var j = 0; j < numCols; j++)
        {
            outArray[i][j] = inArray1[i][j] * inArray2[i][j];
        }
    }
    return outArray;
  }

  // Multiply every element of an array by a constant

  function arrayMultByConstant(inArray, value)
  {
    var numRows = inArray.length;
    var numCols = inArray[0].length;
    var outArray = new Array(numRows);

    for (var i = 0; i < numRows; i++)
    {
        outArray[i] = new Array(numCols);
        for (var j = 0; j < numCols; j++)
        {
            outArray[i][j] = inArray[i][j] * value;
        }
    }
    return outArray;
  }

  // This function multiplies two vectors together where
  // the result is a matrix whoes dimension is
  // [length of first vector X length of second vector]

  function colArrayTimesRowArray(col, row)
  {
      var numRows = col.length;
      var numCols = row.length;

      var outArray = new Array(numRows);

      for (var i = 0; i < numRows; i++)
      {
          outArray[i] = new Array(numCols);
          for (var j = 0; j < numCols; j++)
          {
              outArray[i][j] = col[i] * row[j];
          }
      }
      return outArray;
  }

  function sumAcross3DArrayIndex(inArray, indx)
  {
    var n1 = inArray.length;
    var n2 = inArray[0].length;
    var n3 = inArray[0][0].length;

    var results = [];
    if (indx == 1)
    {
        for (let j = 0; j < n2; j++)
        {
            results[j] = [];
            for (let k = 0; k < n3; k++)
            {
                let value = 0;
                for (let i = 0; i < n1; i++)
                {
                    value = value + inArray[i][j][k];
                }
                results[j][k] = value;
            }
        }
    }
    else if (indx == 2)
    {
        for (let i = 0; i < n1; i++)
        {
            results[i] = [];
            for (let k = 0; k < n3; k++)
            {
                let value = 0;
                for (let j = 0; j < n2; j++)
                {
                    value = value + inArray[i][j][k];
                }
                results[i][k] = value;
            }
        }
    }
    else
    {
        for (let i = 0; i < n1; i++)
        {
            results[i] = [];
            for (let j = 0; j < n2; j++)
            {
                var value = 0;
                for (let k = 0; k < n3; k++)
                {
                    value = value + inArray[i][j][k];
                }
                results[i][j] = value;
            }
        }
    }
    return results;
  }

  function sumAcross2DArrayIndex(inArray, indx)
  {
    var n1 = inArray.length;
    var n2 = inArray[0].length;

    var results = [];
    if (indx == 1)
    {
        for (let j = 0; j < n2; j++)
        {
            let value = 0;
            for (let i = 0; i < n1; i++)
            {
                value = value + inArray[i][j];
            }
            results[j] = value;
        }
    }
    else if (indx == 2)
    {
        for (let i = 0; i < n1; i++)
        {
            let value = 0;
            for (let j = 0; j < n2; j++)
            {
                value = value + inArray[i][j];
            }
            results[i] = value;
        }
    }
    return results;
  }

 // Specify the functions and make them available

  export default {arrayDiff, removeColumn, getColumn, getRow, makeArray, matrixMultiply, subtractMatrices,
          addMatrices, addVectorToNegDiag, matrixVectorMultiply, transpose, inverse,
          MFA, replaceBlanksWithZeros, replaceNegValuesWithZeros, arrayElementByElementMult,
          arrayMultByConstant, colArrayTimesRowArray, sumAcross2DArrayIndex,
          sumAcross3DArrayIndex, parseJsonFile}