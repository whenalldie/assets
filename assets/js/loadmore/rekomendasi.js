var currentPageRekomendasi = 1;
jQuery(function(e) {
	e("#rekomendasi-more").click(function() {
	    currentPageRekomendasi++;
	    
	    $("#rekomendasi-reset").click(function() {
		    $('html, body').animate({scrollTop:$('#recomendation').position().top}, 'slow');
	        currentPageRekomendasi = 1;
	        $(".rekomendasi-item .item:nth-child(6)").nextAll().remove();
	        $("#rekomendasi-more").show();
	        $("#rekomendasi-reset").hide();
	        $(".rekomendasi-all").hide();
	        $("#rekomendasi-more").text('Tampilkan Lainnya');
	    });
		var t = e(this);
		e.ajax({
			url: ADMINURL.ajax_url,
			dataType: 'json',
			data: {
                action: 'rekomendasi_load_more',
                paged: currentPageRekomendasi,
            },
			type: "POST",
			beforeSend: function(e) {
				t.text('Loading...');
			},
			success: function(e) {
			    if(currentPageRekomendasi > e.maxRekomendasi || currentPageRekomendasi > 4) {
                    $('#rekomendasi-more').hide();
                    $(".rekomendasi-all").show();
                    return false;
                }
				$("html, body").animate({
					scrollTop: t.offset().top - 10
				}, 1500), e.htmlRekomendasi && t.text('Tampilkan Lainnya').prev().before(e.htmlRekomendasi) && $('.rekomendasi-item').append(e.htmlRekomendasi),
				currentPageRekomendasi > 4 && $("#rekomendasi-more").hide();
				if(currentPageRekomendasi > 1) {
				    $("#rekomendasi-reset").show();
				} else {
				    $("#rekomendasi-reset").hide();
				}
				if(currentPageRekomendasi > 4) {
				    $(".rekomendasi-all").show();
				} else {
				    $(".rekomendasi-all").hide();
				}
			}
		});
	});
});
