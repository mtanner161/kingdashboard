import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function DemandData(props) {
  const data = props.value;

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "year", headerName: "Year", width: 110 },
    { field: "aluminum", headerName: "Aluminum", width: 110 },
    { field: "cadmium", headerName: "Cadmium", width: 110 },
    { field: "chromium", headerName: "Chromium", width: 110 },
    { field: "cobalt", headerName: "Cobalt", width: 110 },
    { field: "copper", headerName: "Copper", width: 110 },
    { field: "dysprosium", headerName: "Dysprosium", width: 110 },
    { field: "hafnium", headerName: "Hafnium", width: 110 },
    { field: "indium", headerName: "Indium", width: 110 },
    { field: "iron", headerName: "Iron", width: 110 },
    { field: "lead", headerName: "Lead", width: 110 },
    { field: "lithium", headerName: "Lithium", width: 110 },
    { field: "magnesium", headerName: "Magnesium", width: 110 },
    { field: "manganese", headerName: "Manganese", width: 110 },
    { field: "molybdenum", headerName: "Molybdenum", width: 110 },
    { field: "neodymium", headerName: "Neodymium", width: 110 },
    { field: "nickel", headerName: "Nickel", width: 110 },
    { field: "niobium", headerName: "Niobium", width: 110 },
    { field: "praseodymium", headerName: "Praseodymium", width: 110 },
    { field: "selenium", headerName: "Selenium", width: 110 },
    { field: "silicon", headerName: "Silicon", width: 110 },
    { field: "steel", headerName: "Steel", width: 110 },
    { field: "tantalum", headerName: "Tantalum", width: 110 },
    { field: "tellurium", headerName: "Tellurium", width: 110 },
    { field: "terbium", headerName: "Terbium", width: 110 },
    { field: "thulium", headerName: "Thulium", width: 110 },
    { field: "tin", headerName: "Tin", width: 110 },
    { field: "titanium", headerName: "Titanium", width: 110 },
    { field: "tungsten", headerName: "Tungsten", width: 110 },
    { field: "vanadium", headerName: "Vanadium", width: 110 },
    { field: "yetterbium", headerName: "Yetterbium", width: 110 },
    { field: "yttrium", headerName: "Yttrium", width: 110 },
    { field: "zinc", headerName: "Zinc", width: 110 },
    { field: "zirconium", headerName: "Zirconium", width: 110 },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    year: row.year,
    aluminum: row.aluminum,
    antimony: row.antimony,
    arsenic: row.arsenic,
    baryte: row.baryte,
    beryllium: row.beryllium,
    bismuth: row.bismuth,
    borate: row.borate,
    boron: row.boron,
    cadmium: row.cadmium,
    cerium: row.cerium,
    chromium: row.chromium,
    cobalt: row.cobalt,
    copper: row.copper,
    dysprosium: row.dysprosium,
    erbium: row.erbium,
    europium: row.europium,
    fluorspar: row.fluorspar,
    gadolinium: row.gadolinium,
    gallium: row.gallium,
    germanium: row.germanium,
    gold: row.gold,
    graphite: row.graphite,
    hafnium: row.hafnium,
    helium: row.helium,
    holmium: row.holmium,
    indium: row.indium,
    iridium: row.iridium,
    iron: row.iron,
    lanthanum: row.lanthanum,
    lead: row.lead,
    lithium: row.lithium,
    lutetium: row.lutetium,
    magnesium: row.magnesium,
    manganese: row.manganese,
    molybdenum: row.molybdenum,
    neodymium: row.neodymium,
    nickel: row.nickel,
    niobium: row.niobium,
    palladium: row.palladium,
    phosphateRock: row.phosphateRock,
    phosphorus: row.phosphorus,
    platinum: row.platinum,
    praseodymium: row.praseodymium,
    rhenium: row.rhenium,
    rhodium: row.rhodium,
    ruthenium: row.ruthenium,
    samarium: row.samarium,
    scandium: row.scandium,
    selenium: row.selenium,
    silicon: row.silicon,
    silver: row.silver,
    steel: row.steel,
    tantalum: row.tantalum,
    tellurium: row.tellurium,
    terbium: row.terbium,
    thulium: row.thulium,
    tin: row.tin,
    titanium: row.titanium,
    tungsten: row.tungsten,
    vanadium: row.vanadium,
    yetterbium: row.yetterbium,
    yttrium: row.yttrium,
    zinc: row.zinc,
    zirconium: row.zirconium,
  }));

  return (
    <div style={{ height: 750, width: "100%", color: "white" }}>
      <ThemeProvider theme={darkTheme}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "white",
            color: "white",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.dark",
            },
          }}
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          pagination
        />
      </ThemeProvider>
    </div>
  );
}

export default DemandData;
