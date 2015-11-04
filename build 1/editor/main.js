/*

TITLE: 
  MAIN.JS

AUTHOR: Seagat2011 
  http://fold.it/port/user/1992490
  http://eterna.cmu.edu/web/player/90270/

VERSION: 
  Major.Minor.Release.Build
  1.0.0.0

STYLEGUIDE: 
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
    
REFERENCES:
  N/A

DESCRIPTION: 
  JINSIL / JINT BLACK SPADE - (sourcecode editor for JINSIL / JINT BLUE)

INPUT:
  plain text

OUTPUT:
  pretty-text
  
SCRIPT TYPE: 
  pretty-text renderer

*/

var instanceHANDLE = 0
var voidkeycode = {
    16: 1,
    17: 1,
    18: 1,
    20: 1,
    33: 1,
    34: 1,
    35: 1,
    36: 1,
    37: 1,
    38: 1,
    39: 1,
    40: 1,
    45: 1,
    225: 1,
}
function setText(o,w) {
    if('innerText' in o) {
        o.innerText = w
    } else {
        o.innerHTML = w
            .replace(/\n/gm,"<br>")
            .replace(/\s/gm,"&nbsp;")
            .replace(/\\u[a-fA-F0-9]+/gm,function(v){
                var result = v
                var status = {
                    // UNICODE GREEK
                    "\u0391": "&Alpha;",
                    "\u0392": "&Beta;",
                    "\u0393": "&Gamma;",
                    "\u0394": "&Delta;",
                    "\u0395": "&Epsilon;",
                    "\u0396": "&Zeta;",
                    "\u0397": "&Eta;",
                    "\u0398": "&Theta;",
                    "\u0399": "&Iota;",
                    "\u039A": "&Kappa;",
                    "\u039B": "&Lambda;",
                    "\u039C": "&Mu;",
                    "\u039D": "&Nu;",
                    "\u039E": "&Xi;",
                    "\u039F": "&Omicron;",
                    "\u03A0": "&Pi;",
                    "\u03A1": "&Rho;",
                    "\u03A3": "&Sigma;",
                    "\u03A4": "&Tau;",
                    "\u03A5": "&Upsilon;",
                    "\u03A6": "&Phi;",
                    "\u03A7": "&Chi;",
                    "\u03A8": "&Psi;",
                    "\u03A9": "&Omega;",
                    "\u03B1": "&alpha;",
                    "\u03B2": "&beta;",
                    "\u03B3": "&gamma;",
                    "\u03B4": "&delta;",
                    "\u03B5": "&epsilon;",
                    "\u03B6": "&zeta;",
                    "\u03B7": "&eta;",
                    "\u03B8": "&theta;",
                    "\u03B9": "&iota;",
                    "\u03BA": "&kappa;",
                    "\u03BB": "&lambda;",
                    "\u03BC": "&mu;",
                    "\u03BD": "&nu;",
                    "\u03BE": "&xi;",
                    "\u03BF": "&omicron;",
                    "\u03C0": "&pi;",
                    "\u03C1": "&rho;",
                    "\u03C2": "&sigmaf;",
                    "\u03C3": "&sigma;",
                    "\u03C4": "&tau;",
                    "\u03C5": "&upsilon;",
                    "\u03C6": "&phi;",
                    "\u03C7": "&chi;",
                    "\u03C8": "&psi;",
                    "\u03C9": "&omega;",
                    "\u03D1": "&thetasym;",
                    "\u03D2": "&upsih;",
                    "\u03D5": "&straightphi;",
                    "\u03D6": "&piv;",
                    "\u03DC": "&Gammad;",
                    "\u03DD": "&gammad;",
                    "\u03F0": "&varkappa;",
                    "\u03F1": "&varrho;",
                    "\u03F5": "&straightepsilon;",
                    "\u03F6": "&backepsilon;",
                    
                    // SYMBOLS
                    "\u2600":"&#9728;",
                    "\u2601":"&#9729;", 
                    "\u2602":"&#9730;",
                    "\u2603":"&#9731;",
                    "\u2604":"&#9732;",
                    "\u2605":"&#9733;",
                    "\u2606":"&#9734;",
                    "\u2607":"&#9735;",
                    "\u2608":"&#9736;",
                    "\u2609":"&#9737;",
                    "\u260A":"&#9738;",
                    "\u260B":"&#9739;",
                    "\u260C":"&#9740;",
                    "\u260D":"&#9741;",
                    "\u260E":"&#9742;",
                    "\u260F":"&#9743;",
                    "\u2610":"&#9744;",
                    "\u2611":"&#9745;",
                    "\u2612":"&#9746;",
                    "\u2613":"&#9747;",
                    "\u2614":"&#9748;",
                    "\u2615":"&#9749;",
                    "\u2616":"&#9750;",
                    "\u2617":"&#9751;",
                    "\u2618":"&#9752;",
                    "\u2619":"&#9753;",
                    "\u261A":"&#9754;",
                    "\u261B":"&#9755;",
                    "\u261C":"&#9756;",
                    "\u261D":"&#9757;",
                    "\u261E":"&#9758;",
                    "\u261F":"&#9759;",
                    "\u2620":"&#9760;",
                    "\u2621":"&#9761;",
                    "\u2622":"&#9762;",
                    "\u2623":"&#9763;",
                    "\u2624":"&#9764;",
                    "\u2625":"&#9765;",
                    "\u2626":"&#9766;",
                    "\u2627":"&#9767;",
                    "\u2628":"&#9768;",
                    "\u2629":"&#9769;",
                    "\u262A":"&#9770;",
                    "\u262B":"&#9771;",
                    "\u262C":"&#9772;",
                    "\u262D":"&#9773;",
                    "\u262E":"&#9774;",
                    "\u262F":"&#9775;",
                    "\u2630":"&#9776;",
                    "\u2631":"&#9777;",
                    "\u2632":"&#9778;",
                    "\u2633":"&#9779;",
                    "\u2634":"&#9780;",
                    "\u2635":"&#9781;",
                    "\u2636":"&#9782;",
                    "\u2637":"&#9783;",
                    "\u2638":"&#9784;",
                    "\u2639":"&#9785;",
                    "\u263A":"&#9786;",
                    "\u263B":"&#9787;",
                    "\u263C":"&#9788;",
                    "\u263D":"&#9789;",
                    "\u263E":"&#9790;",
                    "\u263F":"&#9791;",
                    "\u2640":"&#9792;",
                    "\u2641":"&#9793;",
                    "\u2642":"&#9794;",
                    "\u2643":"&#9795;",
                    "\u2644":"&#9796;",
                    "\u2645":"&#9797;",
                    "\u2646":"&#9798;",
                    "\u2647":"&#9799;",
                    "\u2648":"&#9800;",
                    "\u2649":"&#9801;",
                    "\u264A":"&#9802;",
                    "\u264B":"&#9803;",
                    "\u264C":"&#9804;",
                    "\u264D":"&#9805;",
                    "\u264E":"&#9806;",
                    "\u264F":"&#9807;",
                    "\u2650":"&#9808;",
                    "\u2651":"&#9809;",
                    "\u2652":"&#9810;",
                    "\u2653":"&#9811;",
                    "\u2654":"&#9812;",
                    "\u2655":"&#9813;",
                    "\u2656":"&#9814;",
                    "\u2657":"&#9815;",
                    "\u2658":"&#9816;",
                    "\u2659":"&#9817;",
                    "\u265A":"&#9818;",
                    "\u265B":"&#9819;",
                    "\u265C":"&#9820;",
                    "\u265D":"&#9821;",
                    "\u265E":"&#9822;",
                    "\u265F":"&#9823;",
                    "\u2660":"&#9824;",
                    "\u2660":"&spades;",
                    "\u2661":"&#9825;",
                    "\u2662":"&#9826;",
                    "\u2663":"&#9827;",
                    "\u2663":"&clubs;",
                    "\u2664":"&#9828;",
                    "\u2665":"&#9829;",
                    "\u2665":"&hearts;",
                    "\u2666":"&#9830;",
                    "\u2666":"&#diams;",
                    "\u2667":"&#9831;",
                    "\u2668":"&#9832;",
                    "\u2669":"&#9833;",
                    "\u266A":"&#9834;",
                    "\u266B":"&#9835;",
                    "\u266C":"&#9836;",
                    "\u266D":"&#9837;",
                    "\u266E":"&#9838;",
                    "\u266F":"&#9839;",
                    "\u2670":"&#9840;",
                    "\u2671":"&#9841;",
                    "\u2672":"&#9842;",
                    "\u2673":"&#9843;",
                    "\u2674":"&#9844;",
                    "\u2675":"&#9845;",
                    "\u2676":"&#9846;",
                    "\u2677":"&#9847;",
                    "\u2678":"&#9848;",
                    "\u2679":"&#9849;",
                    "\u267A":"&#9850;",
                    "\u267B":"&#9851;",
                    "\u267C":"&#9852;",
                    "\u267D":"&#9853;",
                    "\u267E":"&#9854;",
                    "\u267F":"&#9855;",
                    "\u2680":"&#9856;",
                    "\u2681":"&#9857;",
                    "\u2682":"&#9858;",
                    "\u2683":"&#9859;",
                    "\u2684":"&#9860;",
                    "\u2685":"&#9861;",
                    "\u2686":"&#9862;",
                    "\u2687":"&#9863;",
                    "\u2688":"&#9864;",
                    "\u2689":"&#9865;",
                    "\u268A":"&#9866;",
                    "\u268B":"&#9867;",
                    "\u268C":"&#9868;",
                    "\u268D":"&#9869;",
                    "\u268E":"&#9870;",
                    "\u268F":"&#9871;",
                    "\u2690":"&#9872;",
                    "\u2691":"&#9873;",
                    "\u2692":"&#9874;",
                    "\u2693":"&#9875;",
                    "\u2694":"&#9876;",
                    "\u2695":"&#9877;",
                    "\u2696":"&#9878;",
                    "\u2697":"&#9879;",
                    "\u2698":"&#9880;",
                    "\u2699":"&#9881;",
                    "\u269A":"&#9882;",
                    "\u269B":"&#9883;",
                    "\u269C":"&#9884;",
                    "\u269D":"&#9885;",
                    "\u269E":"&#9886;",
                    "\u269F":"&#9887;",
                    "\u26A0":"&#9888;",
                    "\u26A1":"&#9889;",
                    "\u26A2":"&#9890;",
                    "\u26A3":"&#9891;",
                    "\u26A4":"&#9892;",
                    "\u26A5":"&#9893;",
                    "\u26A6":"&#9894;",
                    "\u26A7":"&#9895;",
                    "\u26A8":"&#9896;",
                    "\u26A9":"&#9897;",
                    "\u26AA":"&#9898;",
                    "\u26AB":"&#9899;",
                    "\u26AC":"&#9900;",
                    "\u26AD":"&#9901;",
                    "\u26AE":"&#9902;",
                    "\u26AF":"&#9903;",
                    "\u26B0":"&#9904;",
                    "\u26B1":"&#9905;",
                    "\u26B2":"&#9906;",
                    "\u26B3":"&#9907;",
                    "\u26B4":"&#9908;",
                    "\u26B5":"&#9909;",
                    "\u26B6":"&#9910;",
                    "\u26B7":"&#9911;",
                    "\u26B8":"&#9912;",
                    "\u26B9":"&#9913;",
                    "\u26BA":"&#9914;",
                    "\u26BB":"&#9915;",
                    "\u26BC":"&#9916;",
                    "\u26BD":"&#9917;",
                    "\u26BE":"&#9918;",
                    "\u26BF":"&#9919;",
                    "\u26C0":"&#9920;",
                    "\u26C1":"&#9921;",
                    "\u26C2":"&#9922;",
                    "\u26C3":"&#9923;",
                    "\u26C4":"&#9924;",
                    "\u26C5":"&#9925;",
                    "\u26C6":"&#9926;",
                    "\u26C7":"&#9927;",
                    "\u26C8":"&#9928;",
                    "\u26C9":"&#9929;",
                    "\u26CA":"&#9930;",
                    "\u26CB":"&#9931;",
                    "\u26CC":"&#9932;",
                    "\u26CD":"&#9933;",
                    "\u26CE":"&#9934;",
                    "\u26CF":"&#9935;",
                    "\u26D0":"&#9936;",
                    "\u26D1":"&#9937;",
                    "\u26D2":"&#9938;",
                    "\u26D3":"&#9939;",
                    "\u26D4":"&#9940;",
                    "\u26D5":"&#9941;",
                    "\u26D6":"&#9942;",
                    "\u26D7":"&#9943;",
                    "\u26D8":"&#9944;",
                    "\u26D9":"&#9945;",
                    "\u26DA":"&#9946;",
                    "\u26DB":"&#9947;",
                    "\u26DC":"&#9948;",
                    "\u26DD":"&#9949;",
                    "\u26DE":"&#9950;",
                    "\u26DF":"&#9951;",
                    "\u26E0":"&#9952;",
                    "\u26E1":"&#9953;",
                    "\u26E2":"&#9954;",
                    "\u26E3":"&#9955;",
                    "\u26E4":"&#9956;",
                    "\u26E5":"&#9957;",
                    "\u26E6":"&#9958;",
                    "\u26E7":"&#9959;",
                    "\u26E8":"&#9960;",
                    "\u26E9":"&#9961;",
                    "\u26EA":"&#9962;",
                    "\u26EB":"&#9963;",
                    "\u26EC":"&#9964;",
                    "\u26ED":"&#9965;",
                    "\u26EE":"&#9966;",
                    "\u26EF":"&#9967;",
                    "\u26F0":"&#9968;",
                    "\u26F1":"&#9969;",
                    "\u26F2":"&#9970;",
                    "\u26F3":"&#9971;",
                    "\u26F4":"&#9972;",
                    "\u26F5":"&#9973;",
                    "\u26F6":"&#9974;",
                    "\u26F7":"&#9975;",
                    "\u26F8":"&#9976;",
                    "\u26F9":"&#9977;",
                    "\u26FA":"&#9978;",
                    "\u26FB":"&#9979;",
                    "\u26FC":"&#9980;",
                    "\u26FD":"&#9981;",
                    "\u26FE":"&#9982;",
                    "\u26FF":"&#9983;",
                    
                    // CURRENCY
                    "\u20A0":"&#8352;",
                    "\u20A1":"&#8353;",
                    "\u20A2":"&#8354;",
                    "\u20A3":"&#8355;",
                    "\u20A4":"&#8356;",
                    "\u20A5":"&#8357;",
                    "\u20A6":"&#8358;",
                    "\u20A7":"&#8359;",
                    "\u20A8":"&#8360;",
                    "\u20A9":"&#8361;",
                    "\u20AA":"&#8362;",
                    "\u20AB":"&#8363;",
                    "\u20AC":"&#8364;",
                    "\u20AC":"&euro;",
                    "\u20AD":"&#8365;",
                    "\u20AE":"&#8366;",
                    "\u20AF":"&#8367;",
                    "\u20B0":"&#8368;",
                    "\u20B1":"&#8369;",
                    "\u20B2":"&#8370;",
                    "\u20B3":"&#8371;",
                    "\u20B4":"&#8372;",
                    "\u20B5":"&#8373;",
                    "\u20B6":"&#8374;",
                    "\u20B7":"&#8375;",
                    "\u20B8":"&#8376;",
                    "\u20B9":"&#8377;",
                }
                return status[v] || result
            })
    }
}
function getText(o) {
    var ret
    if('innerText' in o) {
        ret = o.innerText
    } else {
        ret = o.innerHTML
            .replace(/<\s*\\?\s*br\s*>/gmi,'\n')
            .replace(/<\s*\\?\s*.+\s*>/gmi,'')
            .replace(/&#?[a-zA-Z][a-z]+;/gm,function(v){
                var result = v
                var status = {
                    // UNICODE GREEK
                    "&nbsp;":" ",
                    "&lt;":"<",
                    "&gt;":">",
                    "&amp;":"&",
                    "&Alpha;":"\u0391", 
                    "&Beta;":"\u0392", 
                    "&Gamma;":"\u0393", 
                    "&Delta;":"\u0394", 
                    "&Epsilon;":"\u0395", 
                    "&Zeta;":"\u0396", 
                    "&Eta;":"\u0397", 
                    "&Theta;":"\u0398", 
                    "&Iota;":"\u0399", 
                    "&Kappa;":"\u039A", 
                    "&Lambda;":"\u039B", 
                    "&Mu;":"\u039C", 
                    "&Nu;":"\u039D", 
                    "&Xi;":"\u039E", 
                    "&Omicron;":"\u039F", 
                    "&Pi;":"\u03A0", 
                    "&Rho;":"\u03A1", 
                    "&Sigma;":"\u03A3", 
                    "&Tau;":"\u03A4", 
                    "&Upsilon;":"\u03A5", 
                    "&Phi;":"\u03A6", 
                    "&Chi;":"\u03A7", 
                    "&Psi;":"\u03A8", 
                    "&Omega;":"\u03A9", 
                    "&alpha;":"\u03B1", 
                    "&beta;":"\u03B2", 
                    "&gamma;":"\u03B3", 
                    "&delta;":"\u03B4", 
                    "&epsilon;":"\u03B5", 
                    "&zeta;":"\u03B6", 
                    "&eta;":"\u03B7", 
                    "&theta;":"\u03B8", 
                    "&iota;":"\u03B9", 
                    "&kappa;":"\u03BA", 
                    "&lambda;":"\u03BB", 
                    "&mu;":"\u03BC", 
                    "&nu;":"\u03BD", 
                    "&xi;":"\u03BE", 
                    "&omicron;":"\u03BF", 
                    "&pi;":"\u03C0", 
                    "&rho;":"\u03C1", 
                    "&sigmaf;":"\u03C2", 
                    "&sigma;":"\u03C3", 
                    "&tau;":"\u03C4", 
                    "&upsilon;":"\u03C5", 
                    "&phi;":"\u03C6", 
                    "&chi;":"\u03C7", 
                    "&psi;":"\u03C8", 
                    "&omega;":"\u03C9", 
                    "&thetasym;":"\u03D1", 
                    "&upsih;":"\u03D2",
                    "&straightphi;":"\u03D5", 
                    "&piv;":"\u03D6", 
                    "&Gammad;":"\u03DC", 
                    "&gammad;":"\u03DD", 
                    "&varkappa;":"\u03F0", 
                    "&varrho;":"\u03F1", 
                    "&straightepsilon;":"\u03F5", 
                    "&backepsilon;":"\u03F6", 
                    
                    // SYMBOLS
                    "&#9728;":"\u2600",
                    "&#9729;":"\u2601",
                    "&#9730;":"\u2602",
                    "&#9731;":"\u2603",
                    "&#9732;":"\u2604",
                    "&#9733;":"\u2605",
                    "&#9734;":"\u2606",
                    "&#9735;":"\u2607",
                    "&#9736;":"\u2608",
                    "&#9737;":"\u2609",
                    "&#9738;":"\u260A",
                    "&#9739;":"\u260B",
                    "&#9740;":"\u260C",
                    "&#9741;":"\u260D",
                    "&#9742;":"\u260E",
                    "&#9743;":"\u260F",
                    "&#9744;":"\u2610",
                    "&#9745;":"\u2611",
                    "&#9746;":"\u2612",
                    "&#9747;":"\u2613",
                    "&#9748;":"\u2614",
                    "&#9749;":"\u2615",
                    "&#9750;":"\u2616",
                    "&#9751;":"\u2617",
                    "&#9752;":"\u2618",
                    "&#9753;":"\u2619",
                    "&#9754;":"\u261A",
                    "&#9755;":"\u261B",
                    "&#9756;":"\u261C",
                    "&#9757;":"\u261D",
                    "&#9758;":"\u261E",
                    "&#9759;":"\u261F",
                    "&#9760;":"\u2620",
                    "&#9761;":"\u2621",
                    "&#9762;":"\u2622",
                    "&#9763;":"\u2623",
                    "&#9764;":"\u2624",
                    "&#9765;":"\u2625",
                    "&#9766;":"\u2626",
                    "&#9767;":"\u2627",
                    "&#9768;":"\u2628",
                    "&#9769;":"\u2629",
                    "&#9770;":"\u262A",
                    "&#9771;":"\u262B",
                    "&#9772;":"\u262C",
                    "&#9773;":"\u262D",
                    "&#9774;":"\u262E",
                    "&#9775;":"\u262F",
                    "&#9776;":"\u2630",
                    "&#9777;":"\u2631",
                    "&#9778;":"\u2632",
                    "&#9779;":"\u2633",
                    "&#9780;":"\u2634",
                    "&#9781;":"\u2635",
                    "&#9782;":"\u2636",
                    "&#9783;":"\u2637",
                    "&#9784;":"\u2638",
                    "&#9785;":"\u2639",
                    "&#9786;":"\u263A",
                    "&#9787;":"\u263B",
                    "&#9788;":"\u263C",
                    "&#9789;":"\u263D",
                    "&#9790;":"\u263E",
                    "&#9791;":"\u263F",
                    "&#9792;":"\u2640",
                    "&#9793;":"\u2641",
                    "&#9794;":"\u2642",
                    "&#9795;":"\u2643",
                    "&#9796;":"\u2644",
                    "&#9797;":"\u2645",
                    "&#9798;":"\u2646",
                    "&#9799;":"\u2647",
                    "&#9800;":"\u2648",
                    "&#9801;":"\u2649",
                    "&#9802;":"\u264A",
                    "&#9803;":"\u264B",
                    "&#9804;":"\u264C",
                    "&#9805;":"\u264D",
                    "&#9806;":"\u264E",
                    "&#9807;":"\u264F",
                    "&#9808;":"\u2650",
                    "&#9809;":"\u2651",
                    "&#9810;":"\u2652",
                    "&#9811;":"\u2653",
                    "&#9812;":"\u2654",
                    "&#9813;":"\u2655",
                    "&#9814;":"\u2656",
                    "&#9815;":"\u2657",
                    "&#9816;":"\u2658",
                    "&#9817;":"\u2659",
                    "&#9818;":"\u265A",
                    "&#9819;":"\u265B",
                    "&#9820;":"\u265C",
                    "&#9821;":"\u265D",
                    "&#9822;":"\u265E",
                    "&#9823;":"\u265F",
                    "&#9824;":"\u2660",
                    "&spades;":"\u2660",
                    "&#9825;":"\u2661",
                    "&#9826;":"\u2662",
                    "&#9827;":"\u2663",
                    "&clubs;":"\u2663",
                    "&#9828;":"\u2664",
                    "&#9829;":"\u2665",
                    "&hearts;":"\u2665",
                    "&#9830;":"\u2666",
                    "&#diams;":"\u2666",
                    "&#9831;":"\u2667",
                    "&#9832;":"\u2668",
                    "&#9833;":"\u2669",
                    "&#9834;":"\u266A",
                    "&#9835;":"\u266B",
                    "&#9836;":"\u266C",
                    "&#9837;":"\u266D",
                    "&#9838;":"\u266E",
                    "&#9839;":"\u266F",
                    "&#9840;":"\u2670",
                    "&#9841;":"\u2671",
                    "&#9842;":"\u2672",
                    "&#9843;":"\u2673",
                    "&#9844;":"\u2674",
                    "&#9845;":"\u2675",
                    "&#9846;":"\u2676",
                    "&#9847;":"\u2677",
                    "&#9848;":"\u2678",
                    "&#9849;":"\u2679",
                    "&#9850;":"\u267A",
                    "&#9851;":"\u267B",
                    "&#9852;":"\u267C",
                    "&#9853;":"\u267D",
                    "&#9854;":"\u267E",
                    "&#9855;":"\u267F",
                    "&#9856;":"\u2680",
                    "&#9857;":"\u2681",
                    "&#9858;":"\u2682",
                    "&#9859;":"\u2683",
                    "&#9860;":"\u2684",
                    "&#9861;":"\u2685",
                    "&#9862;":"\u2686",
                    "&#9863;":"\u2687",
                    "&#9864;":"\u2688",
                    "&#9865;":"\u2689",
                    "&#9866;":"\u268A",
                    "&#9867;":"\u268B",
                    "&#9868;":"\u268C",
                    "&#9869;":"\u268D",
                    "&#9870;":"\u268E",
                    "&#9871;":"\u268F",
                    "&#9872;":"\u2690",
                    "&#9873;":"\u2691",
                    "&#9874;":"\u2692",
                    "&#9875;":"\u2693",
                    "&#9876;":"\u2694",
                    "&#9877;":"\u2695",
                    "&#9878;":"\u2696",
                    "&#9879;":"\u2697",
                    "&#9880;":"\u2698",
                    "&#9881;":"\u2699",
                    "&#9882;":"\u269A",
                    "&#9883;":"\u269B",
                    "&#9884;":"\u269C",
                    "&#9885;":"\u269D",
                    "&#9886;":"\u269E",
                    "&#9887;":"\u269F",
                    "&#9888;":"\u26A0",
                    "&#9889;":"\u26A1",
                    "&#9890;":"\u26A2",
                    "&#9891;":"\u26A3",
                    "&#9892;":"\u26A4",
                    "&#9893;":"\u26A5",
                    "&#9894;":"\u26A6",
                    "&#9895;":"\u26A7",
                    "&#9896;":"\u26A8",
                    "&#9897;":"\u26A9",
                    "&#9898;":"\u26AA",
                    "&#9899;":"\u26AB",
                    "&#9900;":"\u26AC",
                    "&#9901;":"\u26AD",
                    "&#9902;":"\u26AE",
                    "&#9903;":"\u26AF",
                    "&#9904;":"\u26B0",
                    "&#9905;":"\u26B1",
                    "&#9906;":"\u26B2",
                    "&#9907;":"\u26B3",
                    "&#9908;":"\u26B4",
                    "&#9909;":"\u26B5",
                    "&#9910;":"\u26B6",
                    "&#9911;":"\u26B7",
                    "&#9912;":"\u26B8",
                    "&#9913;":"\u26B9",
                    "&#9914;":"\u26BA",
                    "&#9915;":"\u26BB",
                    "&#9916;":"\u26BC",
                    "&#9917;":"\u26BD",
                    "&#9918;":"\u26BE",
                    "&#9919;":"\u26BF",
                    "&#9920;":"\u26C0",
                    "&#9921;":"\u26C1",
                    "&#9922;":"\u26C2",
                    "&#9923;":"\u26C3",
                    "&#9924;":"\u26C4",
                    "&#9925;":"\u26C5",
                    "&#9926;":"\u26C6",
                    "&#9927;":"\u26C7",
                    "&#9928;":"\u26C8",
                    "&#9929;":"\u26C9",
                    "&#9930;":"\u26CA",
                    "&#9931;":"\u26CB",
                    "&#9932;":"\u26CC",
                    "&#9933;":"\u26CD",
                    "&#9934;":"\u26CE",
                    "&#9935;":"\u26CF",
                    "&#9936;":"\u26D0",
                    "&#9937;":"\u26D1",
                    "&#9938;":"\u26D2",
                    "&#9939;":"\u26D3",
                    "&#9940;":"\u26D4",
                    "&#9941;":"\u26D5",
                    "&#9942;":"\u26D6",
                    "&#9943;":"\u26D7",
                    "&#9944;":"\u26D8",
                    "&#9945;":"\u26D9",
                    "&#9946;":"\u26DA",
                    "&#9947;":"\u26DB",
                    "&#9948;":"\u26DC",
                    "&#9949;":"\u26DD",
                    "&#9950;":"\u26DE",
                    "&#9951;":"\u26DF",
                    "&#9952;":"\u26E0",
                    "&#9953;":"\u26E1",
                    "&#9954;":"\u26E2",
                    "&#9955;":"\u26E3",
                    "&#9956;":"\u26E4",
                    "&#9957;":"\u26E5",
                    "&#9958;":"\u26E6",
                    "&#9959;":"\u26E7",
                    "&#9960;":"\u26E8",
                    "&#9961;":"\u26E9",
                    "&#9962;":"\u26EA",
                    "&#9963;":"\u26EB",
                    "&#9964;":"\u26EC",
                    "&#9965;":"\u26ED",
                    "&#9966;":"\u26EE",
                    "&#9967;":"\u26EF",
                    "&#9968;":"\u26F0",
                    "&#9969;":"\u26F1",
                    "&#9970;":"\u26F2",
                    "&#9971;":"\u26F3",
                    "&#9972;":"\u26F4",
                    "&#9973;":"\u26F5",
                    "&#9974;":"\u26F6",
                    "&#9975;":"\u26F7",
                    "&#9976;":"\u26F8",
                    "&#9977;":"\u26F9",
                    "&#9978;":"\u26FA",
                    "&#9979;":"\u26FB",
                    "&#9980;":"\u26FC",
                    "&#9981;":"\u26FD",
                    "&#9982;":"\u26FE",
                    "&#9983;":"\u26FF",
                    
                    // CURRENCY
                    "&#8352;":"\u20A0",
                    "&#8353;":"\u20A1",
                    "&#8354;":"\u20A2",
                    "&#8355;":"\u20A3",
                    "&#8356;":"\u20A4",
                    "&#8357;":"\u20A5",
                    "&#8358;":"\u20A6",
                    "&#8359;":"\u20A7",
                    "&#8360;":"\u20A8",
                    "&#8361;":"\u20A9",
                    "&#8362;":"\u20AA",
                    "&#8363;":"\u20AB",
                    "&#8364;":"\u20AC",
                    "&euro;":"\u20AC",
                    "&#8365;":"\u20AD",
                    "&#8366;":"\u20AE",
                    "&#8367;":"\u20AF",
                    "&#8368;":"\u20B0",
                    "&#8369;":"\u20B1",
                    "&#8370;":"\u20B2",
                    "&#8371;":"\u20B3",
                    "&#8372;":"\u20B4",
                    "&#8373;":"\u20B5",
                    "&#8374;":"\u20B6",
                    "&#8375;":"\u20B7",
                    "&#8376;":"\u20B8",
                    "&#8377;":"\u20B9",
                }
                if(status[v]){
                    result = status[v]
                }
                return result
            })
    }
    return ret
}
function newline(o) {
    var ret
    if('innerText' in o) {
        ret = '\n'
    } else {
        ret = '<br>'
    }
    return ret
}
function _rows(obj) {
    var de = obj.de
    var te = obj.te
    var __rows__ = obj.vrows
    this.rows = []
    this.fontsize = 9
    this.lastResizeNum
    this.resize = function(startIDX, ht) {
        this.rows = []
        startIDX = startIDX || 0
        ht = Math.max(ht || 0, te.clientHeight, te.scrollHeight)
        if (ht != this.lastResizeNum || !this.lastResizeNum) {
            var B = parseInt((ht / this.fontsize) * 0.62)
            /* 12pt:0.80; 13pt:0.75; 9pt:0.65; 10pt:0.62 */
            for (var b = startIDX; b < B; b++) {
                this.rows.push(b + 1)
            }
            setText(__rows__,this.rows.join(newline(__rows__)))
            this.lastResizeNum = ht
        }
    }
    this.resize()
}
_rows.prototype = {} 
function _editor(obj) {
    var de = obj.de
    var te = obj.te
    var __rows__ = obj.vrows
    this.toTEXTBUFFER
    this.getLines = function() {
        return getText(te).split(/\n/gm)
    }
    this.setLine = function(i,w) {
        var status = 'default-replace-all'
        var ret = getText(te).split(/\n/gm)
        if (i in ret) {
            status = true
            ret[i] = w
            setText(te,ret.join(newline(__rows__)))
            this.highlight_keywords(getText(te), de)
        } else {
            if(!w) {
                w = i
            }
            setText(te,w)
            this.highlight_keywords(getText(te), de)
        }
        return status
    }
    this.setMODE = function() {
    
    }
    this.setTHEME = function() {
    
    }
    this.highlight_keywords = function() {
        var txt = getText(te)
        if (this.toTEXTBUFFER != txt) {
            this.toTEXTBUFFER = txt
            var s = txt
            .replace(/\n/gm, '%#%NnN%#%')
            .replace(/\s/gm, ' SsS ')
            .replace(/([\W]+)/gm, ' $1 ')
            .replace(/('|"|`)/gm, ' $1 ')
            .replace(/(%#%)+/gm, ' ')
            .split(/\s+/)
            var _s = s
            /* var keywordMapper = */// external declaration //
            var fe = {
                token: "",
                hasFE: null ,
            }
            var toHTML = s.map(function(w, i, me) {
                fe.token = w
                if (keywordMapper.hasOwnProperty(w)) {
                    fe = keywordMapper[w](fe)
                } else 
                if (w.match(keywordMapper["numeric"]) && !(fe.hasFE)) {
                    fe.token = "<ace_numeric>" + w + "</ace_numeric>"
                }
                return fe.token
            }
            )
            de.innerHTML = toHTML.join('')
        }
    }
}
_editor.prototype = {} 
function __BLACK_SPADE_EDITOR__ () {
    this.fromTextArea = function(_id_) {
        var id = null
        var vrows = "__rows__"+instanceHANDLE
        var texteditor = "te"+instanceHANDLE
        var diveditor = "de"+instanceHANDLE
        var ihandle = instanceHANDLE++
        var obj = document.getElementById(_id_)
        if(obj) {
            obj.outerHTML = 
                "<div class=code-container id=__container__"+ihandle+">\n" +
                "<div class=v-rows id=__rows__"+ihandle+"></div>\n" +
                "<div class=code-editor id=__editor__"+ihandle+">\n" +
                "<div class=code-window id=te"+ihandle+" spellcheck='false' autocapitalize='off' autocorrect='off' contenteditable='true' style='\n" +
                "   -webkit-text-fill-color:rgba(0,0,0,0);\n" + 
                "    color:rgba(0,0,0,0.2);\n" +
                "    background:rgba(0,0,0,0); z-index:1;\n" +
                "    border:1px solid gray;'></div>\n" +
                "<div class=code-window id=de"+ihandle+" spellcheck='false' autocapitalize='off' autocorrect='off'></div>\n" +
                "</div>\n" +
                "</div>"
            obj.te = document.getElementById(texteditor)
            obj.de = document.getElementById(diveditor)
            obj.vrows = document.getElementById(vrows)
            obj.editor = new _editor(obj)
            obj.editor_rows = new _rows(obj)
            obj.te.addEventListener('keyup', function(e) {
                if (id>-1) {
                    delete id
                    obj.editor.highlight_keywords()
                }
            }
            , false)
            obj.te.addEventListener('keydown', function(e) {
                if (!voidkeycode[e.keycode] && !voidkeycode[e.keyCode]) {
                    id = ihandle
                }
                obj.de.scrollTop = obj.te.scrollTop
                obj.de.scrollLeft = obj.te.scrollLeft
                obj.editor_rows.resize()
            }
            , false)
            obj.te.addEventListener('scroll', function(e) {
                obj.de.scrollTop = e.target.scrollTop
                obj.de.scrollLeft = e.target.scrollLeft
                obj.vrows.scrollTop = obj.te.scrollTop
                obj.vrows.scrollLeft = obj.te.scrollLeft
            }
            , false)
            return obj.editor
        } else {
            console.log("*** Warning *** -- failed to create black spade editor " + _id_)
            return _id_
        }
        return obj
    }
}
__BLACK_SPADE_EDITOR__.prototype = {}
BLACK_SPADE_EDITOR = new __BLACK_SPADE_EDITOR__ ()

