//@formatter:off Telling Aptana to not mess up this array
var DICTIONARY_SMALL = [
	["gpm_insurgency", "Ins."],
    ["gpm_skirmish", "Skir."],
    ["gpm_cq", "AAS"],
    ["16", "Inf."],
    ["32", "Alt."],
    ["64", "Std."],
    ["128", "Lrg."]
];

var DICTIONARY_LARGE = [
	["gpm_insurgency", "Insurgency"],
    ["gpm_skirmish", "Skirmish"],
    ["gpm_cq", "AAS"],
    ["gpm_cnc", "Cnc"],
    ["gpm_coop", "Co-Op"],
    ["gpm_vehicles", "Vehi. Warfare"],
    
    ["16", "Infantry"],
    ["32", "Alternative"],
    ["64", "Standard"],
    ["128", "Large"],
    
    ["cf", "Canadian Forces"],
    ["ch", "Chinese Forces"],
    ["chinsurgent", "Militia"],
    ["fr", "French Forces"],
    ["gb", "British Armed Forces"],
    ["ger", "German Forces"],
    ["hamas", "Hamas"],
    ["idf", "Israeli Defence Forces"],
    ["mec", "Middle East Coalition"],
    ["meinsurgent", "Iraqi Insurgents"],
    ["ru", "Russian Armed Forces"],
    ["taliban", "Taliban"],
    ["us", "United States Marine Corps"],
    ["usa", "United States Army"],
    ["ww2ger", "Wehrmacht"],
    ["ww2usa", "United States Army"],
    ["vnnva", "North Vietnamese Army"],
    ["vnusa", "Unite dStates Army"],
    ["vnusmc", "United States Marine Corps"],
    ["vnvc", "Viet Cong"],
    ["arg82", "Argentine Armed Forces"],
    ["gb82", "British Armed Forces"],
    ["arf", "African Resistance Fighters"],
    ["fsa", "Syrian Rebels"]
    
];
//@formatter:on

function dictionary(word) {
	word += "";
	//Make sure is a string
	for (var key in DICTIONARY_LARGE) {
		if (DICTIONARY_LARGE[key][0].toLowerCase() == word.toLowerCase())
			return DICTIONARY_LARGE[key][1];
	}

	return word;
}

function dict_partial(word) {
	word += "";
	//Make sure is a string
	for (var key in DICTIONARY_LARGE) {
		if (DICTIONARY_LARGE[key][0].toLowerCase().search(word.toLowerCase()))
			return DICTIONARY_LARGE[key][1];
	}

	return word;
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function getFlagURL(str) {
	str = str.toLowerCase();
	if (str.search("arf") != -1)
		return "icons/ui/flags/arf.png";
	else if (str.search("cf") != -1)
		return "icons/ui/flags/cf.png";
	else if (str.search("chinsurgent") != -1)
		return "icons/ui/flags/chinsurgent.png";
	else if (str.search("ch") != -1)
		return "icons/ui/flags/ch.png";
	else if (str.search("fr") != -1)
		return "icons/ui/flags/fr.png";
	else if (str.search("fsa") != -1)
		return "icons/ui/flags/fsa.png";
	else if (str.search("gb") != -1)
		return "icons/ui/flags/gb.png";
	else if (str.search("ger") != -1)
		return "icons/ui/flags/ger.png";
	else if (str.search("hamas") != -1)
		return "icons/ui/flags/hamas.png";
	else if (str.search("idf") != -1)
		return "icons/ui/flags/idf.png";
	else if (str.search("mec") != -1)
		return "icons/ui/flags/mec.png";
	else if (str.search("meinsurgent") != -1)
		return "icons/ui/flags/meinsurgent.png";
	else if (str.search("nl") != -1)
		return "icons/ui/flags/nl.png";
	else if (str.search("ru") != -1)
		return "icons/ui/flags/ru.png";
	else if (str.search("taliban") != -1)
		return "icons/ui/flags/taliban.png";
	else if (str.search("usa") != -1 || str.search("us") != -1 || str.search("vnusa") != -1 || str.search("vnusmc") != -1)
		return "icons/ui/flags/usa.png";
	else if (str.search("vnnva") != -1)
		return "icons/ui/flags/vnnva.png";
	else
		return "icons/ui/flags/neutral.png";

}

/*
 * GetJSON(url, calback)
 * - Assumes its a url to a JSON file
 * - Calls a callback with the JSON as parameter
 * */
function getJSON(url, calback) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		//console.log(xmlhttp.readyState);
		//console.log(xmlhttp.status);
		//console.log(">"+xmlhttp.responseText.length);
		if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 304)) {
			//console.log(">"+xmlhttp.responseText);
			var json = JSON.parse(xmlhttp.responseText);
			calback(json);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function AJAX(src, calback) {

	$.ajax({
		dataType : "html",
		url : src,
		success : function(data) {
			calback(data);
		}
	});
}

/* ======================================================================================
 * ============================           LEFT MENU      =================================
 * ======================================================================================
 */
$(window).ready(function() {
	$('#Menu-button').click(function() {

		if ($('#Menu-button').hasClass('open')) {
			$("#Nav").removeClass("open-menu");
			$("#Menu-button").removeClass("open");

		} else {
			$("#Nav").addClass("open-menu");
			$("#Menu-button").addClass("open");

		}
	});
	$("#Nav-Overlay").click(function() {
		$("#Body-Wrapper").removeClass("open-menu");
		$("#Menu-button").removeClass("open");
	});
});

/* ======================================================================================
 * ============================           RIGHT MENU      =================================
 * ======================================================================================
 */
$(window).ready(function() {
	$("#Search>input").focus();

	$('#Assets-button').click(function() {
		if ($('#RightPane').hasClass('open')) {
			$("#RightPane").removeClass("open");
			$('#Assets-button').removeClass('open');

		} else {
			$("#RightPane").addClass("open");
			$('#Assets-button').addClass('open');
		}
	});

	$('#RPane-team1-button').click(function() {
		if ($('#RPane-team1-button').hasClass('active')) {
			$("#RPane-team1-button").removeClass("active");
			$(".asset-row.team2").removeClass("hide");

		} else {
			$("#RPane-team2-button").removeClass("active");
			$("#RPane-team1-button").addClass("active");
			$(".asset-row.team2").addClass("hide");
			$(".asset-row.team1").removeClass("hide");
		}
	});
	$('#RPane-team2-button').click(function() {
		if ($('#RPane-team2-button').hasClass('active')) {
			$("#RPane-team2-button").removeClass("active");
			$(".asset-row.team1").removeClass("hide");
		} else {
			$("#RPane-team1-button").removeClass("active");
			$("#RPane-team2-button").addClass("active");
			$(".asset-row.team1").addClass("hide");
			$(".asset-row.team2").removeClass("hide");
		}
	});
});

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "14px verdana").
 *
 * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
	// if given, use cached canvas for better performance
	// else, create new canvas
	var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
	var context = canvas.getContext("2d");
	context.font = font;
	var metrics = context.measureText(text);
	return metrics.width;
};

/**
 * Handles arguments
 *
 * @param {String} map Immediately load a specific map
 * @param {String} gm Immediately load a specific gamemode (only use this when map is set)
 * @param [{int}] route Select a specific set of routes
 */
function parseArgs() {
	var args = (function(a) {
		if (a == "")
			return {};
		var b = {};
		for (var i = 0; i < a.length; ++i) {
			var p = a[i].split('=', 2);
			if (p.length == 1)
				b[p[0]] = "";
			else
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&'));

	var var_route = [];
	if (args["map"] != undefined) {
		loadMap(args["map"].toLowerCase(), false);
	}
	if (args["gm"] != undefined) {
		var gm_name = args["gm"].split("_")[0];
		var gm_size = args["gm"].split("_")[1];
		var modename = "";
		if (gm_name.search("ins") != -1) {
			modename = "Insurgency";
		}
		if (gm_name.search("coop") != -1) {
			modename = "Coop";
		}
		if (gm_name.search("conq") != -1 || gm_name.search("cq") != -1 || gm_name.search("aas") != -1) {
			modename = "Assault and Secure";
		}
		if (gm_name.search("veh") != -1 || gm_name.search("wf") != -1) {
			modename = "Vehicle Warfare";
		}
		if (gm_name.search("com") != -1 || gm_name.search("cnc") != -1) {
			modename = "Command and Control";
		}
		if (gm_name.search("ski") != -1) {
			modename = "Skirmish";
		}
		if (gm_size.search("inf") != -1 || gm_size.search("16") != -1) {
			modename += " Infantry";
		}
		if (gm_size.search("alt") != -1 || gm_size.search("32") != -1) {
			modename += " Alternative";
		}
		if (gm_size.search("std") != -1 || gm_size.search("64") != -1) {
			modename += " Standard";
		}
		if (gm_size.search("lrg") != -1 || gm_size.search("128") != -1) {
			modename += " Large";
		}
		$('.gmselection:contains("' + modename + '")').trigger("click");

	}
	if (args["route"] != undefined) {
		var_route = JSON.parse(args["route"]);
		console.log(var_route);
		for ( x = 0; x < var_route.length; x++) {

			$('#AAS-button-list .AASselection:contains("' + var_route[x] + '")').trigger("click");
			console.log(var_route[x]);
		}
	}

};