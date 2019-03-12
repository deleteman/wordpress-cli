



module.exports = class ListView {


	constructor(item) {
		this.item = item
	}

	async run() {
		console.log(this.item.title.rendered)
		console.log("=========")
		console.log(this.item.content.rendered)

	}
}