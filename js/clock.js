//global variables to keep tack of time.
var hours=0;
var minutes=0;
var seconds=0;

//run the clock function every second.
setInterval(clock, 1000);

//clock running functions
function clock()
{
	increment_second();
	
	if((seconds % 60) == 0)
	{
		increment_minute();
		reset_seconds();
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

//clock time display functions 12hr/24hr
function display_12hr_time(hours, mintues, seconds)
{
	//variables for display '0' in front of hours, minutes, seconds
	var second_zero_display;
	var minute_zero_display;
	var hour_zero_display;
	
	var display_hours = hours;
	
	if (hours == 0)
	{
		document.getElementById("am_pm").innerHTML= "AM";
		display_hours = 12;
	}
	
	if (hours < 12)
	{
		document.getElementById("am_pm").innerHTML= "AM";
	}
	
	if (hours == 12)
	{
		document.getElementById("am_pm").innerHTML= "PM";
	}
	
	if (hours > 12)
	{
		document.getElementById("am_pm").innerHTML= "PM";
		display_hours = hours % 12;
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
	
	if(display_hours < 10)
	{
		hour_zero_display = "0";
	}
	else
	{
		hour_zero_display = "";
	}
	
	document.getElementById("full-time").innerHTML= 
		hour_zero_display 	+ display_hours + ":" + 
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

//Clock am/pm display functions
document.getElementById('display_12hr').addEventListener('click', function(){
	document.getElementById('display_12hr').checked = true;
	document.getElementById('display_24hr').checked = false;
});

document.getElementById('display_24hr').addEventListener('click', function(){
	document.getElementById('display_12hr').checked = false;
	document.getElementById('display_24hr').checked = true;
});


//populate drop down options
var select_hour = document.getElementById("select_hour");
for(var i=1; i<=12; i++) {
	if (i == 12){
		var o12 = new Option(i);
		o12.setAttribute("selected","selected");
		select_hour.add(o12);
	}
	else
	{
		select_hour.add(new Option(i));
	}
}
var select_minute = document.getElementById("select_minute");
for(var i=0; i<=59; i++) 
{
	if(i < 10)
	{
		if(i == 0)
		{
			var o1 = new Option(("0"+i));
			o1.setAttribute("selected","selected");
			select_minute.add(o1);
		}
		else
		{
			i = "0" + i;
			select_minute.add(new Option(i));
		}
	}
	else
	{
		select_minute.add(new Option(i));
	}
}

var select_second = document.getElementById("select_second");
for(var i=0; i<=59; i++) {
	if(i < 10)
	{
		if(i == 0)
		{
			var o1 = new Option(("0"+i));
			o1.setAttribute("selected","selected");
			select_second.add(o1);
		}
		else
		{
			i = "0" + i;
			select_second.add(new Option(i));
		}
	}
	else
	{
		select_second.add(new Option(i));
	}
}

//set time functions
document.getElementById('set_time').addEventListener('click', function() {
	//hours need to modify
	var slected_hours = parseInt(document.getElementById("select_hour").value);
	
	//these are directly set
	minutes = parseInt(document.getElementById("select_minute").value);
	seconds = parseInt(document.getElementById("select_second").value);

	//hours needs more work to get it display properly 
	var am_pm   = document.getElementById("select_am_pm").value;
	
	if (am_pm == "am" && slected_hours == 12)
	{
		hours = 0;
	} else if (am_pm == "am")
	{
		hours = slected_hours;
	} else if (am_pm == "pm" && slected_hours == 12){
		hours = 12;
	} else if (am_pm == "pm")
	{
		hours = slected_hours + 12;
	}
	
	//clear drop downs and set to default
	var select_hour = document.getElementById("select_hour");
	var length = select_hour.options.length;
	for (i = 0; i < length; i++) {
		select_hour[i].selected = select_hour[i].defaultSelected;
	}
	
	var select_minute = document.getElementById("select_minute");
	for(var i=0; i < select_minute.options.length; i++) {
		select_minute[i].selected = select_minute[i].defaultSelected;
	}

	var select_second = document.getElementById("select_second");
	for(var i=0; i < select_second.options.length; i++) {
		select_second[i].selected = select_second[i].defaultSelected;
	}
	
	var select_am_pm = document.getElementById("select_am_pm");
	select_am_pm[0].selected = select_am_pm[0].defaultSelected;
	
	//stop flashing
	clearInterval(flashing_handle);
	
	//Reset the time display's display property after flashing is stopped
	document.getElementById("time").style.display = '';
});

//flashing text
var flashing_text = document.getElementById("time");
flashing_handle = setInterval(function() {
	flashing_text.style.display = (flashing_text.style.display == 'none' ? '' : 'none');
}, 500);