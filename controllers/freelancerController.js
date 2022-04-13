const User = require("../models/users");
const Gigs = require("../models/gigs");
const Profile = require("../models/profile");
const Proposal = require('../models/proposals');
const Skills = require('../models/skills');

module.exports = {
  GetHome: async (req, res) => {
    const user = await User.findById(req.user);

    if (user.role == "client") {
      return res.redirect("/client");
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
      // console.log(gig)
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

  GetGigByClient:async(req, res) => {
    try{
      const gigs = await Gigs.find({client:req.params.id}).sort({createdAt:"desc"}).populate('client').lean();
      // console.log(gigs);
      res.render('freelancer/clientgigs', {
        gigs,
      });
    } catch (err){

    }
  },

  GetGigByStack:async(req, res) => {
     try {
       const gigs = await Gigs.find({technologies:req.params.tech}).sort({createdAt:"desc"}).populate('client').lean();
       res.render('freelancer/byStack', {
         gigs,
         stack:req.params.tech,
       });
     } catch (error) {
       
     }
  },

  GetProfile: async(req, res) => {
    try {
      const profile = await Profile.findOne({user:req.user}).populate("user").lean();
      // console.log(profile);
      res.render('freelancer/profile', {
        profile
      });
    } catch (error) {
      
    }
  },

  GetEditAcc:async(req, res) => {
     try {
      //  let AvSkill = [
      //    'JavaScript', 'VueJs', 'ReactJs', 'SvelteKit', 'Laravel', 'Nodejs', 'Golang','Flutter', 'Kotlin', 'Java', ''
      //  ]
       const profile = await Profile.findOne({user:req.params.id}).populate('user').lean();
       const skills = await Skills.findOne({user:req.params.id}).lean();
       res.render('freelancer/editProf', {
        //  skills,
         profile,
       })
     } catch (error) {
       
     }
  },

  PutEditProf:async(req, res) => {

  },

  PostAddSkills:(req, res) => {
    try {
      console.log(req.body)
    } catch (error) {
      
    }
  }
};
