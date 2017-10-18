10/17/2017

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

I had some difficulty hosting this on GitHub pages so I have hosted it on my own server and it can be viewed [here](http://www.davidcameron.biz/ps-gallery).

I have also added [moment.js](https://momentjs.com/) and [lo-dash](https://lodash.com/).

Sorting by Date and by Active status are currently both working as is filtering by Tag, Source or Org.

A few things worth noting about this project:

It looks like hell. I've split my energy for this project about 95% Function/5% Form. Normally I would put more energy into smoothing out the very rough edges here, but I am pressed for time at the moment.

I'm not crazy about how I've solved the matter of getting filtering and sorting to work together and perhaps adding some sort of flag to each data row that would indicate whether that row should be rendered would be more effective than what I've done but I'm not sure.

In essence the current process is 
1. If sorting, store the sort-by value in state and sort the existing copy of the data (this.state.mutableData).
2. If filtering, reset mutableData from the pristine copy which is never altered. Then update the state with which filters are being applied and then apply filters. Then sort the data if there is a sortBy value in state.

Lastly I built this project without using any state management outside of React and as the project progressed it seemed as though perhaps I should have, especially when I started doing some very Redux-like manipulation of the state. Because I wasn't sure if I was going to have time to add in sorting or filtering the need for state management was minimal at first. Quite possibly if I were to go back to the point where I started adding sorting and filtering I would go a different route and add Redux in.
