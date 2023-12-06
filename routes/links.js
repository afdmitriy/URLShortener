const express = require('express');
const router = express.Router();
const Link = require('../models/link');
const shortid = require('shortid');

router.post('/short', async (req, res) => {
   const { link } = req.body;
   try {
      let url = await Link.findOne({ link });
      if (url) {
         return res.json(url);
      }

      const code = shortid.generate();
      const shortURL = `http://localhost:3000/links/${code}`;
      url = new Link({
         code,
         source: link,
         short: shortURL,
      });
      await url.save();
      return res.json(url);
   } catch (error) {
      return res
         .status(500)
         .json({ status: 500, message: JSON.stringify(error) });
   }
});

router.get('/:code', async (req, res) => {
   const { code } = req.params;
   const link = await Link.findOne({ code });

   if (link) {
      return res.redirect(link.source);
   }

   return res.status(404).json({ status: 404, message: `Link not found` });
});

module.exports = router;
