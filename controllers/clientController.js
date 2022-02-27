const User = require('../models/users');
const Profile = require('../models/profile');
const Gigs = require('../models/gigs');

module.exports = {
    GetGigs:async(req, res) => {
        try {
            // let user = req.user;
            const gigs = await Gigs.find({creator:req.user}).sort({createdAt:"desc"}).lean();
            res.render('client/client', {
                gigs
            })
        } catch (error) {
            
        }
    },

    GetAddGig:async(req, res) => {
      res.render('client/new');
    },

    PostAddGig:async(req, res) => {
       let user = req.user;
       const { title, tech, xp, duration, budget, description} = req.body;
    //    const errors = [];

       if(!title || !tech || !budget || !description){
           res.render('client/new', {
               error:"Please fill in all forms"
           });
       } else {
           let technologies = tech.trim().split(",");
           let newBudget = budget.trim();

           const newGig = new Gigs({
               title:title,
               description:description,
               budget:newBudget,
               technologies:technologies,
               client:user,
               duration:duration,               
           });

           await newGig.save();
           res.status(201).redirect('/client')
       }
    },

    GetEditAccount:(req, res) => {

    },

    PostEditAccount:(req, res) => {

    },
    
    
    
    
    
    EditGig:(req, res) => {

    }
}