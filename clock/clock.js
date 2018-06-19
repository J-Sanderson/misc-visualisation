$(document).ready(function() {
  
  const DAYS = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]
  
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  
  function tick() {
    
    let date = new Date();
    
    let minutes = date.getMinutes().toString();
    if (minutes.length < 2) { minutes = "0" + minutes }
    let hour = date.getHours().toString()
    if (hour.length < 2) { hour = "0" + hour }
    
    let timeString = date.getHours() + ":" + minutes;
    let dateString = "&nbsp;" + DAYS[date.getUTCDay()] + " " + date.getUTCDate() + " " + MONTHS[date.getMonth()];
    
    $("#time").empty().append(timeString);
    $("#date").empty().append(dateString);
    
    $("body").removeClass();
    
    switch(date.getHours()) {
      case 0:
        $("body").addClass("zero");
        break;
      case 1:
        $("body").addClass("one");
        break;
      case 2:
        $("body").addClass("two");
        break;
      case 3:
        $("body").addClass("three");
        break;
      case 4:
        $("body").addClass("four");
        break;
      case 5:
        $("body").addClass("five");
        break;
      case 6:
        $("body").addClass("six");
        break;
      case 7:
        $("body").addClass("seven");
        break;
      case 8:
        $("body").addClass("eight");
        break;
      case 9:
        $("body").addClass("nine");
        break;
      case 10:
        $("body").addClass("ten");
        break;
      case 11:
        $("body").addClass("eleven");
        break;
      case 12:
        $("body").addClass("twelve");
        break;
      case 13:
        $("body").addClass("thirteen");
        break;
      case 14:
        $("body").addClass("fourteen");
        break;
      case 15:
        $("body").addClass("fifteen");
        break;
      case 16:
        $("body").addClass("sixteen");
        break;
      case 17:
        $("body").addClass("seventeen");
        break;
      case 18:
        $("body").addClass("eighteen");
        break;
      case 19:
        $("body").addClass("nineteen");
        break;
      case 20:
        $("body").addClass("twenty");
        break;
      case 21:
        $("body").addClass("twentyone");
        break;
      case 22:
        $("body").addClass("twentytwo");
        break;
      case 23:
        $("body").addClass("twentythree");
        break;
    }
    
  }
  
  let secondCheck = setInterval(tick, 1000);
  
});
