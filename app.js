let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
const dots = [];
const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
for (let index = 0; index < 50; index++) {
    dots.push({
        x:  Math.floor(Math.random() * canvas.width),
        y:  Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random()* 5)]
    });
}
const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI*2);
        ctx.fill();
    })
}
drawDots();
banner.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x:  event.pageX - banner.getBoundingClientRect().left,
        y:  event.pageY - banner.getBoundingClientRect().top
    }
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if(distance < 300){
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
})
banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
})
window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;

    dots = [];
    for (let index = 0; index < 50; index++) {
        dots.push({
            x:  Math.floor(Math.random() * canvas.width),
            y:  Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random()* 5)]
        });
    }

    drawDots();
    
})
const months = [31,28,31,30,31,30,31,31,30,31,30,31];

function ageCalculate(){
    let today = new Date();
    let inputDate = new Date(document.getElementById("date-input").value);
    let birthMonth,birthDate,birthYear;
    let birthDetails = {
        date:inputDate.getDate(),
        month:inputDate.getMonth()+1,
        year:inputDate.getFullYear()
    }
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    let currentDate = today.getDate();

    leapChecker(currentYear);

    if(
        birthDetails.year > currentYear ||
        ( birthDetails.month > currentMonth && birthDetails.year == currentYear) || 
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)
    ){
        alert("Not Born Yet");
        displayResult("-","-","-");
        return;
    }

    birthYear = currentYear - birthDetails.year;

    if(currentMonth >= birthDetails.month){
        birthMonth = currentMonth - birthDetails.month;
    }
    else{
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if(currentDate >= birthDetails.date){
        birthDate = currentDate - birthDetails.date;
    }
    else{
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
    }
    displayResult(birthDate,birthMonth,birthYear);
}

function displayResult(bDate,bMonth,bYear){
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

function leapChecker(year){
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29;
    }
    else{
        months[1] = 28;
    }
}
