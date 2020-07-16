import React from "react";
import Chart1 from "./statistiques/StackedAreaChart";
import Chart2 from "./statistiques/CustomShapeBarChart";
import Chart3 from "./statistiques/ComposedResponsiveContainer";

function Statistiques() {
  return (
    <div id="middle">
      <Chart1 />
      <Chart2 />
      <Chart3 />
    </div>
  );
}

export default Statistiques;
