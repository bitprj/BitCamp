var offset = 0;

setInterval(showTime, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function ValidateForm()
{
    var radioButtons = document.getElementsByName("tz");
    var timezone = radioButtons[0].value;
    for(var i = 0; i < radioButtons.length; i++)
    {
        if(radioButtons[i].checked == true)
        {
            timezone = radioButtons[i].value;
        }
    }
    if (timezone == "cst"){
        offset = 1;
    } else if (timezone == "mst"){
        offset = 2;
    } else if (timezone == "pst"){
        offset = 3;
    } else if (timezone == "ast"){
        offset = 4;
    } else if (timezone == "hst"){
        offset = 5;
    } else if (timezone == "est"){
        offset = 0;
    }
    showTime();
}

function showTime(){
    const currentDate = new Date()
	const secondsRatio = currentDate.getSeconds() / 60
	const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
	const hoursRatio = (minutesRatio + currentDate.getHours() - offset) / 12
	setRotation(secondHand, secondsRatio)
	setRotation(minuteHand, minutesRatio)
	setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio){
	element.style.setProperty(`--rotation`, rotationRatio * 360)
}

showTime()