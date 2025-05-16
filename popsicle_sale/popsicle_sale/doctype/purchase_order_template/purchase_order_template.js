// Copyright (c) 2025, Xiaoming Wang and contributors
// For license information, please see license.txt

frappe.ui.form.on("Purchase Order Template", {
	refresh(frm) {
		frm.page.add_action_item(__('Create Purchase Order'), function() {
			frappe.call({
				method: "create_purchase_order",
				doc: frm.doc,
				callback: function(r) {
					if(!r.exc) {
						var doc = frappe.model.sync(r.message);
						frappe.set_route("Form", doc[0].doctype, doc[0].name);
					}
				}
			});
		});
		
		// Set default values for fields if new document
		if (frm.doc.__islocal) {
			frm.set_value('transaction_date', frappe.datetime.get_today());
			frm.set_value('schedule_date', frappe.datetime.add_days(frappe.datetime.get_today(), 7));
		}
	}
});
