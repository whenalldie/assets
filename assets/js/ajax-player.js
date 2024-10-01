function dunia21_loadTabContent(tab_name, post_id) {
	var container = document.getElementById("dunia21_player_content_id");
	if (document.getElementById("loadMsg"), container) {
		var tabc = container.querySelector("#" + tab_name);
		if( tabc ) {
			var isLoaded = tabc.getAttribute( 'data-loaded' );
			if ( ! isLoaded ) {
				if ( ! container.classList.contains( 'dunia21-player-loading' ) ) {
				    document.getElementById("loadMsg").style.display = 'block';
					document.getElementById("loadMsg").innerHTML = '<img src="'+d21.themeDir+'/template-parts/single/ajax-loader-bar-red.gif"><p>Loading player... Please wait!</p>';
					var xhttp = new XMLHttpRequest();

					xhttp.onreadystatechange = function() {
						if ( this.readyState == 4 && this.status == 200 ) {
							tabc.innerHTML = this.responseText;
							container.classList.remove( 'dunia21-player-loading' );
							tabc.setAttribute( 'data-loaded', '1' );
						}
					};
					
					xhttp.open( 'POST', d21.ajaxUrl, true );
					xhttp.setRequestHeader( "Content-type", "application/x-www-form-urlencoded; charset=UTF-8" );
					xhttp.send( 'action=dunia21_player_content&tab=' + tab_name + '&post_id=' + post_id );
				}
			}
		}
	}
}
document.addEventListener("DOMContentLoaded", function() {
	var elemt = document.getElementById("dunia21_player_content_id");
	if (elemt) {
		var post_id = elemt.getAttribute("data-id");
		var btn = elemt.querySelectorAll("ul.dropdown-player > li");
		var link = elemt.querySelectorAll( 'ul.dropdown-player > li a' );
		
		function clicktab(e) {
			if( btn ) {
				for( var i = 0; i<btn.length; i++ ){
					btn[i].classList.remove("selected","noclick");
				}
			}
			if( link ) {
				for( var alink = 0; alink<link.length; alink++ ){
				    var textLink = link[alink].innerHTML.split("</i>");
					link[alink].classList.remove("active");
			        link[alink].innerHTML = '<i class="fa fa-server"></i>' + textLink[1];
				}
			}
			var clickedTab = e.currentTarget;
			clickedTab.classList.add("selected","noclick");
			var textLinks = e.target.innerHTML.split("</i>");
		    e.target.classList.add('active');
		    document.getElementById("sources-togle").innerHTML = textLinks[1];
		    e.target.innerHTML = '<i class="fa fa-play"></i>' + textLinks[1];
			e.preventDefault();
			
			var tabContent = document.querySelectorAll(".tab-content-ajax");
			for (i = 0; i < tabContent.length; i++) {
			    if(tabContent[i].classList.contains("selected") || tabContent[i].removeAttribute("data-loaded")) {
			        tabContent[i].innerHTML = "";
			        tabContent[i].classList.remove("selected");
			    }
			}
			
			var anchorReference = e.target;
			var activePaneId = anchorReference.getAttribute( "href" );
			var activePane = document.querySelector( activePaneId );
			activePane.classList.add("selected");
			var tab_name = activePaneId.replace('#','');
			dunia21_loadTabContent( tab_name, post_id );
		}
		for (i = 0; i < btn.length; i++) {
			btn[i].addEventListener("click", clicktab);
		}
		var firstbtn = document.querySelector( '#player1' );
		var secondbtn = document.querySelector( '#player2' );
		var thirdbtn = document.querySelector( '#player3' );
		var fourthbtn = document.querySelector( '#player16' );
		if(firstbtn === null || firstbtn === undefined) {
		    if(secondbtn) {
		    secondbtn.click();
		    var secondtext = secondbtn.innerHTML.split("</i>");
    		document.getElementById("sources-togle").innerHTML = secondtext[1];
    		secondbtn.classList.add("active");
    		secondbtn.innerHTML = '<i class="fa fa-play"></i>' + secondtext[1];
    		}else{
    		    if(thirdbtn) {
        		    thirdbtn.click();
        		    var thirdtext = thirdbtn.innerHTML.split("</i>");
            		document.getElementById("sources-togle").innerHTML = thirdtext[1];
            		thirdbtn.classList.add("active");
            		thirdbtn.innerHTML = '<i class="fa fa-play"></i>' + thirdtext[1];
    		    }else{
    		        if(fourthbtn) {
            		    fourthbtn.click();
            		    var fourthtext = fourthbtn.innerHTML.split("</i>");
                		document.getElementById("sources-togle").innerHTML = fourthtext[1];
                		fourthbtn.classList.add("active");
                		fourthbtn.innerHTML = '<i class="fa fa-play"></i>' + fourthtext[1];
        		    }
    		    }
    		}
		}
		firstbtn.click();
		var text = firstbtn.innerHTML.split("</i>");
		document.getElementById("sources-togle").innerHTML = text[1];
		firstbtn.classList.add("active");
		firstbtn.innerHTML = '<i class="fa fa-play"></i>' + text[1];
	}
});
