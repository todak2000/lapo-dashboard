/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface CardStatus {
  total: number;
  distribution: {
    status: string;
    percentage: number;
    color: string;
  }[];
}

interface DonutChartProps {
  data: CardStatus;
  height?: number;
  width?: number;
}

const DonutChart = ({ data, height = 300, width = 300 }: DonutChartProps) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    // Calculate the total for percentages
    const total = data.total;

    // Set up dimensions
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.90; // Larger inner radius for thinner donut

    // Create group element
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Generate the pie with padAngle for gaps between segments
    const pie = d3
      .pie<any>()
      .value((d) => d.percentage)
      .padAngle(0.02) // Add padding between segments
      .sort(null);

    // Generate the arcs with rounded corners
    const arc = d3
      .arc<any>()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .cornerRadius(4); // Rounded corners on the segments

    // Generate the groups
    const arcs = g
      .selectAll(".arc")
      .data(pie(data.distribution))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Draw arc paths
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
          const updated = { ...d, endAngle: i(t) };
          return arc(updated)!;
        };
      });

    // Add the center text container
    const textGroup = g.append("g").attr("text-anchor", "middle");

    // Title text - "Total Cards"
    textGroup
      .append("text")
      .attr("class", "text-[#808080]")
      .attr("class", "font-medium")
      .attr("dy", "-0.6em")
      .attr("font-size", "12px")
      .text("Total Cards");

    // Total value
    textGroup
      .append("text")
      .attr("class", "font-medium")
      .attr("class", "text-[#121212]")
      .attr("dy", "1em")
      .attr("font-size", "24px")
      .style("font-family", "Satoshi")
      .text(total.toLocaleString());
  }, [data, height, width]);

  // Create legend separate from chart
  const renderLegend = () => {
    if (!data || !data.distribution) return null;

    return (
      <div className="flex flex-wrap justify-center mt-4 gap-4">
        {data.distribution.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-500">{item.status}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        ref={chartRef}
        width={width}
        height={height}
        className="mx-auto"
        viewBox={`0 0 ${width} ${height}`}
      />
      {renderLegend()}
    </div>
  );
};

export default React.memo(DonutChart);
