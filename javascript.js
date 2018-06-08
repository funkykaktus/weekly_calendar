var days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
var daysSwed=["Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag","Söndag"]
var startOnMonday={0:-6,1:0,2:-1,3:-2,4:-3,5:-4,6:-5}
var newDate;
var monthsSwed=["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December",]
var currentDay=false;
var rowc;
var holidayList=[];
var today;

function myDate(){
    newDate=new Date();
    today=newDate.getFullYear()+""+(newDate.getMonth()+1)+newDate.getDate();
    getWeek(0);
}

function getWeek(changeWeek){
    
    //Change the calender to previous/next or get the week
    newDate.setDate(newDate.getDate()+changeWeek);
    var stringDate;
    //Start the calender on a monday
    newDate.setDate(newDate.getDate()+startOnMonday[newDate.getDay()]);

    //Prints the date
    for(var i=0; i<7;i++){
        markTodaysDate(newDate);
        document.getElementById("p"+i).innerHTML=returnHolidayToCalendar(newDate);    
        document.getElementById(days[i]).innerHTML=daysSwed[i]+"<br>"+((newDate.getDate()))+"/"+(newDate.getMonth()+1);
        newDate.setDate(newDate.getDate()+1);		         
    }

    document.getElementById("yeartext").innerHTML=newDate.getFullYear();
    document.getElementById("monthtext").innerHTML=monthsSwed[newDate.getMonth()];
    //Move the date back 6 days because we moved the date forward 6 days in the for loop
    newDate.setDate(newDate.getDate()-6);
}


function markTodaysDate(sendDate){
    //Marks out todays date in the calendar
    td=sendDate.getFullYear()+""+(sendDate.getMonth()+1)+sendDate.getDate();

   if(td==today && currentDay==false){
       document.getElementById("row"+sendDate.getDay()).setAttribute("id","rowcurrent");
       currentDay=true;
       rowc=sendDate.getDay();
   }
   else if(rowc==sendDate.getDay() && today!=td && currentDay==true){    
       currentDay=false;
       document.getElementById("rowcurrent").setAttribute("id","row"+rowc);
   }
}

function getJSONFile(){
    //Gets holidayfile as a json
    var temp;
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                temp=JSON.parse(this.responseText);
                fillArrayWithHolidays(temp);
            }
            else{
                myDate();
            }
 };
        xmlhttp.open("GET", "jsontest.php", true);
        xmlhttp.send();       
}

function fillArrayWithHolidays(t){
    //Puts the json in array
    var testarr=[];
    testarr.push(t);
    for (var i in testarr){
        var temp=testarr[i];
    for(ii in temp){
        holidayList[temp[ii].date]=temp[ii].name;
    }
    myDate();
    }
}


function returnHolidayToCalendar(dateMatch){
    //Change the date string to match the json date string
    var stringDate;

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