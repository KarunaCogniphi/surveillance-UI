
window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {
     

      legend:{
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      data: [
      {
        //startAngle: 45,
       indexLabelFontSize: 20,
       indexLabelFontFamily: "Garamond",
       indexLabelFontColor: "darkgrey",
       indexLabelLineColor: "darkgrey",
       
       type: "doughnut",
       showInLegend: true,
       dataPoints: [
       {  y: 53.37, legendText:"Running"},
       {  y: 35.0, legendText:"Idile"},
       {  y: 7, legendText:"Stopped" },
       {  y: 2, legendText:"0th"},
      
       ]
     }
     ]
   });

    chart.render();
  }

  

  