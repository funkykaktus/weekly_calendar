var days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
var daysSwed=["Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag","Söndag"]
var startOnMonday={0:-6,1:0,2:-1,3:-2,4:-3,5:-4,6:-5}
var newDate;
var monthsSwed=["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December",]
var currentDay=false;
var rowc;
var holidayList=[];

//get the current weeks date 
function currentWeek(){
    
    newDate=new Date();
    var today=newDate.getFullYear()+""+(newDate.getMonth()+1)+newDate.getDate();
    document.getElementById("yeartext").innerHTML=newDate.getFullYear();

    //Start the calender from monday
    newDate.setDate(newDate.getDate()+startOnMonday[newDate.getDay()]);
    
    for(var i=0; i<7;i++){   
        markTodaysDate(newDate, today);
        document.getElementById("p"+i).innerHTML=returnHolidayToCalendar(newDate);
        document.getElementById(days[i]).innerHTML=daysSwed[i]+"<br>"+(newDate.getDate())+"/"+(newDate.getMonth()+1);			
        newDate.setDate(newDate.getDate()+1);
        }
    document.getElementById("monthtext").innerHTML=monthsSwed[newDate.getMonth()];
    //move calender back 7 week because we moved the calender forward in the for loop
    newDate.setDate(newDate.getDate()-7);
    }

function changeWeek(week){
    
    //Change the calender to previous/next week
    newDate.setDate(newDate.getDate()+week);
    var stringDate;
    //Start the calender on a monday
    newDate.setDate(newDate.getDate()+startOnMonday[newDate.getDay()]);

    for(var i=0; i<7;i++){
        markTodaysDate(newDate,i);
            
        document.getElementById("p"+i).innerHTML=returnHolidayToCalendar(newDate);    
        document.getElementById(days[i]).innerHTML=daysSwed[i]+"<br>"+((newDate.getDate()))+"/"+(newDate.getMonth()+1);
        newDate.setDate(newDate.getDate()+1);		         
    }

    document.getElementById("yeartext").innerHTML=newDate.getFullYear();
    document.getElementById("monthtext").innerHTML=monthsSwed[newDate.getMonth()];
    //Move the date back 6 days because we moved the date forward 6 days in the for loop
    newDate.setDate(newDate.getDate()-6);
}


function markTodaysDate(todayDateFun,today){
    td=todayDateFun.getFullYear()+""+(todayDateFun.getMonth()+1)+todayDateFun.getDate();


   if(td==today && currentDay==false){
       document.getElementById("row"+todayDateFun.getDay()).setAttribute("id","rowcurrent");
       currentDay=true;
       rowc=todayDateFun.getDay();
   }
   else if(rowc==todayDateFun.getDay() && today!=td && currentDay==true){    
       currentDay=false;
       document.getElementById("rowcurrent").setAttribute("id","row"+rowc);
   }
}

function getJSONFile(){
    
    var temp;
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 ) {
                temp=JSON.parse(this.responseText);
                fillArrayWithHolidays(temp);
            }
 };
        xmlhttp.open("GET", "jsontest.php?q=" +"d", true);
        xmlhttp.send();
}

function fillArrayWithHolidays(t){
    var testarr=[];
    testarr.push(t);
    for (var i in testarr){
        var temp=testarr[i];
    for(ii in temp){
        holidayList[temp[ii].date]=temp[ii].name;
    }
    currentWeek();
}
}


function returnHolidayToCalendar(dateMatch){
    var stringDate;

    //Change the date string to match the json date string
    if((dateMatch.getMonth()+1)<10 && dateMatch.getDate()<10){
        stringDate=dateMatch.getFullYear()+"-"+"0"+(dateMatch.getMonth()+1)+"-0"+dateMatch.getDate();    
    }
    else if((dateMatch.getMonth()+1)<10 && dateMatch.getDate()>9){
        stringDate=dateMatch.getFullYear()+"-"+"0"+(dateMatch.getMonth()+1)+"-"+dateMatch.getDate();
    }
    else if((dateMatch.getMonth()+1)>9 && dateMatch.getDate()<10){
        stringDate=dateMatch.getFullYear()+"-"+(dateMatch.getMonth()+1)+"-0"+dateMatch.getDate();
    }
    else{
        stringDate=dateMatch.getFullYear()+"-"+(dateMatch.getMonth()+1)+"-"+dateMatch.getDate();
    }

    //returns holiday
    if(holidayList[stringDate]){
        return holidayList[stringDate];  
    }
    else{
        return "";
    }
}










