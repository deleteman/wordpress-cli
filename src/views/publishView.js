



module.exports = class PublishView {


	constructor(item) {
		this.item = item
	}

	async run() {
		console.log("Your post was published!")	
	}
}