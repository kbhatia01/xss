function clickAction(){
    var settings = {
  "url": "http://localhost:8000/detect/marksafe/",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  "data": {
    "url": location.hostname
  }
};

$.ajax(settings).done(function (response) {

  console.log(response);
}).fail(function (response) {
  console.log(response);
}).always(function () {
        allow_css = window.localStorage.setItem("allow_css", true);

      location.reload();

});
}

function clickonce(){
    location.reload()
}
    document.getElementById("button").addEventListener("click", clickAction);
    document.getElementById("button").addEventListener("onceallow", clickonce);
    var settings = {
  "url": "http://localhost:8000/detect/metadata/",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  "data": {
    "url": location.hostname,

      "details": null
  }
};

$.ajax(settings).done(function (response) {

  console.log(response);
})



