import React, { Component } from "react";
import * as d3 from "d3";

let data = [];
let eje_Y_max = 0;
let iheight = 0;
let y = null;
let g1 = null;
let bars = null;

class graphic extends Component {

  componentDidMount() {
     data = [
      { name: "Medellín", index2005: 3, index2006: 33 },
      { name: "Cali", index2005: 39, index2006: 45 },
      { name: "Bogotá", index2005: 7, index2006: 31 },
      { name: "Pereira", index2005: 35, index2006: 36 },
      { name: "Bucaramanga", index2005: 16, index2006: 23 },
      { name: "Cúcuta", index2005: 45, index2006: 45 },
      { name: "Armenia", index2005: 6, index2006: 16 }
  ];
    this.drawChart(data);
  }

  drawChart(data) {
          const canvas = d3.select(this.refs.canvas);
          const width = 700;
          const height = 500;
          const margin = { top:40, left:80, bottom: 40, right: 10};
          const iwidth = width - margin.left - margin.right;
          iheight = height - margin.top -margin.bottom;
          const svg = canvas.append("svg");
  
          data.forEach(element => {
              if((element.index2005) >= eje_Y_max) {
                eje_Y_max = parseInt(element.index2005);
              }
          });

          svg.attr("width", width);
          svg.attr("height", height);
          
          g1 = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
          
          y = d3.scaleLinear() 
              .domain([0, eje_Y_max])
              .range([iheight, 0]);
          
          const x = d3.scaleBand()
          .domain(data.map(d => d.name) ) 
          .range([0, iwidth])
          .padding(0.1); 
          
          bars = g1.selectAll("rect").data(data);
  
          bars.enter().append("rect")
              .attr("class", "bar")
              .style("fill", "steelblue")
              .attr("x", d => x(d.name))
              .attr("y", d => y(parseInt(d.index2005)))
              .attr("height", d => iheight - y(parseInt(d.index2005)))
              .attr("width", x.bandwidth())
      
          g1.append("g")
              .classed("x--axis", true)
              .call(d3.axisBottom(x))
              .attr("transform", `translate(0, ${iheight})`);
      
          g1.append("g")
              .classed("y--axis", true)
              .call(d3.axisLeft(y));
  
          g1.append("text")
          .attr("x", (width / 2.5))             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px")   
          .text("Index del año 2005 obtenido por cada ciudad colombiana");
  }
  transitionBar(){
    console.log("hola");
    eje_Y_max = 0;

    data.forEach(element => {
      if((element.index2006) >= eje_Y_max) {
        eje_Y_max = parseInt(element.index2006);
      }
    });

    y.domain([0, eje_Y_max])

    console.log(bars._groups);
    g1.transition()
    .style("fill", "orange")
    .attr("y", 200)
    .attr("height", 30)

    g1.transition().text("Index del año 2006 obtenido por cada ciudad colombiana");

  }
  render() {
    return <div ref="canvas">
      <div className = "col-6">
        <h1>Gráfica Dinámica</h1>
      </div>
      <div className = "col-6">
      <button onClick={() => this.transitionBar()}>
          Cambiar de año
        </button>
        <button onClick={() => this.transition()}>
          Resetear
        </button>
      </div>
    </div>;
  }
}

export default graphic;