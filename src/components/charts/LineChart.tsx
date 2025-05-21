import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import type { WeeklyIncome } from "../../hooks/useStats";

interface LineChartProps {
  data: WeeklyIncome;
  height?: number;
  lineColor?: string;
}

const LineChart = ({
  data,
  height = 300,
  lineColor = "#4DAF01",
}: LineChartProps) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data || !data.values.length) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 0, right: 10, bottom: 0, left: 20 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "rgba(0, 0, 0, 0.75)")
      .style("color", "white")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 1000);

    // X scale - for entire week
    const xDomain = data.days;
    const x = d3.scalePoint().domain(xDomain).range([0, width]).padding(0.5);

    // Y scale
    const maxValue = d3.max(data.values) || 100;
    const y = d3
      .scaleLinear()
      .domain([0, maxValue + 10]) // Add some padding at the top
      .range([chartHeight, 0]);

    // Add Y axis
    chart
      .append("g")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => d.toString())
      )
      .call((g) => g.select(".domain").remove())
      .selectAll("text")
      .style("font-size", "12px")
      .style("font-family", "Satoshi")
      .style("fill", "#6B7280"); // Gray color for axis labels

    // Add grid lines
    chart
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width)
          .tickFormat(() => "")
          .ticks(5)
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("stroke", "#E5E7EB")
          .attr("stroke-dasharray", "2,2")
      );
    // Create line generator
    const line = d3
      .line<number>()
      .x((_, i) => {
        // Map the value index to the corresponding day index
        const dayIndex = i % data.days.length;
        return x(data.days[dayIndex]) || 0;
      })
      .y((d) => y(d))
      .curve(d3.curveMonotoneX);

    // Add grid lines
    chart
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width)
          .tickFormat(() => "")
          .ticks(5)
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("stroke", "#E5E7EB")
          .attr("stroke-dasharray", "2,2")
      );

    // Draw the line
    const path = chart
      .append("path")
      .datum(data.values)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("strokeWidth", 1.5)
      .attr("d", line);

    // Add animation
    const pathLength = path.node()?.getTotalLength() || 0;
    path
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength)
      .transition()
      .duration(1000)
      .attr("stroke-dashoffset", 0);

    // Add hover interaction for data points
    chart
      .selectAll(".data-point")
      .on("mouseover", function (event, d) {
        const i = data.values.indexOf(d as number);
        const day = data.days[i % data.days.length];

        d3.select(this).transition().duration(100).attr("r", 6);

        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(`${day}: ${d}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(100).attr("r", 4);

        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add invisible overlay rectangles for better hover areas
    chart
      .selectAll(".hover-area")
      .data(data.values)
      .enter()
      .append("rect")
      .attr("class", "hover-area")
      .attr("x", (_, i) => {
        const dayIndex = i % data.days.length;
        return (x(data.days[dayIndex]) || 0) - width / (data.days.length * 2);
      })
      .attr("y", 0)
      .attr("width", width / data.days.length)
      .attr("height", chartHeight)
      .style("opacity", 0)
      .on("mouseover", function (event, d) {
        const i = data.values.indexOf(d);
        const day = data.days[i % data.days.length];
        const dataPoint = chart
          .selectAll(".data-point")
          .filter((_, pi) => pi === i);

        dataPoint.transition().duration(100).attr("r", 6);

        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(`${day}: ${d}`)
          .style("left", `${event.pageX + 10}px`)
          .style("font-family", "Satoshi")
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function (_, d) {
        const i = data.values.indexOf(d);
        const dataPoint = chart
          .selectAll(".data-point")
          .filter((_, pi) => pi === i);

        dataPoint.transition().duration(100).attr("r", 4);

        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add X axis
    chart
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call((g) => g.select(".domain").remove())
      .selectAll("text")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-family", "Satoshi")
      .style("fill", "#6B7280");

    // Add horizontal line at 0
    chart
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", chartHeight)
      .attr("y2", chartHeight)
      .attr("stroke", "#E5E7EB")
      .attr("strokeWidth", 1);

    // Clean up tooltip when unmounting
    return () => {
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, [data, height, lineColor]);

  return (
    <svg
      ref={chartRef}
      className="w-full"
      height={height}
      style={{ overflow: "visible" }}
    />
  );
};

export default React.memo(LineChart);
