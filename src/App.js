import React, { Component } from 'react';
import moment from 'moment';
import { PhotoViewer } from './PhotoComponents/PhotoComponents';
import './App.css';

class App extends Component {


    state = {
        'start': 0,
        'pristineData': [],
        'sortableData': [],
        'photoData': []
    };


    componentDidMount() {
        fetch('http://gsx2json.com/api?id=1wZa0Gx2yAFDyMVayzRn428SDXCOJHOL-0_IX9uLiWW0')
            .then((response) => {
                return response.json()
            })
            .then((photoData) => {
                    photoData.rows.forEach(function (row, idx) {
                        row.id = idx;
                    });
                    this.setState({ 'pristineData': photoData.rows, 'sortableData': photoData.rows }, this.updatePhotoData);
                }
            )
    }

    backward = () => {
        const currentStart = this.state.start;
        const proposedStart = currentStart - 4;
        const newStart = (proposedStart >= 0) ? proposedStart : 0;
        this.setState({ 'start': newStart }, this.updatePhotoData);
    };

    forward = () => {
        const currentStart = this.state.start;
        const proposedStart = currentStart + 4;
        const numberOfPhotos = this.state.sortableData.length;
        const newStart = (proposedStart < numberOfPhotos) ? proposedStart : currentStart;
        this.setState({ 'start': newStart }, this.updatePhotoData);
    };

    updatePhotoData = () => {
        const start = this.state.start;
        const end = start + 4;
        const photosToRender = this.state.sortableData.slice(start, end);
        this.setState({ 'photoData': photosToRender });
    };

    //NOTE: moment.js does not like that one of the dates in your JSON file
    //is in the format DD/MM/YY and all the others are in the format DD/MM/YYYY
    //but it has agreed to work with it anyway. :P
    sortByDate = () => {
        const sortedByDate = this.state.sortableData.sort(function (a, b) {
            const aDate = moment(a.date);
            const bDate = moment(b.date);
            if (aDate > bDate) {
                return 1;
            } else if (aDate < bDate) {
                return -1;
            } else {
                return 0;
            }
        });

        this.setState({'sortedData': sortedByDate}, this.updatePhotoData);
    };

    sortByActive = () => {
        const sortedByActive = this.state.sortableData.sort(function (a, b) {
            const aVal = (a.active === 'no') ? 1 : 0;
            const bVal = (b.active === 'no') ? 1 : 0;
            if (aVal > bVal) {
                return 1;
            } else if (aVal < bVal) {
                return -1;
            } else {
                return 0;
            }
        });

        this.setState({'sortedData': sortedByActive}, this.updatePhotoData);
    };


    render() {
        return (
            <div className="App">
                <div className="display">
                    <div className='button' id='button-backward' onClick={this.backward}>backward</div>
                    <PhotoViewer photoData={this.state.photoData}/>
                    <div className='button' id='button-forward' onClick={this.forward}>forward</div>
                </div>
                <div className='controls'>
                    <div className='sorting-options'>
                        <div className='button' id='date-sort' onClick={this.sortByDate}>Date</div>
                        <div className='button' id='active-sort' onClick={this.sortByActive}>Active</div>
                    </div>
                    <div className='filtering-options'>
                        <select>
                            <option>Filter By Tag</option>
                            <option>food</option>
                            <option>simpsons</option>
                            <option>the rock</option>
                            <option>dogs</option>
                            <option>comics</option>
                            <option>SNL|RYAN GOSLING</option>
                            <option>SNL</option>
                            <option>cats|tacos</option>
                        </select>
                        <select>
                            <option>Filter By Source</option>
                            <option>ftp</option>
                            <option>web</option>
                            <option>dtu</option>
                            <option>photomechanic</option>
                        </select>
                        <select>
                            <option>Filter By Org</option>
                            <option>ZCRVFR0ARO</option>
                            <option>P6ENNB2RNO</option>
                            <option>CSA49JNHUM</option>
                            <option>9YCUF0FHYO</option>
                            <option>6X90VJB294</option>
                            <option>6X90VJB295</option>
                            <option>72TEZ9GQI6</option>
                            <option>72TEZ9GQI7</option>
                            <option>72TEZ9GQI8</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
