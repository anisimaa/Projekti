var pisteet;

//talletetaan saadut pisteet local storageen
if (localStorage.pisteet) {
    pisteet = localStorage.pisteet;
} else {
    pisteet = 0;
}

document.getElementById("form1").onsubmit=function() {
    kuusikymmenta = parseInt(document.getElementById("kuusikymmenta").value);
    pienta = parseInt(document.getElementById("pienta").value);
    yksisentti = parseInt(document.getElementById("yksisentti").value);

       pisteet = kuusikymmenta + pienta + yksisentti;

       localStorage.pisteet = pisteet;


       document.getElementById("grade").innerHTML = pisteet;
       if (pisteet == 0) {pisteet2 = "En usko että olet opiskellut..."};
    if (pisteet == 1) {pisteet2 = "! Oioi... Harjoittele vielä !"};
    if (pisteet == 2) {pisteet2 = "! Niin lähellä, kokeile vielä !"};
    if (pisteet == 3) {pisteet2 = "! Vau olet mahtava !<br /><img src='../img/confetti.gif' width=/>"};
    document.getElementById("grade2").innerHTML = pisteet2;


return false;
}