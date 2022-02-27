const User = require('../models/users');
const Profile = require('../models/profile');
const Gigs = require('../models/gigs');

module.exports = {
    GetGigs:async(req, res) => {
        try {
            let user = req.user;
            const gigs = await Gigs.find({creator:req.user}).sort({createdAt:"desc"}).lean();
            res.render('client/client', {
                gigs
            })
        } catch (error) {
            
        }
    },
    GetDetails:async(req, res) => {
        let user = req.user;
        
        let details = await Profile.findOne({user:user}).populate('user');

        if(!details){
            // 404 page
        } 
        // console.log(details);

        res.render('client/Details', {
            details
        });
    },

    GetEditAccount:(req, res) => {

    },

    PostEditAccount:(req, res) => {

    },
    
    GetAddGig:(req, res) => {
        
    },
    
    PostAddGig:(req, res) => {

    },
    
    EditGig:(req, res) => {

    }
}