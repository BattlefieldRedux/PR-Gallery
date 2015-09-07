function addMarker(e){
	// Add marker to map at click location; add popup window
	var marker = new L.marker(e.latlng, {draggable:true});
	marker.setIcon(ArmaIcon);
	marker.on('click', function(event){
		var marker = event.target;
		var position = marker.getLatLng();
		  $(this).hide();
		  //alert("Test");
		 //<div class="form"><input class="form" type="text" value="" name="myinput" id="myinput"/></div>;
		  $('.aicon .form').show();
		
	});
	marker.addTo(markerlayer);
}

function intpad(num, size) {
	var s = num+"";
		while (s.length < size) s = "0" + s;
		return s;
}

function resetRotation(){
	
	$('.rotated').each(function () {
		var deg = $(this).data('rotate') || 0;
		var rotate = 'rotate(' + $(this).data('rotate') + 'deg)';
		$(this).css({
			'-webkit-transform': rotate,
			'-moz-transform': rotate,
			'-o-transform': rotate,
			'-ms-transform': rotate,
			'transform': rotate
		});
	});
}


$(window).ready(function (e) {
	map.on('baselayerchange', function(we){
		$('#SubTitle').html(we.name);
	});
	
	
	map.on('mousemove', function(e) {
		var ew = window.event;
		var x = ew.clientX;
		var y = ew.clientY;
		//alert(x + " " + y);
		var point = map.project(e.latlng,2);
		if (point.x < 0 || point.y < 0 || point.x > mapwidth/4 || point.y > mapheight/4){
			window[e.type].innerHTML = "";
		}else {
			var colno = Math.ceil(point.x/ (mapwidth/4 / 41));  //41 because 41 columns in PR grid
			var rowno = Math.ceil(point.y/ (mapheight/4 / 41));
				var str_coord = "";
				switch (colno) {
					case 1:
						str_coord = "Z";
						break;
					case 2:
					case 3:
					case 4:
						str_coord = "A";
						break;
					case 5:
					case 6:
					case 7:
						str_coord = "B";
						break;
					case 8:
					case 9:
					case 10:
						str_coord = "C";
						break;
					case 11:
					case 12:
					case 13:
						str_coord = "D";
						break;
					case 14:
					case 15:
					case 16:
						str_coord = "E";
						break;
					case 17:
					case 18:
					case 19:
						str_coord = "F";
						break;
					case 20:
					case 21:
					case 22:
						str_coord = "G";
						break;
					case 23:
					case 24:
					case 25:
						str_coord = "H";
						break;
					case 26:
					case 27:
					case 28:
						str_coord = "I";
						break;
					case 29:
					case 30:
					case 31:
						str_coord = "J";
						break;
					case 32:
					case 33:
					case 34:
						str_coord = "K";
						break;
					case 35:
					case 36:
					case 37:
						str_coord = "L";
						break;
					case 38:
					case 39:
					case 40:
						str_coord = "M";
						break;
					case 41:
						str_coord = "N";
						break;
					default:
						str_coord = "";
				};
				str_coord += intpad(Math.floor((rowno + 1) / 3),2);
				
				if ((colno+1 ) % 3 == 0 && (rowno+1 )  % 3 == 2) {
					str_coord += "kp1";
				} else if ((colno+1 ) % 3 == 1 && (rowno+1 )  % 3 == 2) {
					str_coord += "kp2";
				} else if ((colno+1 ) % 3 == 2 && (rowno+1 )  % 3 == 2) {
					str_coord += "kp3";
				} else if ((colno+1 ) % 3 == 0 && (rowno+1 )  % 3 == 1) {
					str_coord += "kp4";
				} else if ((colno+1 ) % 3 == 1 && (rowno+1 )  % 3 == 1) {
					str_coord += "kp5";
				} else if ((colno+1 ) % 3 == 2 && (rowno+1 )  % 3 == 1) {
					str_coord += "kp6";
				}  else if ((colno+1 ) % 3 == 0  && (rowno+1 )  % 3 == 0) {
					str_coord += "kp7";
				} else if ((colno+1 ) % 3 == 1 && (rowno+1 )  % 3 == 0) {
					str_coord += "kp8";
				} else if ((colno+1 ) % 3 == 2 && (rowno+1 )  % 3 == 0) {
					str_coord += "kp9";
				}
				
				window[e.type].innerHTML = str_coord;
			}
		document.getElementById('output').style.top = (y - 20) + 'px' ;
		document.getElementById('output').style.left = ( x + 20 ) + 'px';
	});
});