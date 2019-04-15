var express = require('express');
const { User } = require("../../models/user");
var router = express.Router();

// Create
router.post('/', async (req, res) => {
    console.log('POST');
    const { firstName, lastName, email} = req.body;
    const user = new User({ firstName, lastName, email });
    console.log(user);

    try {
        const doc = await user.save();
        res.send(doc);
    } catch(e) {
        res.status(400).send(e);
    }
})


// READ
// Get All
router.get('/',  async (req, res) => {
    console.log('GET ALL');
    try {
        // sort it by createdAt Desc order
        const users = await User.find({}).sort({createdAt: -1});
        res.send(users);
    } catch(e) {
        res.status(400).send(e);
    }
});


// GET ONE
router.get(`/:id`, async (req, res) => {
    const id = req.params.id;
    // if (!ObjectID.isValid(id)) {
    //     return res.status(404).send()
    // }

    try {
        const user = await User.findById(id);
        // const user = await User.findOne({ _id: id })
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(400).send()
    }
})


// UPDATE
router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOneAndUpdate({
            _id: id,
        }, {$set: req.body}, {new: true});

        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(e) {
        res.status(400).send(e);
    }
})



// DELETE

router.delete(`/:id`, async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOneAndRemove({
            _id: id,
        });
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch(e) {
        res.status(400).send()
    }
})

module.exports = router;
