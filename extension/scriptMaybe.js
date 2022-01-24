if (window.localStorage.getItem("allow_css")){

}
else{
    document.documentElement.outerHTML;
    document.documentElement.innerHTML = "<div style='text-align:center'><h1>Site maybe <span style='color:yellow'>Unsafe</span></h1>  <button id='button'><h3>Click here to continue</h3></button></div>";
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    var script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.text = 'function clickAction(){\n' +
        '    var settings = {\n' +
        '  "url": "http://localhost:8000/detect/marksafe/",\n' +
        '  "method": "POST",\n' +
        '  "timeout": 0,\n' +
        '  "headers": {\n' +
        '    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",\n' +
        '  },\n' +
        '  "data": {\n' +
        '    "url": location.hostname\n' +
        '  }\n' +
        '};\n' +
        '\n' +
        '$.ajax(settings).done(function (response) {\n' +
        '\n' +
        '  console.log(response);\n' +
        '}).fail(function (response) {\n' +
        '  console.log(response);\n' +
        '}).always(function () {\n' +
        '        allow_css = window.localStorage.setItem("allow_css", true);\n' +
        '\n' +
        '      location.reload();\n' +
        '\n' +
        '});\n' +
        '}\n' +
        '    document.getElementById("button").addEventListener("click", clickAction);\n' +
        '\n' +
        '\n' +
        '\n'
    head.appendChild(script);
    head.appendChild(script2);

}