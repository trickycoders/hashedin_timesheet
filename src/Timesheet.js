import React, { Component } from 'react'
import './index.css';
import ReactHighchart from 'react-highcharts'

export const PROJECT_CODES = ["Hiway", "Idera", "Next-IT", "Frrole", "MOM", "TrackMe"]
export const ACTIVITY_TYPES = ["Dev", "Meeting", "E-mail", "Testing", "Debug", "Learning"]
export const HOUR =[""]
class Timesheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
			listItems: []
		};
    }

    handleAddButtonclick = (dataFromChild) => {
		var updatedItems = this.state.listItems;
		updatedItems.push(dataFromChild);
		this.setState({listItems: updatedItems});
	}
  
	render() { 
		return (
			<div className="row">
				<div className="col-md-12">
					<AddEntryForm onAddButtonClick={this.handleAddButtonclick}/>
				</div>
				<div className="col-md-12">
					<Entries sampleProp="This is a sample prop" items={this.state.listItems}/>
				</div>
				<div className="col-md-4 col-md-offset-3">
					<Reports/>
				</div>
			</div>
		)
	}
}

class AddEntryForm extends Component {	
    constructor(props) {
        super(props)
        this.state = {
			projectcodes: '',
			activitytype: '',
			hour: 0,
		};
    }

    handleOnChangeProductCodes = (event) => {
		console.log(event.target.value);
        this.setState({
            projectcodes: event.target.value
        });
	}
	
    handleOnChangeActivity = (event) => {
		console.log(event.target.value);
        this.setState({
            activitytype: event.target.value
		});
	}
	
    handleOnChangeHour = (event) => {
		console.log(event.target.value);
        this.setState({
            hour: event.target.value
        });
	}
	
	handleBtnHour = (event) => {
		console.log(this.state);
		const { onAddButtonClick } = this.props
		onAddButtonClick(this.state);
		this.setState({
			projectcodes: '',
			activitytype: '',
			hour: 0,
		});
    }

	render() {		
		return (
			<div className="add-entry-form col-md-offset-4">
			<div>
				<select value={this.props.projectcodes} onChange={this.handleOnChangeProductCodes}>
					{
						PROJECT_CODES.map(projectcodes => 
						<option value={projectcodes}>{projectcodes}</option>)
					}
				</select>
				<select value={this.props.activitytype} onChange={this.handleOnChangeActivity}>
					{
						ACTIVITY_TYPES.map( activitytype=> 
						<option value={activitytype}>{activitytype}</option>)
					}
				</select>
				<input type="text" value={this.props.hour} onChange={this.handleOnChangeHour}/>
			</div>
				<div className="col-md-2 col-md-offset-2">
					<input className="btn" type="button" onClick={this.handleBtnHour} value="ADD"/>
				</div>
			</div>
		)
	}
}

class Entries extends Component {
	render() {
		var itemsArray = this.props.items.map(function(item, index){
            return (
			<tr key={index}>
						<th>{item.projectcodes}</th>
						<th>{item.activitytype}</th>
						<th>{item.hour}</th>
			</tr>);
        });
		
		return (
			<div className="timesheet-table col-md-offset-4">
				<table>
					<tr>
						<th>project</th>
						<th>activity</th>
						<th>hour</th>
					</tr>
					{itemsArray}
				</table>		
			</div>
		)
	}
}

class Reports extends Component {
	render() {
		const chartData = [{			
			name: 'Hiway',
			y: 5
		},
		{
			name: 'Idera',
			y: 6
		}, 
		{
			name: 'Next-IT',
			y: 2
		}]

		let temp = {};

		chartData.map((data, index) => {
			if (!temp[data.name]) {
				temp[data.name] = data
			} 
			else {
				temp[data.name].y += data.y
			}
			return null
		})
			
		let processedChartData = [];
		for (let prop in temp) {
			if (!temp.hasOwnProperty(prop)) {
				continue;
			}
			processedChartData.push(temp[prop])
		}
		
		const chartConfig = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				width: 350,
			},
			title: {
				text: 'Activity Tracker'
			},
			series: [{
				name: 'Activity Tracker',
				colorByPoint: true,
				data: processedChartData
			}]
		}
			
		return (
			<div className="reports col-md-offset-4">
				<ReactHighchart config={chartConfig}/>
			</div>
		)
	}
}

export default Timesheet;