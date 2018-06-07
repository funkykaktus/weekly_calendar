var days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
var daysSwed=["Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag","Söndag"]
var dayMinus={0:-6,1:0,2:-1,3:-2,4:-3,5:-4,6:-5}
var newDate;
var monthsSwed=["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December",]
var today1;
var currentDay=false;
var rowc;
var holidayList=[];

//get the date 
function mydate(){
    

    newDate=new Date();
    today1=newDate.getFullYear()+""+(newDate.getMonth()+1)+newDate.getDate();

    document.getElementById("yeartext").innerHTML=newDate.getFullYear();

    //Start the calender from a monday
    newDate.setDate(newDate.getDate()+dayMinus[newDate.getDay()]);
        for(var i=0; i<7;i++){
       
            checkToday(newDate,i);
            //matchDate(newDate);
           // console.log(matchDate(newDate)," v " ,newDate);
            document.getElementById("p"+i).innerHTML=matchDate(newDate);
            holidaychangecolor(i);
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
    newDate.setDate(newDate.getDate()+dayMinus[newDate.getDay()]);

    for(var i=0; i<7;i++){
        checkToday(newDate,i);
        //matchDate(newDate);
       // matchDate(newDate);
            
        document.getElementById("p"+i).innerHTML=matchDate(newDate);    
        document.getElementById(days[i]).innerHTML=daysSwed[i]+"<br>"+((newDate.getDate()))+"/"+(newDate.getMonth()+1);
        newDate.setDate(newDate.getDate()+1);		         
    }

    document.getElementById("yeartext").innerHTML=newDate.getFullYear();
    document.getElementById("monthtext").innerHTML=monthsSwed[newDate.getMonth()];
    //Move the date back 6 days because we moved the date forward 6 days in the for loop
    newDate.setDate(newDate.getDate()-6);
}


function checkToday(todayDateFun){
    td=todayDateFun.getFullYear()+""+(todayDateFun.getMonth()+1)+todayDateFun.getDate();
    rowc;

   if(td==today1 && currentDay==false){
       document.getElementById("row"+todayDateFun.getDay()).setAttribute("id","rowcurrent");
       currentDay=true;
       rowc=todayDateFun.getDay();
   }
   else if(rowc==todayDateFun.getDay() && today1!=td && currentDay==true){    
       currentDay=false;
       document.getElementById("rowcurrent").setAttribute("id","row"+rowc);
   }
}

function getHolidays(){
    
    var temp;
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 ) {
                temp=JSON.parse(this.responseText);
                testmet(temp);
            }
       /*     
            for (var i in testarr){
                    var temp=testarr[i];
                for(ii in temp){
                    holidayList[temp[ii].date]=temp[ii].name;
                }
            }
        */ };
        xmlhttp.open("GET", "jsontest.php?q=" +"d", true);
        xmlhttp.send();
}

function testmet(t){
    var testarr=[];
    testarr.push(t);
    for (var i in testarr){
        var temp=testarr[i];
    for(ii in temp){
        holidayList[temp[ii].date]=temp[ii].name;
    }
    mydate();
}
}


function matchDate(dateMatch){
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

    if(holidayList[stringDate]){
        return holidayList[stringDate];  
    }
    else{
        //hej
        return "";
    }
}










