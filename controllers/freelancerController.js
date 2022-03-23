const User = require("../models/users");
const Gigs = require("../models/gigs");

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

  GetApplyGig: (req, res) => {},

  PostApplyGig: (req, res) => {},

  GetProfile: (req, res) => {},
};
