



module.exports = class CreateView {


	constructor(item) {
		this.item = item
	}

	async run() {
		console.log("* NEW POST CREATED WITH ID: ", this.item.id)
		console.log("* Title: ", this.item.title.raw)

	}
}