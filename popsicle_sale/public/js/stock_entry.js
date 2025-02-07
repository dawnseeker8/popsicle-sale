frappe.ui.form.on('Stock Entry', {
    before_load: function(frm) {
        // check frm is new
        if (frm.is_new()) {
            frm.set_value('stock_entry_type', 'Material Receipt');
        }
    }
});
