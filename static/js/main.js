$(document).ready(function(){
    $('.alt').fadeOut("fast")
    let form_data = new FormData();
    form_data.append('email', document.querySelector(".email").value);

    const arrayColumn = (arr, n) => arr.map(x => x[n]);

    var xArray;
    var yArray;

    // const twoDimensionalArray = [
    // [1, 2, 3],
    // [4, 5, 6],
    // [7, 8, 9],
    // ];

    // console.log(arrayColumn(twoDimensionalArray, 0));

    axios.post('/get_session', form_data, {
        headers: {
            'Content-Type': "multipart/form-data;"
        }
    })
    .then(res =>{
        console.log(res.data.data)
        xArray = arrayColumn(res.data.data, 0)
        yArray = arrayColumn(res.data.data, 1)

        var frst = new Date(xArray[0])
        frst.setSeconds(frst.getSeconds() - 30);

        xArray = [frst.toISOString(), ...xArray]
        yArray = [0, ...yArray]

        console.log(xArray)
        // yArray = yArray.forEach(element => {
        //     if(element == 0){
        //         return('e')
        //     }
        //     if(element == 1){
        //         return('d')
        //     }
        //     if(element == 2){
        //         return('c')
        //     }
        //     if(element == 3){
        //         return('b')
        //     }
        //     if(element == 4){
        //         return('a')
        //     }
        // })

        // yar = []
        // for(var i = 0; i < yArray.length; i++){
        //     if(yArray[i] == 0){
        //         yar.push('e')
        //     }
        //     if(yArray[i] == 1){
        //         yar.push('d')
        //     }
        //     if(yArray[i] == 2){
        //         yar.push('c')
        //     }
        //     if(yArray[i] == 3){
        //         yar.push('b')
        //     }
        //     if(yArray[i] == 4){
        //         yar.push('a')
        //     }
        // }
        // for

        var data = [{
            x: xArray,
            y: yArray,
            mode:"lines"
          }];
          
          // Define Layout
          var layout = {
            xaxis: {type: 'date', title: "Date"},
            yaxis: {range: [0, 4.4], title: "Grade"},  
            title: "Grade Prediction vs. Date"
          };
          
          // Display using Plotly
          Plotly.newPlot("myPlot", data, layout);
    })
    .catch(err =>{
        console.log(err)
    })
  
});