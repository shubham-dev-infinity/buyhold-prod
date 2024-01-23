$(document).ready(function () {
  $("select").niceSelect();
  // $("html").niceScroll();
  // $(".list").niceScroll();
  $(".xyz").on("click", function () {
    event();
  });
});
// -----------------------------------------------------------------------------------------------------------------------------------

//  ----------------------------------------------------------------------- GRAPH 1 ------------------------------------------------------------
$(function () {
  $("#container").highcharts({
    chart: {
      type: "spline",
    },
    title: {
      text: "EQUITY GROWTH ON INTEREST ONLY",
      align: "left",
      style: {
        color: "var(--Text-Text, #8391A2)",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "20px",
        textTransform: "uppercase",
      },
    },
    subtitle: {
      text: "Green: Sweepstakes Registrations, Red: New Users, Blue: Active Users",
      align: "left",
      style: {
        color: "var(--Text-Text, #8391A2)",
        fontSize: "12px",
      },
    },
    xAxis: {
      categories: [
              ], // Add as many years as needed
    },
    yAxis: {
      min: 150000,
      labels: {
        enabled: true,
        formatter: function () {
          return "$" + this.value / 1000 + "k";
        },
      },
      title: {
        text: null,
      },
    },
    tooltip: {
      // Adjust tooltip if needed
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 3,
          },
        },
        marker: {
          enabled: false,
        },
        // Remove pointInterval and pointStart if using categories for xAxis
      },
    },
    series: [
      {
        name: "5% Growth",
        data: [
          130000, 260000, 350000, 250000, 400000, 450000, 300000, 200000,
          100000, 180000, 220000, 250000, 290000, 350000, 370000, 390000,
          170000, 350000, 200000, 230000, 280000, 150000, 201, 140000, 110000,
          240000, 330000, 230000, 380000,
        ],
        color: "#F0191C",
      },
      {
        name: "7% Growth",
        data: [
          120000, 150000, 170000, 190000, 110000, 150000, 200000, 230000,
          280000, 150000, 201, 140000, 110000, 240000, 330000, 230000, 380000,
          430000, 280000, 180000, 80000, 150000, 190000, 220000, 260000, 310000,
          330000, 350000, 130000, 310000,
        ],
        color: "#225CCB",
      },
      {
        name: "10% Growth",
        data: [
          150000, 180000, 200.5, 220000, 140000, 180000, 250000, 280000, 330000,
          180000, 221, 160000, 130000, 260000, 350000, 250000, 400000, 450000,
          300000, 200000, 100000, 180000, 220000, 250000, 290000, 350000,
          370000, 390000, 170000, 350000,
        ],
        color: "#167807",
      },
    ],
    navigation: {
      menuItemStyle: {
        fontSize: "20px",
      },
    },
  });
});

//------------------------------------------------------------------- GRAPH 2 --------------------------------------------------------------
$(function () {
  $("#garph_data_two").highcharts({
    chart: {
      type: "spline",
    },
    title: {
      text: "VALUE PROJECTION",
      align: "left", // Set the title alignment to left
      style: {
        color: "var(--Text-Text, #8391A2)", // Set text color using CSS variable
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "20px",
        textTransform: "uppercase",
      },
    },
    subtitle: {
      text: "Green: Sweepstakes Registrations, Red: New Users, Blue: Active Users",
      align: "left",
      style: {
        color: "var(--Text-Text, #8391A2)",
        fontSize: "12px",
      },
    },
    xAxis: {
      categories: [
        
      ], // Add as many years as needed
    },
    yAxis: {
      min: 100000,
      labels: {
        enabled: true,
        formatter: function () {
          return "$" + this.value / 1000 + "k";
        },
      },
      title: {
        text: null,
      },
    },
    tooltip: {
      // valueSuffix: ' users/week'
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 3,
          },
        },
        marker: {
          enabled: false,
        },
        // Remove pointInterval and pointStart if using categories for xAxis
      },
    },
    series: [
      {
        name: "5% Growth",
        data: [
          130000, 260000, 350000, 250000, 400000, 450000, 300000, 200000,
          100000, 180000, 220000, 250000, 290000, 350000, 370000, 390000,
          170000, 350000, 200000, 230000, 280000, 150000, 201, 140000, 110000,
          240000, 330000, 230000, 380000,
        ],
        color: "#F0191C",
      },
      {
        name: "7% Growth",
        data: [
          120000, 150000, 170000, 190000, 110000, 150000, 200000, 230000,
          280000, 150000, 201, 140000, 110000, 240000, 330000, 230000, 380000,
          430000, 280000, 180000, 80000, 150000, 190000, 220000, 260000, 310000,
          330000, 350000, 130000, 310000,
        ],
        color: "#225CCB",
      },
      {
        name: "10% Growth",
        data: [
          150000, 180000, 200.5, 220000, 140000, 180000, 250000, 280000, 330000,
          180000, 221, 160000, 130000, 260000, 350000, 250000, 400000, 450000,
          300000, 200000, 100000, 180000, 220000, 250000, 290000, 350000,
          370000, 390000, 170000, 350000,
        ],
        color: "#167807",
      },
    ],
    navigation: {
      menuItemStyle: {
        fontSize: "20px",
      },
    },
  });
});

//---------------------------------------------------------------------------------------------------------------------------------

// window.addEventListener('DOMContentLoaded', event => {

//   // Toggle the side navigation
//   const sidebarToggle = document.body.querySelector('#sidebarToggle');
//   if (sidebarToggle) {
//     // Uncomment Below to persist sidebar toggle between refreshes
//     // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
//     //     document.body.classList.toggle('sb-sidenav-toggled');
//     // }
//     sidebarToggle.addEventListener('click', event => {
//       event.preventDefault();
//       document.body.classList.toggle('sb-sidenav-toggled');
//       localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
//     });
//   }

// });

// window.addEventListener('DOMContentLoaded', event => {

//   // Toggle the side navigation
//   const sidebarToggle = document.body.querySelector('#sidebarToggle');
//   if (sidebarToggle) {
//     sidebarToggle.addEventListener('click', event => {
//       event.preventDefault();
//       document.body.classList.toggle('sb-sidenav-toggled');

//       // Check the current state and update the button icon
//       const isToggled = document.body.classList.contains('sb-sidenav-toggled');
//       const icon = document.querySelector('#sidebarToggle i');
//       icon.className = isToggled ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';

//       localStorage.setItem('sb|sidebar-toggle', isToggled);
//     });
//   }

// });

window.addEventListener("DOMContentLoaded", (event) => {
  // Close sidebar button
  const sidebarClose = document.body.querySelector("#sidebarClose");
  if (sidebarClose) {
    sidebarClose.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.remove("sb-sidenav-toggled");
      // localStorage.setItem('sb|sidebar-toggle', 'false');
    });
  }

  // Open sidebar button
  const sidebarOpen = document.body.querySelector("#sidebarOpen");
  if (sidebarOpen) {
    sidebarOpen.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.add("sb-sidenav-toggled");
      // localStorage.setItem('sb|sidebar-toggle', 'true');
    });
  }

  // Check and set initial state
  const initialToggleState =
    localStorage.getItem("sb|sidebar-toggle") === "true";
  document.body.classList.toggle("sb-sidenav-toggled", initialToggleState);

  // Update the icon based on the initial state
  const icon = document.querySelector(
    `#${initialToggleState ? "sidebarOpen" : "sidebarClose"} i`
  );
  icon.className = initialToggleState
    ? "fa-solid fa-bars"
    : "fa-solid fa-xmark";
});
