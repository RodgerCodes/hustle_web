const User = require("../models/users");
const Gigs = require("../models/gigs");
const Proposal = require('../models/proposals');

module.exports = {
  GetHome: async (req, res) => {
    const user = await User.findById(req.user);

    if (user.role == "client") {
      res.redirect("/client");
    }
    //    do the other things

    const gigs = await Gigs.find()
      .sort({ createdAt: "desc" })
      .populate("client")
      .lean();
    res.render("freelancer/home", {
      gigs,
    });
  },

  GetGig: async (req, res) => {
    try {
      const gig = await Gigs.findOne({ _id: req.params.id })
        .populate("client")
        .lean();
      const num = await Proposal.find({gig:req.params.id}).count();
    //   console.log(num)
      if (!gig) {
        //    do something
      }

      res.render("freelancer/gig", {
        gig,
        num
      });
    } catch (error) {}
  },

  PostApplyGig:async (req, res) => {
    try {
        const gig = await Gigs.findOne({_id:req.params.id}).populate('client');
        const num = await Proposal.find({gig:req.params.id}).count();
        if(gig){
            // do something
        }

        const user = await Proposal.findOne({freelancer:req.user});

        if(user){
            res.render('freelancer/gig',{
                gig, 
                error:"You have already submitted your proposal",
                num
            })
        } else {
        const { dev_duration, letter } = req.body;

        if(!dev_duration || !letter){
            res.render('freelancer/gig', {
                gig,
                error:"Please fill in all forms",
                num
            })
        } else {
            const newProposal = new Proposal({
                freelancer:req.user,
                gig:req.params.id,
                letter:letter,
                proposed_duration:dev_duration,
            });

            // send Email to client

            await newProposal.save();
            res.status(201).redirect('/home');
        }
    
        }

    } catch (error) {
        
    }
  },

  GetProfile: (req, res) => {},
};
