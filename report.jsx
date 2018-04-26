var React = require('react');
var ReactPivot = require('react-pivot');
var createReactClass = require('create-react-class');

var rows = require('./data.json');

// Dimesions
var dimensions = [
  {
    title: 'Date',
    value: function(row) {
      return row.date;
    }
  },
  {
    title: 'Host',
    value: function(row) {
      return row.host;
    }
  }
];
// Reduce Method
var reduce = function(row, memo) {
  memo.impression = row.type === 'impression' ? memo.impression + 1 : memo.impression || 0;
  memo.loads = row.type === 'load' ? memo.loads + 1 : memo.loads || 0;
  memo.displays = row.type === 'display' ? memo.displays + 1 : memo.displays || 0;
  memo.count = (memo.count || 0) + 1;
  memo.amountTotal = (memo.amountTotal || 0) + parseFloat(row.amount);
  return memo;
};

// Calculations
var calculations = [
  {
    title: 'Impression',
    value: 'impression',
    template: function(val, row) {
      return row.impression;
    }
  },
  {
    title: 'Loads',
    value: 'loads',
    template: function(val, row) {
      return row.loads;
    }
  },
  {
    title: 'Displays',
    value: 'displays',
    template: function(val, row) {
      return row.displays;
    }
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    template: function(val, row) {
      return `${(row.loads / row.impression * 100).toFixed(2)} %`;
    }
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    template: function(val, row) {
      return `${(row.displays / row.impression * 100).toFixed(2)} %`;
    }
  }
];

module.exports = createReactClass({
  render() {
    return (
      <div>
        <ReactPivot
          rows={rows}
          dimensions={dimensions}
          reduce={reduce}
          calculations={calculations}
          activeDimensions={['Transaction Type']}
        />
      </div>
    );
  }
});
