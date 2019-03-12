



module.exports = class ListView {


	constructor(items) {
		this.items = items
	}

	async run() {
		let posts = this.items.map( i => {
			return {
				id: i.id,
				title: i.title.rendered,
				last_modified: i.modified
			}
		})

		posts.forEach( p => {
			console.log("* (", p.id, ") ", p.title, " [", p.last_modified, "] ")
		})
	}
}