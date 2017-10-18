import React, { Component } from 'react';
import moment from 'moment';
import { assign, isEmpty } from 'lodash';
import { PhotoViewer } from './PhotoComponents/PhotoComponents';
import './App.css';

class App extends Component {


    state = {
        'start': 0,
        'pristineData': [],
        'mutableData': [],
        'photoData': [],
        'filters': { 'tag': '', 'source': '', 'org': '' },
        'sortedBy': ''
    };


    componentDidMount() {
        fetch('https://gsx2json.com/api?id=1wZa0Gx2yAFDyMVayzRn428SDXCOJHOL-0_IX9uLiWW0')
            .then((response) => {
                return response.json()
            })
            .then((photoData) => {
                    photoData.rows.forEach(function (row, idx) {
                        row.id = idx;
                    });
                    this.setState({ 'pristineData': photoData.rows, 'mutableData': photoData.rows }, this.updatePhotoData);
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
        const numberOfPhotos = this.state.mutableData.length;
        const newStart = (proposedStart < numberOfPhotos) ? proposedStart : currentStart;
        this.setState({ 'start': newStart }, this.updatePhotoData);
    };

    updatePhotoData = () => {
        const start = this.state.start;
        const end = start + 4;
        const photosToRender = this.state.mutableData.slice(start, end);
        this.setState({ 'photoData': photosToRender });
    };

    sortData = () => {
        const sortBy = this.state.sortedBy;
        if (sortBy === '') {
            this.updatePhotoData();
        } else if (sortBy === 'date') {
            this.sortByDate();
        } else {
            this.sortByActive();
        }

    };

    //NOTE: moment.js does not like that one of the dates in your JSON file
    //is in the format DD/MM/YY and all the others are in the format DD/MM/YYYY
    //but it has agreed to work with it anyway. :P
    sortByDate = () => {
        const sortedByDate = this.state.mutableData.sort(function (a, b) {
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

        this.setState({ 'mutableData': sortedByDate }, this.updatePhotoData);
    };

    sortByActive = () => {
        const sortedByActive = this.state.mutableData.sort(function (a, b) {
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

        this.setState({ 'mutableData': sortedByActive }, this.updatePhotoData);
    };

    updateFilters = (target) => {
        const filterBy = target.selectedOptions[0].value;
        const filterCategory = target.name;

        const newFilters = assign({}, this.state.filters, {
            [filterCategory]: filterBy
        });

        this.setState({ 'filters': newFilters }, this.filterData);
    };

    handleChange = (evt) => {
        const target = evt.target;
        if (target.id === 'date' || target.id === 'active') {
            this.setState({ 'sortedBy': target.id, 'start': 0 }, this.sortData);
        } else {
            //reset data before applying filters
            this.setState({ 'mutableData': this.state.pristineData }, this.updateFilters(target));
        }
    };

    filterData = () => {
        const tagValue = this.state.filters['tag'];
        const sourceValue = this.state.filters['source'];
        const orgValue = this.state.filters['org'];


        const filteredData = this.state.mutableData.filter((photoData) => {
            return (
                this.filterByCriteria('tag', photoData, tagValue) &&
                this.filterByCriteria('source', photoData, sourceValue) &&
                this.filterByCriteria('org', photoData, orgValue)
            )
        });

        this.setState({ 'mutableData': filteredData }, this.sortData);
    };

    filterByCriteria = (filterType, photoData, valueToCompare) => {
        if (valueToCompare === '') return true;

        return photoData[filterType] === valueToCompare;
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
                        <div className='button' id='date' onClick={this.handleChange}>Date</div>
                        <div className='button' id='active' onClick={this.handleChange}>Active</div>
                    </div>
                    <div className='filtering-options'>
                        <select name="tag" id="tag" onChange={this.handleChange}>
                            <option value=''>Filter By Tag</option>
                            <option value='food'>food</option>
                            <option value='simpsons'>simpsons</option>
                            <option value='the rock'>the rock</option>
                            <option value='dogs'>dogs</option>
                            <option value='comics</option>'>comics</option>
                            <option value='SNL|RYAN GOSLING'>SNL|RYAN GOSLING</option>
                            <option value='SNL'>SNL</option>
                            <option value='cats|tacos'>cats|tacos</option>
                        </select>
                        <select name="source" id="source" onChange={this.handleChange}>
                            <option value=''>Filter By Source</option>
                            <option value='ftp'>ftp</option>
                            <option value='web'>web</option>
                            <option value='dtu'>dtu</option>
                            <option value='photomechanic'>photomechanic</option>
                        </select>
                        <select name="org" id="org" onChange={this.handleChange}>
                            <option value=''>Filter By Org</option>
                            <option value='ZCRVFR0ARO'>ZCRVFR0ARO</option>
                            <option value='P6ENNB2RNO'>P6ENNB2RNO</option>
                            <option value='CSA49JNHUM'>CSA49JNHUM</option>
                            <option value='9YCUF0FHYO'>9YCUF0FHYO</option>
                            <option value='6X90VJB294'>6X90VJB294</option>
                            <option value='6X90VJB295'>6X90VJB295</option>
                            <option value='72TEZ9GQI6'>72TEZ9GQI6</option>
                            <option value='72TEZ9GQI7'>72TEZ9GQI7</option>
                            <option value='72TEZ9GQI8'>72TEZ9GQI8</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
