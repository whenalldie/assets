jQuery((function(t) {
	t("#LK21_PLAYLIST").select2({
		ajax: {
			url: d21.ajaxUrl,
			dataType: "json",
			delay: 250,
			data: function(t) {
				return {
					data: t.term,
					action: "getpostdata"
				}
			},
			processResults: function(e) {
				var n = [];
				return e && t.each(e, (function(t, e) {
					n.push({
						id: e[0],
						text: e[1]
					})
				})), {
					results: n
				}
			},
			cache: !0
		},
		minimumInputLength: 3,
		minimumSelectionLength: 5
	})
}));
