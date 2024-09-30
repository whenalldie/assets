jQuery.extend(jQuery.fn, {
	validate: function() {
		return jQuery(this).val().length < 3 ? (jQuery(this).addClass("error"), !1) : (jQuery(this).removeClass("error"), !0)
	},
	validateEmail: function() {
		var e = jQuery(this).val();
		return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e) && "" != e ? (jQuery(this).removeClass("error"), !0) : (jQuery(this).addClass("error"), !1)
	}
}), jQuery((function(e) {
	e("#commentform").submit((function() {
		var r = e("#submit"),
			a = e("#respond"),
			t = e(".commentlist"),
			l = e("#cancel-comment-reply-link");
		return e("#author").length && e("#author").validate(), e("#email").length && e("#email").validateEmail(), e("#comment").validate(), r.hasClass("loadingform") || e("#author").hasClass("error") || e("#email").hasClass("error") || e("#comment").hasClass("error") || e.ajax({
			type: "POST",
			url: d21.ajaxUrl,
			data: e(this).serialize() + "&action=ajaxcomments",
			beforeSend: function(e) {
				r.addClass("loadingform").val("Loading...")
			},
			error: function(e, r, a) {
				if (500 == r) alert("Error while adding comment");
				else if ("timeout" == r) alert("Error: Server doesn't respond.");
				else {
					var t = e.responseText.split("<p>")[1].split("</p>");
					alert(t[0])
				}
			},
			success: function(r) {
				t.length > 0 ? a.parent().hasClass("comment") ? (a.parent().children(".children").length ? a.parent().children(".children").append(r) : (r = '<ol class="children">' + r + "</ol>", a.parent().append(r)), l.trigger("click")) : t.append(r) : (r = '<ol class="commentlist">' + r + "</ol>", a.before(e(r))), e("#comment").val("")
			},
			complete: function() {
				r.removeClass("loadingform").val("Post Comment")
			}
		}), !1
	}))
}));
