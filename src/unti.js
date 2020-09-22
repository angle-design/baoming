export function ao () {
    let ua = window.navigator.userAgent;
    let app = window.navigator.appVersion;
    let inputs = document.getElementsByTagName('textarea');
    let inputt = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', function () {
            var currentPosition, timer;
            var speed = 1;
            timer = setInterval(function () {
                currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
                currentPosition -= speed;
                window.scrollTo(0, currentPosition);//页面向上滚动
                currentPosition += speed;
                window.scrollTo(0, currentPosition);//页面向下滚动
                clearInterval(timer);
            }, 100);
        })
        
    }
    for (var i = 0; i < inputt.length; i++) {
        inputt[i].addEventListener('blur', function () {
           
            var currentPosition, timer;
            var speed = 1;
            timer = setInterval(function () {
                currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
                currentPosition -= speed;
                window.scrollTo(0, currentPosition);//页面向上滚动
                currentPosition += speed;
                window.scrollTo(0, currentPosition);//页面向下滚动
                clearInterval(timer);
            }, 100);
        })
        
    }
}