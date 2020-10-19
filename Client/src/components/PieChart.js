import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PieChart extends Component {

    render() {
        let landuse = 100 * this.props.foodinfo.landuse / this.props.foodinfo.total_emissions;
        let farming = 100 * this.props.foodinfo.farm / this.props.foodinfo.total_emissions;
        let processing = 100 * this.props.foodinfo.processing / this.props.foodinfo.total_emissions;
        let transport = 100 * this.props.foodinfo.transport / this.props.foodinfo.total_emissions;
        let packing = 100 * this.props.foodinfo.packing / this.props.foodinfo.total_emissions;
        let retail = 100 * this.props.foodinfo.retail / this.props.foodinfo.total_emissions;
        let orderedArray = [landuse, farming, processing, transport, packing, retail]
        let orderedLabels = ["Land use", "Farming", "Processing", "Transport", "Packing", "Retail"]
        let datapoints = [];
        const appendDatapoints = (process) => {
            if (process > 0) {
                const idx = orderedArray.indexOf(process)
                datapoints.push({y: process, label: orderedLabels[idx]})
            }
        }
        for (const process of orderedArray) {
            appendDatapoints(process);
        }

        const options = {
			theme: "dark2",
			animationEnabled: true,
			exportFileName: "Processes contribution breakdown",
			exportEnabled: true,
			title:{
				text: `Production processes contributing to the environmental impact of ${this.props.foodname}`
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: datapoints
			}]
        }
        return (
            <div>
                <CanvasJSChart options = {options}/>
            </div>
        )
    }
}



