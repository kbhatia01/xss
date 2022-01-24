if (window.localStorage.getItem("allow_css")){

}
else{
    document.documentElement.outerHTML;
    document.documentElement.innerHTML = "<h1>Site marked <span color=`red`>Unsafe</span></h1>  <button onclick=clickAction()><h3>Click here to continue</h3></button>";
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = 'function clickAction(){allow_css = window.localStorage.setItem("allow_css", true);location.reload()}';
    head.appendChild(script);
}