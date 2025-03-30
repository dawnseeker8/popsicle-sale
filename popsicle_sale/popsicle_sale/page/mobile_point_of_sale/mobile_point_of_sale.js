frappe.provide("popsicle_sale.MobilePointOfSale");

frappe.pages["mobile-point-of-sale"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Point Of Sale"),
		single_column: true,
	});

	frappe.require("mobile-point-of-sale.bundle.css", function () {
		console.log("scss loaded");
	});

	frappe.require("mobile-point-of-sale.bundle.js", function () {
		wrapper.pos = new popsicle_sale.MobilePointOfSale.Controller(wrapper);
		window.cur_pos = wrapper.pos;
	});
};

frappe.pages["mobile-point-of-sale"].refresh = function (wrapper) {
	if (document.scannerDetectionData) {
		onScan.detachFrom(document);
		wrapper.pos.wrapper.html("");
		wrapper.pos.check_opening_entry();
	}
};
