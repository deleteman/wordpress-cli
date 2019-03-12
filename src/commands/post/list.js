'use strict'

const {Command, flags} = require('@oclif/command')
const config = require("config")
const wpClient = require("../../../lib/wpclient")
const V = require("../../views/listView")

class ListCommand extends Command {
        async run() {
            const {flags} = this.parse(ListCommand)
				
			let C = new wpClient(config.get("wp-api.url"), config.get("wp-api.endpoints"))                
			C.listPosts((err, resp) => {
				if(err) return console.error(err)
				const view = new V(resp)
				view.run()
			})
               
              
        }
}

module.exports = ListCommand