import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

const ChartComponent = ({data}) =>{
  ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

  const chartConfigs = {
    type: "bar3d", 
    width: "100%",
    height: "400", 
    dataFormat: "json", 
    dataSource: {
      chart: {
        caption: "Most Forked Repo",
        theme: "fusion",
        yAxisName:'Repos',
        xAxisName:'Forks',
        yAxisNameFontSize: '16px',
        xAxisNameFontSize: '16px',
      },
      data,
    }
  };
  return (<ReactFC {...chartConfigs} />);
}

export default ChartComponent;