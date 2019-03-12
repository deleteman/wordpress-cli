'use strict'

const {Command, flags} = require('@oclif/command')
const config = require("config")
const wpClient = require("../../../lib/wpclient")
const V = require("../../views/publishView")

class CreateCommand extends Command {
        async run() {
            const {flags} = this.parse(CreateCommand)


            if(!flags.postId) {
            	console.log("Error: Missing post ID, please use the --postId flag")
            	return 1
            }

			if(!flags.username) {
            	console.log("Error: Missing username, please use the --username flag")
            	return 1
            }

			if(!flags.password) {
            	console.log("Error: Missing password, please use the --password flag")
            	return 1
            }

            let post = flags

            				
			let C = new wpClient(config.get("wp-api.url"), config.get("wp-api.endpoints"))                
			C.PublishPost(post, (err, resp) => {
				if(err) return console.error(err)
				const view = new V(resp)
				view.run()
			})
               
              
        }
}

CreateCommand.flags = {
		username: flags.string({
                description: 'Your username'
        }),
		password: flags.string({
                description: 'Your password'
        }),
        postId: flags.string({
                description: 'The ID of the blog post'
        })
}


module.exports = CreateCommand