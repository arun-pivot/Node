let intervalData = {};
let currentSecond ;
let pressCount = 0;
let interval;
let inBetweenClickTime = 0;
let dataSetIncrementer;
let keyStatus;

incrimentTimer = function(){
    console.log(currentSecond)
  
    inBetweenClickTime++
    currentSecond++
}
stopTimer = function(){
    clearInterval(interval)
    document.getElementById('startBtn').disabled = false;
}

keyPress=function(){
  
    clearInterval(interval)
  
   
    pressCount++;

    if( pressCount == 1 ){
        document.getElementById('startBtn').disabled = true;
        dataSetIncrementer = 0
        currentSecond = 0;
        inBetweenClickTime = 0;
        newName = "intervalData"+dataSetIncrementer
        intervalData[newName]= []
        intervalData[newName].push(currentSecond)
       
    }
    else{
        
            if(inBetweenClickTime<5){
                inBetweenClickTime = 0;
                newName = "intervalData"+(dataSetIncrementer)
              
                intervalData[newName].push(currentSecond)
            }
            else{
                currentSecond = 0 ;
                inBetweenClickTime = 0
                dataSetIncrementer++;
                newName = "intervalData"+(dataSetIncrementer)
                intervalData[newName]= []
                
               
            }
 
  
    }
    localStorage.setItem("Data", JSON.stringify(intervalData));
    console.log(newName)
    console.log(intervalData)
    interval = setInterval(incrimentTimer,1000)

   
}
