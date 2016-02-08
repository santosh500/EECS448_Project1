var sysTick = 0;
var hours=0;
var minutes=0;
var seconds=0;
var CTtoggle=0;
var dayType;
var clockType;

setInterval(clock, 1000);

function clock()
{
	//Increment sysTick
	sysTick++;

	increment_second();
	
	if((sysTick % 60) == 0)
	{
		increment_minute();
		reset_seconds();
		reset_sysTick();
	}
	
	if(minutes == 60)
	{
		increment_hour();
		reset_minutes();
	}
	
	if(hours == 24)
	{
		reset_hours();
	}

	if(document.getElementById('display_12hr').checked)
	{
		display_12hr_time(hours, minutes, seconds);
	}
	else
	{
		display_24hr_time(hours, minutes, seconds);
	}
	
}

function increment_second()
{
	seconds++;
}

function reset_seconds()
{
	seconds=0;
}

function increment_minute()
{
	minutes++;
}

function reset_minutes()
{
	minutes=0;
}

function increment_hour()
{
	hours++;
}

function reset_hours()
{
	hours=0;
}

function reset_sysTick()
{
	sysTick = 0;
}

function changeclock()
{
	clockType=prompt("give 12 or 24 hours");
	if(clockType==12)
	{
		CTtoggle=1;
		changeday();
	}
			
}


function changeday()
{
	dayType=prompt("give am/pm");
}

function display_12hr_time(hours, mintues, seconds)
{
	var second_zero_display;
	var minute_zero_display;
	var hour_zero_display;

	if (hours == 0)
	{
		document.getElementById("am_pm").innerHTML= "AM";
		hours = 12;
	}
	
	if (hours < 12)
	{
		document.getElementById("am_pm").innerHTML= "AM";
	}
	
	if (hours > 12)
	{
		document.getElementById("am_pm").innerHTML= "PM";
		hours = hours % 12;
	}
	
	if(seconds < 10)
	{
		second_zero_display = "0";
	}
	else
	{
		second_zero_display = "";
	}
    
	if(minutes < 10)
	{
		minute_zero_display = "0";
	}
	else
	{
		minute_zero_display = "";
	}
	
	if(hours < 10)
	{
		hour_zero_display = "0";
	}
	else
	{
		hour_zero_display = "";
	}
	
	document.getElementById("full-time").innerHTML= 
		hour_zero_display 	+ hours + ":" + 
		minute_zero_display + minutes + ":" + 
		second_zero_display + seconds;
}

function display_24hr_time(hours, mintues, seconds)
{
	var second_zero_display;
	var minute_zero_display;
	var hour_zero_display;
	
	if(seconds < 10)
	{
		second_zero_display = "0";
	}
	else
	{
		second_zero_display = "";
	}
    
	if(minutes < 10)
	{
		minute_zero_display = "0";
	}
	else
	{
		minute_zero_display = "";
	}
	
	if(hours < 10)
	{
		hour_zero_display = "0";
	}
	else
	{
		hour_zero_display = "";
	}
	
	document.getElementById("full-time").innerHTML= 
		hour_zero_display 	+ hours + ":" + 
		minute_zero_display + minutes + ":" + 
		second_zero_display + seconds;
	
	document.getElementById("am_pm").innerHTML= "";
}

function reset_time(new_hours, new_seconds, new_minutes)
{
	reset_hours();
	reset_minutes();
	reset_seconds();
	hours=new_hours;
	seconds=new_seconds;
	minutes=new_minutes;	
}	

//Function To Display Popup
function div_show() 
{
	document.getElementById('abc').style.display = "block";
}
//Function to Hide Popup
function div_hide()
{
	document.getElementById('abc').style.display = "none";
}

var select_hour = document.getElementById("select_hour");
for(var i=0; i<=23; i++) {   
	select_hour.add(new Option(i));
};

var select_minute = document.getElementById("select_minute");
for(var i=0; i<=59; i++) {
	select_minute.add(new Option(i));
};

var select_second = document.getElementById("select_second");
for(var i=0; i<=59; i++) {
	select_second.add(new Option(i));
};

//Set time functions from pop up window
function input_hour() {
    hours = document.getElementById("select_hour").value;
}

function input_minute() {
    minutes = document.getElementById("select_minute").value;
}

function input_second() {
    seconds = document.getElementById("select_second").value;
}

document.getElementById('display_12hr').addEventListener('click', function(){
	document.getElementById('display_12hr').checked = true;
	document.getElementById('display_24hr').checked = false;
	
	document.getElementById('set_time_12hr').checked = true;
	document.getElementById('set_time_24hr').checked = false;
});

document.getElementById('display_24hr').addEventListener('click', function(){
	document.getElementById('display_12hr').checked = false;
	document.getElementById('display_24hr').checked = true;
	
	document.getElementById('set_time_12hr').checked = false;
	document.getElementById('set_time_24hr').checked = true;
});
