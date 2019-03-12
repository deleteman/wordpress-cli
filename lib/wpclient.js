const R = require("request")

function Base64(txt) {
	return new Buffer.from(txt).toString("base64")
}


module.exports = class WordPressClient {

	constructor(url, endpoints) {
		this.apiUrl = url
		this.endpoints = endpoints
	}

	getSecureHeaders(usr, pwd) {
		return {
			Authorization: 'Basic ' + Base64(usr + ":" + pwd),
	        'accept': 'application/json'
		}
	}

	makeRequest(options, cb) {

		options.json = true //force the json data type on all requests

		return R(options, (err, resp, body) => {
			if(err) return cb(err)
			if(resp.data && resp.data.status >= 400) {
				return cb({
					errorMsg: resp.data.message
				})
			}

			if(typeof body == 'string') {
				if(body.indexOf("|") == 0) body = body.replace("|", "")
				body = JSON.parse(body)

				if(body.data && body.data.status >= 400) {
					return cb({
						errorMsg: body.message
					})
				}
			}
			cb(err, body)
		})
	}


	async DeletePost(data, cb) {
		const URL = this.apiUrl + this.endpoints.delete.replace(":id", data.postId)

		let headers = this.getSecureHeaders(data.username, data.password)

		let options = {
			url: URL,
			headers: headers,
			method: 'DELETE'
		}

		return this.makeRequest(options, cb)
	}
	

	async PublishPost(data, cb) {
		const URL = this.apiUrl + this.endpoints.update.replace(":id", data.postId)

		let headers = this.getSecureHeaders(data.username, data.password)

		let update = {
			status: 'publish'
		}
		let options = {
			url: URL,
			headers: headers,
			body: update,
			method: 'POST'
		}

		return this.makeRequest(options, cb)
	}


	async CreatePost(data, cb) {
		const URL = this.apiUrl + this.endpoints.create

		let headers = this.getSecureHeaders(data.username, data.password)

		let newPost = {
			title: data.title,
			content: data.body,
			excerpt: data.body
		}
		let options = {
			url: URL,
			headers: headers,
			body: newPost,
			method: 'POST'
		}

		return this.makeRequest(options, cb)
	}

	async GetPost(id, cb) {
		const URL = this.apiUrl + this.endpoints.get.replace(":id", id)

		let options = {
			method: 'GET',
			url: URL
		}
		return this.makeRequest(options, cb)
	}

	async listPosts(cb) {
		const URL = this.apiUrl + this.endpoints.list

		let options = {
			method: 'GET',
			url: URL
		}
		return this.makeRequest(options, cb)	
	}
}