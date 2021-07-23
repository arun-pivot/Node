let avgData =[];
function buildTable(data){

    $.ajax({
        method: "GET",
        url: "http://localhost:5000/data",
        success: function (response) {
          data = response.data;
          build(data)
        },
        error: function (err) {
          console.log(err);
        }
      })
}
function build(data){

    var table = document.getElementById('myTable')
  
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
 
  
    cell1.innerHTML = "Data";
    cell2.innerHTML = "Created At";
    cell3.innerHTML = "Action";

    for (var i = 0; i < data.length; i++){
   console.log(data)
        let parsedData = JSON.parse(data[i].data)
      
        let numberOfKeys = Object.keys(parsedData)
        for (var j = 0; j < numberOfKeys.length; j++){
            if(parsedData[numberOfKeys[j]].length > 0){
                var row = `<tr>
                <td>${parsedData[numberOfKeys[j]]}</td>
                <td>${data[i].createdAt}</td>
                <td> <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></td>
            
              </tr>`
                table.innerHTML += row
            }

        }


  
  
    }
}
function getDataForAvg(data){
    avgData.push(data)
}
function postData(data){
    
    $.ajax({
        method: "POST",
        url: "http://localhost:5000/data/avg",
        data: {
            data:(JSON.stringify(data))
        },
        success: function (response) {

          $.toaster({ priority :'success', title :'Success', message :'Average is '+response.data});
         
          
        },
        error: function (err) {
          console.log(err);
        }
      })
}
function calculateAvg(){
    avgData = []
    let myTab = document.getElementById('myTable')
    for (i = 1; i < myTab.rows.length; i++) {

        var objCells = myTab.rows.item(i).cells;       
        for (var j = 0; j < objCells.length; j++) {
            
            if(objCells.item(j).children[0]&&objCells.item(j).children[0].type && objCells.item(j).children[0].type === 'checkbox'&&objCells.item(j).children[0].checked){
                getDataForAvg(objCells.item(j - 2).innerHTML.split(",").map(Number))
            }
       
        }
        if( i == myTab.rows.length-1){
            postData(avgData)
        }

         
    }
}
