! function(e) {
	e((function() {
		e(document).on("submit", "#d21_login_user", (function() {
			var t = e("#d21_login_btn").data("btntext");
			return e(".login_box").removeClass("shake"), e("#d21_login_btn").prop("disabled", !0), e("#d21_login_btn").val(d21.loading), e("#jsonresponse").html(""), e.ajax({
				type: "POST",
				url: d21.ajaxUrl,
				dataType: "json",
				cache: !1,
				data: e(this).serialize(),
				success: function(s) {
					1 == s.response ? (e("#jsonresponse").html('<p class="success">' + s.message + "</p>"), setTimeout((function() {
						window.location.replace(s.redirect)
					}), 1500)) : (e("#jsonresponse").html('<p class="error">' + s.message + "</p>"), setTimeout((function() {
						e("#jsonresponse").html(""), e("#d21_login_btn").val(t), e("#d21_login_btn").prop("disabled", !1)
					}), 3e3))
				}
			}), !1
		})), e(document).on("click", "#d21_signout", (function() {
			return e.ajax({
				type: "POST",
				url: d21.ajaxUrl,
				dataType: "json",
				data: {
					action: "d21_logout"
				},
				beforeSend: function() {
					return confirm(d21.confirmLogout)
				},
				success: function(e) {
					1 == e.response && location.reload()
				}
			}), !1
		})), e(document).on("submit", "#d21_sign_up", (function() {
			return e("#username").val(), password = e("#password").val(), btntexto = e("#d21_signup_btn").data("btntext"), e("#d21_signup_btn").prop("disabled", !0), e("#d21_signup_btn").val(d21.loading), e(".form_dt_user").removeClass("shake"), e("#jsonresponse").html(""), e.ajax({
				type: "POST",
				url: d21.ajaxUrl,
				dataType: "json",
				cache: !1,
				data: e(this).serialize(),
				success: function(t) {
					e("#d21_sign_up input").prop("disabled", !0), 1 == t.response ? (e("#jsonresponse").html('<p class="success">' + t.message + "</p>"), e("#d21_signup_btn").val(d21.wait), setTimeout((function() {
						window.location.replace(t.redirect)
					}), 1500)) : (e("#jsonresponse").html('<p class="error">' + t.message + "</p>"), e(".form_dt_user").addClass("shake"), e("#d21_sign_up input").prop("disabled", !1), e("#d21_signup_btn").val(btntexto))
				}
			}), !1
		})), e(document).on("submit", "#tambah_playlist", (function(t) {
			t.preventDefault();
			var s = e("#btn_playlist").data("btntext"),
				n = e("#title_playlist").val(),
				a = e("#LK21_PLAYLIST").val();
			e("#btn_playlist").prop("disabled", !0), e("#btn_playlist").text("Loading..."), e("#jsonresponse").html(""), e.ajax({
				type: "POST",
				url: d21.ajaxUrl,
				dataType: "json",
				cache: !1,
				data: {
					action: "add_playlist",
					title: n,
					playlist: a,
					nonce: d21.nonce
				},
				success: function(t) {
					1 == t.response ? (e("#jsonresponse").html('<p class="success">' + t.message + "</p>"), e("#title_playlist").val(""), e("#LK21_PLAYLIST").val(""), setTimeout((function() {
						window.location.replace(t.redirect)
					}), 1500)) : (e("#jsonresponse").html('<p class="error">' + t.message + "</p>"), setTimeout((function() {
						e("#jsonresponse").html(""), e("#btn_playlist").text(s), e("#btn_playlist").prop("disabled", !1)
					}), 2e3))
				}
			})
		})), e(document).on("submit", "#delete_playlist", (function(t) {
			t.preventDefault();
			var s = e("#btn_delete_playlist").data("btntext"),
				n = (e(this).serialize(), e("#title").val()),
				a = e("#id").val();
			e("#btn_delete_playlist").prop("disabled", !0), e("#btn_delete_playlist").html("Loading..."), e("#jsonresponse").html(""), e.ajax({
				type: "POST",
				url: d21.ajaxUrl,
				cache: !1,
				dataType: "json",
				data: {
					action: "delete_playlist",
					title: n,
					id: a
				},
				success: function(t) {
					1 == t.response ? (e("#jsonresponse").html('<p class="success">' + t.message + "</p>"), setTimeout((function() {
						e("#jsonresponse").html(""), e("#btn_delete_playlist").html(s), e("#btn_delete_playlist").prop("disabled", !1)
					}), 1500)) : (e("#jsonresponse").html('<p class="error">' + t.message + "</p>"), setTimeout((function() {
						e("#jsonresponse").html(""), e("#btn_delete_playlist").html(s), e("#btn_delete_playlist").prop("disabled", !1)
					}), 1500))
				}
			})
		}))
	}))
}(jQuery);
