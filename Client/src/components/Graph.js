import React, { Component } from 'react'
import { connect } from 'react-redux';
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import './styles/Graph.css'

CanvasJS.addColorSet("customColorSet1",
	[//colorSet Array
	"#BD3D21",
	"#559bd1",
]);

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
        const emissionsArr=[];
        const waterArr=[];
        const emissionsDataPoints = [];
        const waterWasteDataPoints = [];
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        if (this.state.sumData.length > 0) {
            this.state.sumData.map((obj, index) => {
                emissionsDataPoints[index]=({x: new Date(obj["date"].slice(0,10)), y: parseFloat(obj["emissions_sum"])})
                waterWasteDataPoints[index]=({x: new Date(obj["date"].slice(0,10)), y: parseFloat(obj["water_sum"])})
                // dates[index] = obj["date"].slice(0,10);
                // emissions[index]= obj["emissions_sum"].toFixed(2);
                // water[index] = obj["water_sum"].toFixed(2);
                emissionsArr.push(obj["emissions_sum"])
                waterArr.push(obj["water_sum"])
            })
        } 
        const options = {
            theme: "light2",
            colorSet: "customColorSet1",
			animationEnabled: true,
			title:{
				text: "Your foodprint over time"
			},
			axisY: {
				title: "CO2 emissions (kg CO2-equivalents)",
				titleFontColor: "#BD3D21",
				lineColor: "#BD3D21",
				labelFontColor: "#BD3D21",
				tickColor: "#BD3D21"
			},
			axisY2: {
				title: "Water waste (L)",
				titleFontColor: "#559bd1",
				lineColor: "#559bd1",
				labelFontColor: "#559bd1",
				tickColor: "#559bd1"
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
            <div id="graph-div">
                {/* {console.log(emissionsDataPoints)} */}
               <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
               <p>Your food choices contribute a <strong>daily average of {(emissionsArr.reduce(reducer,0)/emissionsArr.length).toFixed(2)} kg CO2-equivalents</strong> in emissions
                and <strong>{(waterArr.reduce(reducer,0)/waterArr.length).toFixed(2)} L</strong> in fresh water withdrawals.</p>
               <p>Within a year, this is the same as driving a regular petrol car for {((emissionsArr.reduce(reducer,0)/emissionsArr.length) * 4.13 * 365).toFixed(2)} km ({((emissionsArr.reduce(reducer,0)/emissionsArr.length) * 2.57 * 365).toFixed(2)} miles),
               or heating an average UK home for {(emissionsArr.reduce(reducer,0)/emissionsArr.length * 0.15 * 365).toFixed(2)} days.
               Also the same as taking {365 * ((waterArr.reduce(reducer,0)/waterArr.length)/88).toFixed(2)} eight-minute showers.</p>
            </div>
        )
    }
}

const mSTP = state => ({
    userid: state.userid
})

export default connect(mSTP)(Graph)

