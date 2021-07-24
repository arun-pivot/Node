let intervalData = {};
let currentSecond ;
let pressCount = 0;
let interval;
let inBetweenClickTime = 0;
let dataSetIncrementer;
let keyStatus;

getIntervalTime = ( intervalDataSet )=>new Promise((resolve,reject)=>{
  if( intervalDataSet.length >2 ){
    resolve( intervalDataSet[ intervalDataSet.length - 2 ] - intervalDataSet [intervalDataSet.length - 3] )
  }
  else{
    $.toaster({ priority :'success', title :'Success', message :"Button Clicked"});
  }
})

incrimentTimer = function(){
    document.getElementById("secondViewer").innerHTML = "Timer: "+currentSecond*1000 + "ms";
    inBetweenClickTime++
    currentSecond++
   
}
stopTimer = function(){
    $.toaster({ priority :'success', title :'Success', message :"Timer Stopped"});
    document.getElementById("secondViewer").innerHTML = "Timer: "+ 0000 + "ms";
    clearInterval(interval)
    pressCount = 0
    document.getElementById('startBtn').disabled = false;
}

keyPress=function(){
    clearInterval(interval)
    pressCount++;

    if( pressCount == 1 ){
        $.toaster({ priority :'success', title :'Success', message :"Timer Started"});
        document.getElementById('startBtn').disabled = true;
        dataSetIncrementer = 0
        currentSecond = 0;
        inBetweenClickTime = 0;
        newName = "intervalData"+dataSetIncrementer
        intervalData[newName]= []
    }
    else{
            if(inBetweenClickTime<5){
                inBetweenClickTime = 0;
                newName = "intervalData"+(dataSetIncrementer)
                intervalData[newName].push(currentSecond*1000)
            }
            else{
                $.toaster({ priority :'success', title :'Success', message :"Timer Restarts"});
                currentSecond = 0 ;
                inBetweenClickTime = 0
                dataSetIncrementer++;
                newName = "intervalData"+(dataSetIncrementer)
                intervalData[newName]= []
            }
    }
   
    getIntervalTime( intervalData [newName] )
    .then((res)=>{
        $.toaster({ priority :'success', title :'Success', message :' Difference between last two key press  '+ res + "ms"});

    })
    localStorage.setItem("Data", JSON.stringify(intervalData));
    interval = setInterval(incrimentTimer,1000)
}
