
// if invoked and the URL has #id and an element in the page has that
// ID, will add the "notice" class to that element
/*
function highlightHashId() {
  if (location.hash) {
    var elt = document.getElementById(location.hash.substr(1));
    if (elt) {
      elt.classList.add("notice");
    }
  }
}
*/

function showAdvice(form) {
  var text = "";
  for (var i = 0; i < form.elements.length; ++i) {
    var elt = form.elements[i];
    if (elt.value && elt.name) {
      text += elt.name + ": " + elt.value + "\n\n";
    }
  }
  if (text) {
    var result = document.getElementById("result");
    result.value = text;
    document.getElementById("advice").style.display = "block";
    result.select();
  }
}

function closeBox(id) {
  document.getElementById("advice").style.display = "none";
}
