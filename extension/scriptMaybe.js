if (window.localStorage.getItem("allow_css")){

}
else{
    document.documentElement.outerHTML;
    document.documentElement.innerHTML = "<div style='text-align:center;'><h1>This site maybe <span style='color:yellow'>Unsafe</span></h1>  <button id='button'  style='margin-left: 30px; background-color:red'><h3>I still want to Continue</h3></button> <button id='onceallow' style='margin-left:30px'><h3>Continue for this time ONLY</h3></button> <button style='margin-left:30px; background:#26dd26'><a href='https://www.google.com' ><h3>Go back to google search</h3></a></buttonid></div>";
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
        '    "url": location.href\n' +
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
        '\n' +
        'function clickonce(){\n' +
        '    location.reload()\n' +
        '}\n' +
        '    document.getElementById("button").addEventListener("click", clickAction);\n' +
        '    document.getElementById("onceallow").addEventListener("click", clickonce);\n' +
        '\n' +
        '\n' +
        '\n' +
        '  var settings = {\n' +
        '  "url": "http://localhost:8000/detect/metadata/",\n' +
        '  "method": "POST",\n' +
        '  "timeout": 0,\n' +
        '  "headers": {\n' +
        '    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",\n' +
        '  },\n' +
        '  "data": {\n' +
        '    "url": location.hostname,\n' +
        '\n' +
        '      "details": null\n' +
        '  }\n' +
        '};\n' +
        '\n' +
        '$.ajax(settings).done(function (response) {\n' +
        '\n' +
        '  console.log(response);\n' +
        '})\n' +
        '\n' +
        '\n' +
        '\n'
    head.appendChild(script);
    head.appendChild(script2);


}