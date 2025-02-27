popsicle_sale.MobilePointOfSale.PaginationToolbar = class {
	constructor({ wrapper, page, events }) {
		this.wrapper = wrapper;
		this.page = page;
		this.events = events;
		
		// Initialize pagination variables
		this.current_page = 0;
		this.page_length = 40;
		
		this.init_component();
	}
	
	init_component() {
		this.prepare_dom();
		this.bind_events();
	}
	
	prepare_dom() {
		// Add pagination toolbar after the page-head
		$('.page-head').after(`
			<div class="pagination-button-toolbar">
				<div class="container">
					<button class="btn btn-default btn-sm btn-prev">${__("Previous")}</button>
					<button class="btn btn-default btn-sm btn-next">${__("Next")}</button>
				</div>
			</div>
		`);
		
		this.$pagination_toolbar = $('.pagination-button-toolbar');
		this.$btn_prev = this.$pagination_toolbar.find('.btn-prev');
		this.$btn_next = this.$pagination_toolbar.find('.btn-next');
		
		// Initially disable previous button
		this.$btn_prev.prop("disabled", true);
	}
	
	bind_events() {
		// Bind pagination button events
		this.$btn_prev.on("click", () => {
			if (this.events.on_prev_page) {
				this.events.on_prev_page();
			}
		});
		
		this.$btn_next.on("click", () => {
			if (this.events.on_next_page) {
				this.events.on_next_page();
			}
		});
	}
	
	update_pagination_status(items, page_length) {
		// Disable previous button if we're on the first page
		this.$btn_prev.prop("disabled", this.current_page === 0);
		
		// Disable next button if there are no more items
		const has_more_items = items && items.length === page_length;
		this.$btn_next.prop("disabled", !has_more_items);
	}
	
	set_current_page(page) {
		this.current_page = page;
	}
	
	get_current_page() {
		return this.current_page;
	}
};