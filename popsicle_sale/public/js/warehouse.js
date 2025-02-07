frappe.ui.form.on('Warehouse', {
  custom_is_item_storage: function(frm) {
    if(frm.doc.custom_is_item_storage) {
      // set name field as read only  
      frm.set_df_property('warehouse_name', 'hidden', 1);  
    } else {
      // set name field as not read only  
      frm.set_df_property('warehouse_name', 'hidden', 0);  
    }  
  },

  custom_item_serial_number: function(frm) {
    if(frm.is_new()) {
      if(frm.doc.custom_item_serial_number) {
        // set warehouse_name field value as item_serial_number
        frm.set_value('warehouse_name', frm.doc.item_serial_number);
      } else {
       // set warehouse_name field value as blank
        frm.set_value('warehouse_name', '');
      }  
    }
  }
})