document.getElementById("form1").onsubmit=function() {
    kuusikymmenta = parseInt(document.getElementById("kuusikymmenta").value);
    pienta = parseInt(document.getElementById("pienta").value);
    yksisentti = parseInt(document.getElementById("yksisentti").value);

       result = kuusikymmenta + pienta + yksisentti;

       document.getElementById("grade").innerHTML = result;



return false;
}