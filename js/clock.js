/**
 * @author      Purna Doddapaneni
 * @author      Dilesh Fernando
 * @author      Paul Charles
 * @author      Cheng Yeh Lee
 */
//global variables to keep tack of time.
var hours=0;
var minutes=0;
var seconds=0;

//run the clock function every second.
setInterval(clock, 1000);

//clock running functions
/**
 * Changes the time of the clock as well as displaying that time    (1)
 * <p>
 * The clock is operated by incrementing the seconds. This is a marker
 * to increment the minutes when it reaches 60 seconds. The incrementation
 * of the minutes allow for the incrementation of hours when 60 minutes are
 * are reached. When each of the three time markers reach the incrementation
 * limit, they are reset to 0. However, the hours are reset to a value 
 * depending on the time mode selected. The display features depend on 
 * the time mode selected and displays accordingly.
 *															(2)
 * <p>
 * @param  none
 *                                                       (3)
 */
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

/**
 * Increment seconds variable by 1 to keep track of time          (1)
 * <p>                                                 (3)
 * @pre call from clock function
 * @post seconds incremented by 1
 */
function increment_second()
{
	seconds++;
}
/**
 * Reset Seconds to zero                                          (1)
 * <p>
 * This function is called when the seconds reach 59 seconds. The next value is 60 which corresponds to zero (2)
 * <p>                                                 (3)
 * @pre call from clock function
 * @post seconds reset to zero
 */
function reset_seconds()
{
	seconds=0;
}

/**
 * Increment minutes variable by 1 to keep track of time            (1)
 * <p>
 * This function is called when the variables seconds reaches 60    (2)
 * <p>                                                   (3)
 * @pre call from clock function
 * @post minutes incremented by 1
 */
function increment_minute()
{
	minutes++;
}

/**
 * Reset minutes to zero        (1)
 * <p>
 * This function is called when the minutes reach 59 minutes. The next value is 60 which corresponds to zero   (2)
 * <p>  
 * @pre call from clock function
 * @post minutes reset to zero                                                  (3)
 */

function reset_minutes()
{
	minutes=0;
}

/**
 * Increment Hours by 1 when it reaches 24       (1)
 * <p>                                                     (3)
 * @pre call from clock function
 * @post hours incremented by 1
 */

function increment_hour()
{
	hours++;
}

/**
 * Reset Hours to Zero    (1)
 * <p>
 * This function is called when the hours reach 24. The next value is 0 which corresponds to zero   (2)
 * <p>           
 * @pre call from clock function
 * @post hours reset to zero                                       (3)
 */
function reset_hours()
{
	hours=0;
}
/**
 * Display the time in 12 hour mode    (1)
 * <p>
 * The function considers various scenarios based on the nature on the timing system to pick the correct display style.
 * Formatting is also considered as the clock displays two digits for hours, minutes and time  
 * The AM/PM value is evaluted based on what the hours global variable is reading at a specific time. The clock is in PM mode when hours are greater than 12 and AM mode when the hours are less than 12. (2)
 * <p>
 * @param  hours - Global variable keeping track of hours
 * @param  minutes - Global variable keeping track of minutes
 * @param  seconds - Global variable keeping track of seconds
 *                                                       (3)
 */
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


/**
 * Display the time in 24 hour mode    (1)
 * <p>
 * The function considers various scenarios based on the nature on the timing system to pick the correct display style.
 * Formatting is also considered as the clock displays two digits for hours, minutes and time  
 * <p>
 * @param  hours - Global variable keeping track of hours
 * @param  minutes - Global variable keeping track of minutes
 * @param  seconds - Global variable keeping track of seconds
 *                                                       (3)
 */
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
/**
 * Waits for mouseclick event to see which radio button is selected for ClockMode  (1)
 * <p>
 * If the 12 hour mode is chosen, set 24 hour mode function to false
 * <p>
 * @pre call when radio buttin is pushed
 * @post changes display of clock to 12 hour mode
 */
document.getElementById('display_12hr').addEventListener('click', function(){
	document.getElementById('display_12hr').checked = true;
	document.getElementById('display_24hr').checked = false;
});

/**
 * Waits for mouseclick event to see which radio button is selected for ClockMode  (1)
 * <p>
 * If the 12 hour mode is chosen, set 24 hour mode function to true
 * <p>
 * @pre call when radio buttin is pushed
 * @post changes display of clock to 24 hour mode
 */
document.getElementById('display_24hr').addEventListener('click', function(){
	document.getElementById('display_12hr').checked = false;
	document.getElementById('display_24hr').checked = true;
});

/**
 * Obtains the hours value when set time functionality is used 
 * <p>
 * The list is first populated using a for loop. Based on the option chosen, the select_hour variable is assigned the value chosen.
 * <p>
 * @pre drop down value changes
 * @post select_hour updated to new user choice
 */
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
/**
 * Obtains the minutes value when set time functionality is used 
 * <p>
 * The list is first populated using a for loop. Based on the option chosen, the select_minute variable is assigned the value chosen.
 * <p>
 * @pre drop down value changes
 * @post select_minute updated to new user choice
 */
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

/**
 * Obtains the seconds value when set time functionality is used 
 * <p>
 * The list is first populated using a for loop. Based on the option chosen, the select_second variable is assigned the value chosen.
 * <p>
 * @pre drop down value changes
 * @post select_second updated to new user choice
 */
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
/**
 * Allows user to set desired time
 * <p>
 * With the various fields with input, and the set time button event occuring, the time is set to the user desired time. The various feilds are cleared to their initial values and the flashing stops.
 * <p>
 * @pre set time button pushed
 * @post clock display update to new time
 */
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

/**
 * Make Time display flash until time has been set once.
 * <p>
 */
var flashing_text = document.getElementById("time");
flashing_handle = setInterval(function() {
	flashing_text.style.display = (flashing_text.style.display == 'none' ? '' : 'none');
}, 500);