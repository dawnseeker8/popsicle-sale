# Copyright (c) 2025, Xiaoming Wang and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import nowdate, nowtime
from frappe import _


class PurchaseOrderTemplate(Document):
	def validate(self):
		self.is_template = 1

	def create_purchase_order(self):
		"""Create a Purchase Order from this template"""
		po = frappe.new_doc("Purchase Order")
		
		# Copy fields from template to actual purchase order
		po.supplier = self.supplier
		po.supplier_name = self.supplier_name
		po.company = self.company
		po.transaction_date = nowdate()
		po.schedule_date = self.schedule_date or nowdate()
		
		# Copy items
		for item in self.items:
			po.append("items", {
				"item_code": item.item_code,
				"item_name": item.item_name,
				"description": item.description,
				"qty": item.qty,
				"uom": item.uom,
				"rate": item.rate,
				"warehouse": item.warehouse,
				"schedule_date": item.schedule_date or nowdate()
			})
		
		# Copy taxes
		if self.taxes_and_charges:
			po.taxes_and_charges = self.taxes_and_charges
			for tax in self.taxes:
				po.append("taxes", {
					"charge_type": tax.charge_type,
					"account_head": tax.account_head,
					"description": tax.description,
					"rate": tax.rate
				})
		
		# Copy terms and conditions
		if self.tc_name:
			po.tc_name = self.tc_name
			po.terms = self.terms
		
		return po
