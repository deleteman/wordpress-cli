'use strict'

const {Command, flags} = require('@oclif/command')
const config = require("config")
const wpClient = require("../../../lib/wpclient")
const V = require("../../views/getView")

class GetCommand extends Command {
        async run() {
            const {flags} = this.parse(GetCommand)


            if(!flags.postId) {
            	console.log("Error: no post ID present, please use the --postId flag")
            	return 1
            }
            const postId = flags.postId.toLowerCase().trim()

				
			let C = new wpClient(config.get("wp-api.url"), config.get("wp-api.endpoints"))                
			C.GetPost(postId, (err, resp) => {
				if(err) return console.error(err)
				const view = new V(resp)
				view.run()
			})
               
              
        }
}

GetCommand.flags = {
        postId: flags.string({
                description: 'Internal ID of the blog post to obtain'
        })
}


module.exports = GetCommand