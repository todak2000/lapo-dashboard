import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import type { MonthlyIssuance } from "../../hooks/useStats";

interface BarChartProps {
  data: MonthlyIssuance;
  height?: number;
  legendItems?: { label: string; color: string }[];
}

const BarChart = ({
  data,
  height = 300,
  legendItems = [
    { label: "Personalized", color: "#1E40AF" },
    { label: "Instant", color: "#E0E7FF" },
  ],
}: BarChartProps) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 0, right: 10, bottom: 20, left: 25 };
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
      .style("font-family", "Satoshi")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 1000);
    // X scale
    const x = d3.scaleBand().domain(data.months).range([0, width]).padding(0.4);

    // Y scale
    const maxValue = Math.max(
      ...data.instantData.map((d, i) => d + (data.personalizedData[i] || 0))
    );
    const y = d3
      .scaleLinear()
      .domain([0, maxValue + 10]) // Add some padding at the top
      .range([chartHeight, 0]);

    // Function to create rounded top rectangle path
    const roundedRect = (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      if (radius > height) radius = height / 2;
      if (radius > width) radius = width / 2;
      return `
        M${x + radius},${y}
        h${width - 2 * radius}
        a${radius},${radius} 0 0 1 ${radius},${radius}
        v${height - radius}
        h-${width}
        v-${height - radius}
        a${radius},${radius} 0 0 1 ${radius}-${radius}
        z
      `;
    };

    // Draw bars for instantData (background bars)
    chart
      .selectAll(".bar-instant")
      .data(data.instantData)
      .enter()
      .append("path")
      .attr("class", "bar-instant")
      .attr("d", (d, i) => {
        const barX = x(data.months[i]) || 0;
        const barY = y(d);
        const barHeight = chartHeight - y(d);
        const barWidth = x.bandwidth();
        return roundedRect(barX, barY, barWidth, barHeight, 8);
      })
      .attr("fill", "#E0E7FF")
      .on("mouseover", function (event, d) {
        const instantValue = d;
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Instant: ${instantValue}`)
          .style("left", `${event.pageX + 10}px`)
          .style("font-family", "Satoshi")
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Draw bars for personalizedData (foreground bars)
    chart
      .selectAll(".bar-personalized")
      .data(data.personalizedData)
      .enter()
      .append("path")
      .attr("class", "bar-personalized")
      .attr("d", (_, i) => {
        const barX = x(data.months[i]) || 0;
        const barY = chartHeight;
        const barHeight = 0;
        const barWidth = x.bandwidth();
        return roundedRect(barX, barY, barWidth, barHeight, 8);
      })
      .attr("fill", "#014DAF") // Dark blue color for personalized cards
      .transition()
      .duration(750)
      .attr("d", (d, i) => {
        const barX = x(data.months[i]) || 0;
        const barY = y(d);
        const barHeight = chartHeight - y(d);
        const barWidth = x.bandwidth();
        return roundedRect(barX, barY, barWidth, barHeight, 8);
      });

    chart
      .selectAll(".bar-personalized")
      .data(data.personalizedData)
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Personalized: ${d}`)
          .style("left", `${event.pageX + 10}px`)
          .style("font-family", "Satoshi")
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
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
      .style("font-family", "Satoshi")
      .style("font-size", "12px")
      .style("fill", "#6B7280"); // Gray color for axis labels

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
      .style("fill", "#667085");

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
          .attr("stroke", "#F2F4F7")
          .attr("stroke-dasharray", "2,2")
      );

    // Add horizontal line at 0
    chart
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", chartHeight)
      .attr("y2", chartHeight)
      .attr("stroke", "#F2F4F7")
      .attr("strokeWidth", 0.5);
    // Clean up tooltip when unmounting
    return () => {
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, [data, height]);

  return (
    <div className="relative w-full h-full">
      <svg
        ref={chartRef}
        className="w-full"
        height={height}
        style={{ overflow: "visible" }}
      />
      <div className="flex items-center justify-center mt-4 space-x-6">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(BarChart);
