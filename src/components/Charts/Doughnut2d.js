import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

const ChartComponent = ({data}) =>{
  ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

  const chartConfigs = {
    type: "doughnut2d", 
    width: "100%",
    height: "400", 
    dataFormat: "json", 
    dataSource: {
      chart: {
        caption: "Stars per Language",
        theme: "fusion",
        decimals: 0,
        doughnutRadius: "35%",
        showPercentValues: 0,
      },
      data,
    }
  };
  return (<ReactFC {...chartConfigs} />);
}

export default ChartComponent;