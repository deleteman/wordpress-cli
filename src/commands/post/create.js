'use strict'

const {Command, flags} = require('@oclif/command')
const config = require("config")
const wpClient = require("../../../lib/wpclient")
const V = require("../../views/createView")

class CreateCommand extends Command {
        async run() {
            const {flags} = this.parse(CreateCommand)


            if(!flags.title) {
            	console.log("Error: Missing post title, please use the --title flag")
            	return 1
            }

            if(!flags.body) {
            	console.log("Error: Missing content for the new post, please use the --body flag")
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

            let newPost = flags

            				
			let C = new wpClient(config.get("wp-api.url"), config.get("wp-api.endpoints"))                
			C.CreatePost(newPost, (err, resp) => {
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
        title: flags.string({
                description: 'The title of the new blog post'
        }),
        body: flags.string({
                description: 'The content of the new blog post'
        })
}


module.exports = CreateCommand