import frappe
from erpnext.accounts.doctype.pos_invoice_merge_log.pos_invoice_merge_log import POSInvoiceMergeLog

class CustomPOSInvoiceMergeLog(POSInvoiceMergeLog):

	# Override create_merge_logs method
	# def create_merge_logs(self, invoice_by_customer, closing_entry=None):
	# 	try:
	# 		for customer, invoices in invoice_by_customer.items():
	# 			for _invoices in split_invoices(invoices):
	# 				merge_log = frappe.new_doc("POS Invoice Merge Log")
	# 				merge_log.posting_date = (
	# 					getdate(closing_entry.get("posting_date")) if closing_entry else nowdate()
	# 				)
	# 				merge_log.posting_time = (
	# 					get_time(closing_entry.get("posting_time")) if closing_entry else nowtime()
	# 			)
	# 			merge_log.customer = customer
	# 			merge_log.pos_closing_entry = closing_entry.get("name") if closing_entry else None
	# 			merge_log.cashier = closing_entry.get("user")
	# 			merge_log.set("pos_invoices", _invoices)
	# 			merge_log.save(ignore_permissions=True)
	# 			merge_log.submit()
	# 		if closing_entry:
	# 			closing_entry.set_status(update=True, status="Submitted")
	# 			closing_entry.db_set("error_message", "")
	# 			closing_entry.update_opening_entry()

	# 	except Exception as e:
	# 		frappe.db.rollback()
	# 		message_log = frappe.message_log.pop() if frappe.message_log else str(e)
	# 		error_message = get_error_message(message_log)

	# 		if closing_entry:
	# 			closing_entry.set_status(update=True, status="Failed")
	# 			if isinstance(error_message, list):
	# 				error_message = json.dumps(error_message)
	# 			closing_entry.db_set("error_message", error_message)
	# 		raise

	# 	finally:
	# 		frappe.db.commit()
	# 		frappe.publish_realtime("closing_process_complete", user=frappe.session.user)

	# Override get_new_sales_invoice method
	def get_new_sales_invoice(self):
		# Get the original sales invoice from parent class
		sales_invoice = super().get_new_sales_invoice()
              
		# Get Employee from user_id which is custom field cashier
		# employee = frappe.db.get_value("Employee", self.custom_cashier, "user_id") if self.custom_cashier else None

		# if employee:
		# 	# Get sales person from employee
		# 	sales_person = frappe.db.get_value("Sales Person", employee, "employee")
		# 	# Check sales_person exist not null
		# 	if sales_person:
		# 		# create a new Sale Team with sales person
		# 		sales_team = frappe.new_doc("Sales Team")
		# 		sales_team.sales_person = sales_person
		# 		sales_invoice.set("sales_team", [sales_team])
		sales_team = frappe.new_doc("Sales Team")
		sales_person = "Peter"
		# sales_person = "John Lewis"
		sales_team.sales_person = sales_person
		sales_team.allocated_percentage = 100
		sales_invoice.set("sales_team", [sales_team])
        
		return sales_invoice
