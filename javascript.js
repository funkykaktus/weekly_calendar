var days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
var daysSwed=["Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag","Söndag"]
var startOnMonday={0:-6,1:0,2:-1,3:-2,4:-3,5:-4,6:-5}
var monthsSwed=["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December",]
var holidayList=[];
var goodToKnowArray=[]
var employes=[]
var currentDay=false;
var rowc;
var today;
var newDate;


function myDate(){
    newDate=new Date();
    today=newDate.getFullYear()+""+(newDate.getMonth()+1)+newDate.getDate();
    getWeek(0);
    //newPopWindow();   
}

function getWeek(changeWeek){

    //Change the calender to previous/next or get the week
    newDate.setDate(newDate.getDate()+changeWeek);
    //Start the calender on a monday
    var monday=startOnMonday[newDate.getDay()];
    newDate.setDate(newDate.getDate()+monday);

    //Prints the date
    for(var i=0; i<7;i++){
        
        //deletes the old database info from table
        document.getElementById("th"+i).innerHTML="";
        markTodaysDate(newDate);
        
    
        var getHolidays=returnHolidayToCalendar(newDate);
        document.getElementById("p"+i).innerHTML=getHolidays;   
        document.getElementById(days[i]).innerHTML=daysSwed[i]+"<br>"+(newDate.getDate())+"/"+(newDate.getMonth()+1);	
        database(newDate,i);
       
        newDate.setDate(newDate.getDate()+1);	  	         
    }
    
    document.getElementById("yeartext").innerHTML=newDate.getFullYear();
    document.getElementById("monthtext").innerHTML=monthsSwed[newDate.getMonth()];
    //Move the date back 7 days because we moved the date forward 7 days in the for loop
    newDate.setDate(newDate.getDate()-7);
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

function getJSONFile(type){
    //Gets holidayfile as a json
    
    var temp;
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if(type!="database"){
                temp=JSON.parse(this.responseText);
                fillArrayWithHolidays(temp,type);
            }
                else if(type=="database"){
                    temp=JSON.parse(this.responseText);
                    fillArrayWithHolidays(temp,type);
            }
            else{

            }
        }
 };
        xmlhttp.open("GET", "jsonfiles.php?type="+type, true);
        xmlhttp.send();       
}

function fillArrayWithHolidays(jsonHoliday,typeArray){
    //Puts the json in array
    var temparr=[];
    temparr.push(jsonHoliday);
    
    for (var i in temparr){
        var temparr2=temparr[i];
        for(ii in temparr2){
            if(typeArray=="holidays"){
                holidayList[temparr2[ii].date]=temparr2[ii].name;
            }
            else if(typeArray=="goodToKnow"){
                goodToKnowArray[temparr2[ii].date]=temparr2[ii].name;
            }else if (typeArray=="database"){
                employes[ii]=temparr2[ii];               
            }
    }
    myDate();
    }
}

function convertDate(dateMatch){
//Converts date to match the date in json files
    if((dateMatch.getMonth()+1)<10 && dateMatch.getDate()<10){
        return dateMatch.getFullYear()+"-"+"0"+(dateMatch.getMonth()+1)+"-0"+dateMatch.getDate();    
    }
    else if((dateMatch.getMonth()+1)<10 && dateMatch.getDate()>9){
        return dateMatch.getFullYear()+"-"+"0"+(dateMatch.getMonth()+1)+"-"+dateMatch.getDate();
    }
    else if((dateMatch.getMonth()+1)>9 && dateMatch.getDate()<10){
        return dateMatch.getFullYear()+"-"+(dateMatch.getMonth()+1)+"-0"+dateMatch.getDate();
    }
    else{
        return dateMatch.getFullYear()+"-"+(dateMatch.getMonth()+1)+"-"+dateMatch.getDate();
    }

}


function returnHolidayToCalendar(dateMatch){
    //Change the date string to match the json date string
    var stringDate=convertDate(dateMatch);
 
  
    if(holidayList[stringDate] && goodToKnowArray[stringDate]){
        return holidayList[stringDate]+ " "+goodToKnowArray[stringDate];    
    }
    else if(holidayList[stringDate] ){
        return holidayList[stringDate]; 
    }
    else if(goodToKnowArray[stringDate]){
        return goodToKnowArray[stringDate];
    }
    else{
        return "";
    }
    
    
}

function database(dateMatch,tableTH){
    //Change the date string to match the json date string
    var stringDate=convertDate(dateMatch);
    var sortedData= employes.sort((function (a, b) { 
        var t1=new Date(a.datetable+' '+a.starttime);
        var t2=new Date(b.datetable+' '+b.starttime);
        return t1<t2 ?-1: t1>t2 ?1:0;
      }));
   
   for(var f=0;f<employes.length;f++){
        
        if(employes[f].datetable==stringDate){
            var emplyoesName=employes[f].name;
            var emplyoesStarttime=employes[f].starttime;
            var emplyoesEndtime=employes[f].endtime;
            var emplyoesDate="";//employes[f].datetable;
            document.getElementById("th"+tableTH).innerHTML+="<section>"+emplyoesName+" "+emplyoesStarttime.slice(0,-3)+"-"+emplyoesEndtime.slice(0,-3)+emplyoesDate+"</section>";
        }
      
    }
}


function newPopWindow(){
   
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
}