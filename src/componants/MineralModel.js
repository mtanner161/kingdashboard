import MineralModelFunctions from './MineralModelFunctions';

function MineralModel(selectedPriceIndex, rawStockJson, 
                      rawLifeTimeJson, rawSubTechnologiesJson,
                      rawTechIntensityJson, rawCurrentProductionJson,
                      rawMineralRecyclingRatesJson, 
                      rawMetalToMineralConversionJson, rawMineralPricesJson)
{
  // Pull out the list of technologies and the raw stock data

  var rawStockResults = MineralModelFunctions.parseJsonFile(rawStockJson);

  var rawStockData = rawStockResults[1];
  var techList = rawStockResults[0];

  const numTechnologies = techList.length;

  // Remove the first column (years) from the raw Stock data

  var StockData = MineralModelFunctions.removeColumn(rawStockData, 0);

  var yearsInList = MineralModelFunctions.getColumn(rawStockData, 0);

  var numYears = yearsInList.length - 1;

  // Compute difference in Stock usage from year to year

  let DeltaS = MineralModelFunctions.arrayDiff(StockData);

  // Read in the life time data

  var rawLifeTimeResults = MineralModelFunctions.parseJsonFile(rawLifeTimeJson);

  var L = rawLifeTimeResults[1][0];

  var InFlow = Array();

  // Loop over all technologies in matrix DeltaS to compute the In flow

  for (var m = 0; m < numTechnologies-1; m++)
  {
      let y = L[m];

      var DeltaS_tech = MineralModelFunctions.getColumn(DeltaS, m);

      // Create matrix of size numYears filled with all zeros
      var D = MineralModelFunctions.makeArray(numYears, numYears, 0.0);

      // Place one on the main diagonal
      D = MineralModelFunctions.addVectorToNegDiag(D, 1, 0);

      // Fill matrix for stock calculation start with for loop to
      // add the off diagonal elements
      for (var k = 0; k < numYears - 1; k++)
      {
          var l = numYears - k - 1;

          var g = -MineralModelFunctions.MFA(k+1, y);

          D = MineralModelFunctions.addVectorToNegDiag(D, g, k+1);
      }

      // Multiply by the inverse matrix to get inflow
      var invD = MineralModelFunctions.inverse(D);
      var inflow = MineralModelFunctions.matrixVectorMultiply(invD, DeltaS_tech);

      // Save mth column of matrix Inflow
      InFlow.push(inflow);

  }

  InFlow = MineralModelFunctions.transpose(InFlow);

  // Create Outflow matrix for use in recycling calculations

  var OutFlow = MineralModelFunctions.subtractMatrices(InFlow, DeltaS);

  // Set the data with number of sub-technologies

  var n = rawSubTechnologiesJson.length;

  var rawSubTechnologiesResults = [];
  for (var i = 0; i < n; i++)
  {
    rawSubTechnologiesResults[i] = MineralModelFunctions.parseJsonFile(rawSubTechnologiesJson[i]);
  }

  var techListWithSubTechs = rawSubTechnologiesResults[1][0];

  var numSubTechs = rawSubTechnologiesResults[0][1][0];

  // Breakdown flows for different sub-technology types within a resource
  // (e.g. solar, battery, etc.)

  var subTechCounter = 0;
  var TechInFlow = Array();
  var TechOutFlow = Array();
  for (let m = 0; m < numTechnologies-1; m++)
  {
    var num = numSubTechs[m];
    if (num == 1)
    {
      var inFlowCol = MineralModelFunctions.getColumn(InFlow, m);
      TechInFlow.push(inFlowCol);

      var outFlowCol = MineralModelFunctions.getColumn(OutFlow, m);
      TechOutFlow.push(outFlowCol);
    }
    else
    {
      var inFlowCol = MineralModelFunctions.getColumn(InFlow, m);
      var outFlowCol = MineralModelFunctions.getColumn(OutFlow, m);

      subTechCounter = subTechCounter + 1;
      var rawResults = rawSubTechnologiesResults[subTechCounter][1];

      var G = rawResults;

      var subMatrixIn = Array();
      var subMatrixOut = Array();
      for (let k = 0; k < numYears; k++)
      {
        var colIn = [];
        var colOut = [];

        for (let l = 0; l < num; l++)
        {
          colIn[l] = G[k][l] * inFlowCol[k];
          colOut[l] = G[k][l] * outFlowCol[k];
        }
        subMatrixIn.push(colIn);
        subMatrixOut.push(colOut);
      }
      for (let i = 0; i < subMatrixIn[0].length; i++)
      {
        TechInFlow.push(MineralModelFunctions.getColumn(subMatrixIn, i));
        TechOutFlow.push(MineralModelFunctions.getColumn(subMatrixOut, i));
      }
    }
  }
  TechInFlow = MineralModelFunctions.transpose(TechInFlow);
  TechOutFlow = MineralModelFunctions.transpose(TechOutFlow);

  // Import current production rates of materials for comparison

  var rawCurrentProductionResults = MineralModelFunctions.parseJsonFile(rawCurrentProductionJson);

  var completeMaterialList = rawCurrentProductionResults[0];
  var CurrentMatProd = rawCurrentProductionResults[1][0];
  var totalNumMaterials = completeMaterialList.length;

  // Calculate material flows - multiply material intensity by tech inflows

  var rawTechIntensityResults = MineralModelFunctions.parseJsonFile(rawTechIntensityJson);

  var techIntensityMaterialList = rawTechIntensityResults[0];
  var techIntensity = rawTechIntensityResults[1];

  // Remove the first two columns and place the results back in the same array

  techIntensity = MineralModelFunctions.removeColumn(techIntensity, 0);
  techIntensity = MineralModelFunctions.removeColumn(techIntensity, 0);
  techIntensity = MineralModelFunctions.replaceBlanksWithZeros(techIntensity);

  // Loop over each technology and create material demand per year

  var totalTechCount = TechInFlow[0].length;

  var MaterialFlow = [];
  var MaterialFlowOutEOL = [];
  var MaterialFlowIn = [];
  for (let i = 0; i < totalTechCount; i++)
  {
    var inFlowPerYear = MineralModelFunctions.getColumn(TechInFlow, i);
    var outFlowPerYear = MineralModelFunctions.getColumn(TechOutFlow, i);
    var intensityForTech = MineralModelFunctions.getRow(techIntensity, i);

    // Multiply elements of Inflow and Tech Intensity to get
    // matrix of mineral flows by year

    var B = MineralModelFunctions.colArrayTimesRowArray(inFlowPerYear, intensityForTech);
    var Bout = MineralModelFunctions.colArrayTimesRowArray(outFlowPerYear, intensityForTech);
    Bout = MineralModelFunctions.arrayMultByConstant(Bout, -1.0);

    // Put the results into the ith page of a material flow in matrix

    MaterialFlow.push(B);   // Dimension = [Tech X [Materials X Years]]
    MaterialFlowOutEOL.push(Bout);

    // Replace all negatives of MaterialFlow (outflow) as 0 before creating pages
    // of Material In Flow

    var negB = MineralModelFunctions.replaceNegValuesWithZeros(B);

    MaterialFlowIn.push(negB);
  }

  // Sum across the technology types to get the total material demands by
  // year, separate material flow in and out depending on inflows and outflows

  // Replace all positives of MaterialFlow (inflow) with 0 and then switch signs

  var n1 = MaterialFlow.length;
  var n2 = MaterialFlow[0].length;
  var n3 = MaterialFlow[0][0].length;

  var MaterialFlowOutPre = new Array(n1);
  for (let i = 0; i < n1; i++)
  {
    MaterialFlowOutPre[i] = new Array(n2);
    for (let j = 0; j < n2; j++)
    {
      MaterialFlowOutPre[i][j] = new Array(n3);
      for (let k = 0; k < n3; k++)
      {
        if (MaterialFlow[i][j][k] < 0)
        {
          MaterialFlowOutPre[i][j][k] = -1.0 * MaterialFlow[i][j][k]
        } else
        {
          MaterialFlowOutPre[i][j][k] = 0.0;
        }
      }
    }
  }

  var MaterialFlowOut = MineralModelFunctions.addMatrices(MaterialFlowOutPre, MaterialFlowOutEOL);

  var TotalMaterialFlowIn = MineralModelFunctions.sumAcross3DArrayIndex(MaterialFlowIn, 1);
  var TotalMaterialFlowOut = MineralModelFunctions.sumAcross3DArrayIndex(MaterialFlowOut, 1);

  // Get the second column which contains the recycling rate values

  var rawMineralRecyclingRatesResults = MineralModelFunctions.parseJsonFile(rawMineralRecyclingRatesJson);

  var EolTemp = MineralModelFunctions.getColumn(rawMineralRecyclingRatesResults[1], 1);
  var recyclingMineralsList = MineralModelFunctions.getColumn(rawMineralRecyclingRatesResults[1], 0);

  // Pull out from the recycling data the values for only the minerals in the list
  // defined from the Tech Intensity data file. Keep in the same order

  var Eolrr = [];
  for (let i = 0; i < completeMaterialList.length; i++)
  {
    for (let j = 0; j < recyclingMineralsList.length; j++)
    {
      if (completeMaterialList[i].includes(recyclingMineralsList[j]))
      {
        Eolrr[i] = EolTemp[j];
        break;
      }
    }
  }

  // At this point you could pull out a selected set from the material list
  // Not doing right now.  For now keep the entire list

  var keepNumMaterials = totalNumMaterials;

  // Use recycling rates to split inflows into virgin and recycled materials

  var MaterialFlowInFromRR = [];
  for (let i = 0; i < totalTechCount; i++)
  {
    MaterialFlowInFromRR[i] = [];
    for (let j = 0; j < numYears; j++)
    {
      MaterialFlowInFromRR[i][j] = [];
      for (let k = 0; k < keepNumMaterials; k++)
      {
        MaterialFlowInFromRR[i][j][k] = Eolrr[k] * MaterialFlowOut[i][j][k];
      }
    }
  }

  var MaterialFlowInVirgin = MineralModelFunctions.subtractMatrices(MaterialFlowIn, MaterialFlowInFromRR);

  // Sum across the technologies

  var TotalMaterialFlowInFromRR = MineralModelFunctions.sumAcross3DArrayIndex(MaterialFlowInFromRR, 1);
  var TotalMaterialFlowInVirgin = MineralModelFunctions.sumAcross3DArrayIndex(MaterialFlowInVirgin, 1);

  // Set tonne metal-to-tonne mineral mineral conversion table

  var rawMetalToMineralConversionResults = MineralModelFunctions.parseJsonFile(rawMetalToMineralConversionJson);
  
  var MineralListTradeName = MineralModelFunctions.getColumn(rawMetalToMineralConversionResults[1], 1);
  var MineralConvFactor = MineralModelFunctions.getColumn(rawMetalToMineralConversionResults[1], 8)

  // Pull out the mineral conversion factors for the selected materials
  // For now keep them all

  // Compute the Virgin Mineral Flow

  var MineralFlowInVirgin = [];
  for (let i = 0; i < totalTechCount; i++)
  {
    MineralFlowInVirgin[i] = [];
    for (let j = 0; j < numYears; j++)
    {
      MineralFlowInVirgin[i][j] = [];
      for (let k = 0; k < keepNumMaterials; k++)
      {
        MineralFlowInVirgin[i][j][k] = MineralConvFactor[k] * MaterialFlowInVirgin[i][j][k];
      }
    }
  }

  // MARKET SIZING FOR VIRGIN MATERIALS

  var rawMineralPricesResults = MineralModelFunctions.parseJsonFile(rawMineralPricesJson);

  var MineralListWithPrices = MineralModelFunctions.getColumn(rawMineralPricesResults[1], 0);

  // Pull out from the price data the values for only the minerals in the list
  // defined from the Tech Intensity data file. Keep in the same order

  var tempPrice = MineralModelFunctions.getColumn(rawMineralPricesResults[1], 3);
  var VirginPricesLow = [];
  for (let i = 0; i < completeMaterialList.length; i++)
  {
    for (let j = 0; j < MineralListWithPrices.length; j++)
    {
      if (completeMaterialList[i].includes(MineralListWithPrices[j]))
      {
        VirginPricesLow[i] = tempPrice[j];
        break;
      }
    }
  }

  tempPrice = MineralModelFunctions.getColumn(rawMineralPricesResults[1], 4);
  var VirginPricesMedium = [];
  for (let i = 0; i < completeMaterialList.length; i++)
  {
    for (let j = 0; j < MineralListWithPrices.length; j++)
    {
      if (completeMaterialList[i].includes(MineralListWithPrices[j]))
      {
        VirginPricesMedium[i] = tempPrice[j];
        break;
      }
    }
  }

  tempPrice = MineralModelFunctions.getColumn(rawMineralPricesResults[1], 5);
  var VirginPricesHigh = [];
  for (let i = 0; i < completeMaterialList.length; i++)
  {
    for (let j = 0; j < MineralListWithPrices.length; j++)
    {
      if (completeMaterialList[i].includes(MineralListWithPrices[j]))
      {
        VirginPricesHigh[i] = tempPrice[j];
        break;
      }
    }
  }

  var VirginPrices = [];
  if (selectedPriceIndex == 1)
  {
    VirginPrices = VirginPricesLow;
  } else if (selectedPriceIndex == 2)
  {
    VirginPrices = VirginPricesMedium;
  } else if (selectedPriceIndex == 3)
  {
    VirginPrices = VirginPricesHigh;
  }

  //  Sum data for all 50 years together 
  // (keep technologies and materials separate)
  // The dimension of the cumulative arrays is [numTech X numMaterials]

  var CumulativeMaterialFlowInVirginByTech = MineralModelFunctions.sumAcross3DArrayIndex(MaterialFlowInVirgin, 2);
  var CumulativeMaterialFlowOutByTech = MineralModelFunctions.sumAcross3DArrayIndex(MaterialFlowOut, 2);

  // Find yearly market size data per technology and material using a loop

  var VirginMarketSizeLow = [];
  var VirginMarketSizeMedium = [];
  var VirginMarketSizeHigh = [];
  for (let i = 0; i < totalTechCount; i++)
  {
    VirginMarketSizeLow[i] = [];
    VirginMarketSizeMedium[i] = [];
    VirginMarketSizeHigh[i] = [];
    for (let j = 0; j < numYears; j++)
    {
      VirginMarketSizeLow[i][j] = [];
      VirginMarketSizeMedium[i][j] = [];
      VirginMarketSizeHigh[i][j] = [];
      for (let k = 0; k < keepNumMaterials; k++)
      {
        VirginMarketSizeLow[i][j][k] = VirginPricesLow[k] * MaterialFlowInVirgin[i][j][k];
        VirginMarketSizeMedium[i][j][k] = VirginPricesMedium[k] * MaterialFlowInVirgin[i][j][k];
        VirginMarketSizeHigh[i][j][k] = VirginPricesHigh[k] * MaterialFlowInVirgin[i][j][k];
      }
    }
  }

  // Sum across technologies

  var TotalVirginMarketSizeLow = MineralModelFunctions.sumAcross3DArrayIndex(VirginMarketSizeLow, 1);
  var TotalVirginMarketSizeMedium = MineralModelFunctions.sumAcross3DArrayIndex(VirginMarketSizeMedium, 1);
  var TotalVirginMarketSizeHigh = MineralModelFunctions.sumAcross3DArrayIndex(VirginMarketSizeHigh, 1);

  // Find reference yearly production and reference yearly market size based on
  // reference production values if current production continues

  // Pull out the data for the selected materials
  // For now take them all

  var VirginPricesForSelectedMaterial = VirginPrices;
  var CurrentMatProdForSelectedMaterial = CurrentMatProd;

  var RefProduction = [];
  var RefMarketSize = [];
  for (let i = 0; i < numYears; i++)
  {
    RefProduction[i] = [];
    RefMarketSize[i] = [];
    for (let j = 0; j < keepNumMaterials; j++)
    {
      RefProduction[i][j] = CurrentMatProdForSelectedMaterial[j];
      RefMarketSize[i][j] = CurrentMatProdForSelectedMaterial[j] * VirginPricesForSelectedMaterial[j];
    }
  }

  // Find cumulative reference market (added from 2000 to 2050)

  var CumulativeRefProduction = MineralModelFunctions.sumAcross2DArrayIndex(RefProduction, 1);
  var CumulativeRefMarketSize = MineralModelFunctions.sumAcross2DArrayIndex(RefMarketSize, 1);

  // Find cumulative market size data per technology and material using a
  // continuous loop (added from 2000 to 2050)

  var CumulativeVirginMarketSize = [];
  for (let i = 0; i < keepNumMaterials; i++)
  {
    CumulativeVirginMarketSize[i] = [];
    for (let j = 0; j < totalTechCount; j++)
    {
      CumulativeVirginMarketSize[i][j] = CumulativeMaterialFlowInVirginByTech[j][i] * VirginPricesForSelectedMaterial[i];
    }
  }

  // Save results for writing out to file

  sessionStorage.setItem('TotalVirginMarketSizeLow', JSON.stringify(TotalVirginMarketSizeLow));
  sessionStorage.setItem('TotalVirginMarketSizeMedium', JSON.stringify(TotalVirginMarketSizeMedium));
  sessionStorage.setItem('TotalVirginMarketSizeHigh', JSON.stringify(TotalVirginMarketSizeHigh));
  sessionStorage.setItem('TotalMaterialFlowInFromRR', JSON.stringify(TotalMaterialFlowInFromRR));
  sessionStorage.setItem('TotalMaterialFlowInFromVirgin', JSON.stringify(TotalMaterialFlowInVirgin));
  sessionStorage.setItem('YearsAndMaterialList', JSON.stringify([yearsInList, completeMaterialList]));
  
}

export default MineralModel;