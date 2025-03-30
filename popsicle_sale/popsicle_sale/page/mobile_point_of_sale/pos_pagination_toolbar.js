popsicle_sale.MobilePointOfSale.PaginationToolbar = class {
	constructor({ wrapper, page, events }) {
		this.wrapper = wrapper;
		this.page = page;
		this.events = events;
    this.page_length = 1;

		this.init_component();
	}

	init_component() {
		this.prepare_dom();
		this.bind_events();
	}

	prepare_dom() {
		// Add pagination toolbar after the page-head
		$('.page-head').after(`
			<div class="pagination-button-toolbar d-none" >
				<div class="container">
					<button class="btn btn-default btn-sm btn-prev">${__("Previous")}</button>
					<button class="btn btn-default btn-sm btn-next">${__("Next")}</button>
				</div>
			</div>
		`);

		this.$component = $('.pagination-button-toolbar');
		this.$btn_prev = this.$component.find('.btn-prev');
		this.$btn_next = this.$component.find('.btn-next');

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

	update_pagination_status(previous_btn_disable, next_btn_disable) {
		// Disable previous button if we're on the first page
		this.$btn_prev.prop("disabled", previous_btn_disable);

		// Disable next button if there are no more items
		this.$btn_next.prop("disabled", next_btn_disable);
	}
};
