const ctx = document.getElementById('myChart');
const equityGrowth = document.getElementById('equityGrowthChart');

const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        // 10%
        data: [4, 8, 10, 13, 17, 20],
        borderColor: '#43AA8B',
        borderWidth: 2,
      },
      {
        // 7%
        data: [8, 12, 15, 17, 20, 25],
        borderColor: '#F8961E',
        borderWidth: 2,
      },
      {
        // 5%
        data: [2, 5, 7, 10, 15, 18],
        borderColor: '#F94144',
        borderWidth: 2,
      }

    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: ' #ffffff'
        },
        

      }, x: {
        beginAtZero: true,
        ticks: {
          color: ' #ffffff'
        }
      }
    },
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        caretSize:10,
        position:'average',
        xAlign: 'center',
        yAlign:'bottom',
        backgroundColor: 'white',
        titleColor: 'black',
        callbacks: {
          labelColor: function (context) {
            // Set borderColor and dynamically change backgroundColor based on the dataset label
            return {
              borderColor: getColorBasedOnLabel(context.datasetIndex),
              backgroundColor: getColorBasedOnLabel(context.datasetIndex),
              borderWidth: 2,
              borderRadius: 6,
             
            };
          },
          labelTextColor: function(context) {
            return 'black';
          },
          label: function(context) {
            // Display different labels for each dataset
            var datasetLabel;
            if (context.datasetIndex === 0) {
              datasetLabel = '5% for Dataset 1';
            } else if (context.datasetIndex === 1) {
              datasetLabel = '7% for Dataset 2';
            } else if (context.datasetIndex === 2) {
              datasetLabel = '10% for Dataset 3';
            } else {
              datasetLabel = '';
            }
            return datasetLabel;
          },
        },
      },
    }
  }

});
function getColorBasedOnLabel(label) {
  // Use label (percentage) to determine the background color dynamically
  // For example, you can set different colors based on different percentage values
  if (label === 0) {
    return '#43AA8B'; // Set color for 5%
  } else if (label === 1) {
    return '#F8961E'; // Set color for 7.5%
  } else if (label === 2) {
    return '#F94144'; // Set color for 10%
  } else {
    return 'black'; // Default color
  }
}
//equity-growth chart
const equityGrowthChart = new Chart(equityGrowth, {
  type: 'line',
  data: {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        // 10%
        data: [4, 8, 10, 13, 17, 20],
        borderColor: '#43AA8B',
        borderWidth: 2,
      },
      {
        // 7%
        data: [8, 12, 15, 17, 20, 25],
        borderColor: '#F8961E',
        borderWidth: 2,
      },
      {
        // 5%
        data: [2, 5, 7, 10, 15, 18],
        borderColor: '#F94144',
        borderWidth: 2,
      }

    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: ' #ffffff'
        },
        //min: 1,

      }, x: {
        beginAtZero: true,
        ticks: {
          color: ' #ffffff'
        }
      }
    },
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
tooltip: {
  enabled: true,
  mode: 'index',
  intersect: false,
  caretSize:10,
  position:'average',
  xAlign: 'center',
  yAlign:'bottom',
  backgroundColor: 'white',
  titleColor: 'black',
        callbacks: {
          labelColor: function (context) {
            // Set borderColor and dynamically change backgroundColor based on the dataset label
            return {
              borderColor: getColorBasedOnLabel(context.datasetIndex),
              backgroundColor: getColorBasedOnLabel(context.datasetIndex),
              borderWidth: 2,
              borderRadius: 6,
             
            };
          },
          labelTextColor: function(context) {
            return 'black';
          },
          label: function(context) {
            // Display different labels for each dataset
            var datasetLabel;
            if (context.datasetIndex === 0) {
              datasetLabel = '5% for Dataset 1';
            } else if (context.datasetIndex === 1) {
              datasetLabel = '7% for Dataset 2';
            } else if (context.datasetIndex === 2) {
              datasetLabel = '10% for Dataset 3';
            } else {
              datasetLabel = '';
            }
            return datasetLabel;
          },
        },
      },
    }
  }

});


