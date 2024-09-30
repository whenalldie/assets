var currentPagePopuler = 1;
jQuery(function(e) {
	e("#popular-more").click(function() {
	    currentPagePopuler++;
	    
	    $("#popular-reset").click(function() {
		    $('html, body').animate({scrollTop:$('#populer').position().top}, 'slow');
	        currentPagePopuler = 1;
	        $(".popular-item .item:nth-child(6)").nextAll().remove();
	        $("#popular-more").show();
	        $("#popular-reset").hide();
	        $(".popular-all").hide();
	        $("#popular-more").text('Tampilkan Lainnya');
	    });
		var t = e(this);
		e.ajax({
			url: d21.ajaxUrl,
			dataType: 'json',
			data: {
                action: 'popular_load_more',
                paged: currentPagePopuler,
            },
			type: "POST",
			beforeSend: function(e) {
				t.text('Loading...');
			},
			success: function(e) {
			    if(currentPagePopuler > e.maxPopuler || currentPagePopuler > 4) {
                    $('#popular-more').hide();
                    $(".popular-all").show();
			        return false;
                }
				$("html, body").animate({
					scrollTop: t.offset().top - 10
				}, 1500), e.htmlPopuler && t.text('Tampilkan Lainnya').prev().before(e.htmlPopuler) && $('.popular-item').append(e.htmlPopuler),
				currentPagePopuler > 4 && $("#popular-more").hide();
				if(currentPagePopuler > 1) {
				    $("#popular-reset").show();
				} else {
				    $("#popular-reset").hide();
				}
				if(currentPagePopuler > 4) {
				    $(".popular-all").show();
				} else {
				    $(".popular-all").hide();
				}
			}
		});
	});
});
