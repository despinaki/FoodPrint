import React, { Component } from 'react'
import { connect } from 'react-redux';
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    constructor() {
        super();
        this.state = {sumData: []};
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }
    
    componentDidMount() {
        const URL = "http://localhost:5000"
        fetch(`${URL}/api/${this.props.userid}/allemissions`)
        .then(resp => resp.json())
        .then(resp => this.setState({sumData: resp.sort((a, b) => a.date - b.date)}))
        .catch(err=>console.log(err))   
    }

    toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

    render() {
        // const dates=[];
        // const emissions = [];
        // const water = [];
        const emissionsDataPoints = [];
        const waterWasteDataPoints = [];
        if (this.state.sumData.length > 0) {
            this.state.sumData.map((obj, index) => {
                emissionsDataPoints[index]=({x: new Date(obj["date"].slice(0,10)), y: parseFloat(obj["emissions_sum"])})
                waterWasteDataPoints[index]=({x: new Date(obj["date"].slice(0,10)), y: parseFloat(obj["water_sum"])})
                // dates[index] = obj["date"].slice(0,10);
                // emissions[index]= obj["emissions_sum"].toFixed(2);
                // water[index] = obj["water_sum"].toFixed(2);
            })
        } 
        const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Your foodprint over time"
			},
			axisY: {
				title: "CO2 emissions (CO2 kg-equivalents)",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			},
			axisY2: {
				title: "Water waste (L)",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "spline",
				name: "CO2 emissions",
				showInLegend: true,
				xValueFormatString: "DDD",
				yValueFormatString: "###0.## kg CO2-equiv",
				dataPoints: emissionsDataPoints
			},
			{
				type: "spline",
				name: "Fresh water waste",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "DDD",
				yValueFormatString: "####0.## L",
				dataPoints: waterWasteDataPoints
			}]
		}
        return (
            <div>
                {console.log(emissionsDataPoints)}
               <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
            </div>
        )
    }
}

const mSTP = state => ({
    userid: state.userid
})

export default connect(mSTP)(Graph)

