const pkg_json = require('../package.json')
const vertex   = require('vertex360')({site_id:pkg_json.app})
const router   = vertex.router()
const turbo = require('turbo360')({site_id:pkg_json.app})

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', function(req, res){
	turbo.fetch('post', null)
	.then(data => {
		res.render('blogsList',{ blogs: data })
	})
	.catch(err => {
		throw err
	})
})

router.get('/blog-new', (req, res) => {
	res.render('blogNew')
})

router.post('/blog-new', (req, res) => {
	const blog = { 
		title:req.body.title, 
		text:req.body.text, 
		link: req.body.title.split(" ").join("-")
	}
	turbo.create('post',blog)
	.then(data => {
		res.redirect('/')	
	})
})

router.get('/blog/:link', (req, res) => {
	turbo.fetch('post',{ link: req.params.link })
	.then(data => {
		let blog = data[0]
		blog.text = blog.text.replace(/\n/g, '<br />')
		res.render( 'blogShow',{ blog:blog } )
	})
	.catch(err => {
		console.log('err',err.message)
	})	
})




module.exports = router
