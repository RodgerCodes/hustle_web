module.exports = {
    indexRoute:(req, res) => {
        // render landing ul
    },

    GetRegister:(req, res) => {
       res.render('Index/register')
    },

    PostRegister:(req, res) => {

    },
    
    
    GetLogin:(req, res) => {
        res.render('Index/login')
    },

    PostLogin:(req, res) => {
        // post logic
    },
}