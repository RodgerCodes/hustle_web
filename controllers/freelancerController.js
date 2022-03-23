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
      if (!gig) {
        //    do something
      }

      res.render("freelancer/gig", {
        gig,
      });
    } catch (error) {}
  },

  PostApplyGig:async (req, res) => {
    try {
        const gig = await Gigs.findOne({_id:req.params.id}).populate('client');

        if(gig){
            // do something
        }

        const user = await Proposal.findOne({freelancer:req.user});

        if(user){
            // do something
        }

        const { dev_duration, letter } = req.body;

        if(!dev_duration || !letter){
            res.render('freelancer/gig', {
                gig,
                error:"You have already submitted your application"
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
    
    } catch (error) {
        
    }
  },

  GetProfile: (req, res) => {},
};
