const express = require('express');
const { redisClient } = require('../db/redis_connect');

const router = express.Router();
const NUM_HASHES = 10;

router.post('/', async (req, res) => {
    redisClient.xrange(req?.body?.email, '-', '+', (err, data) => {
        if (err) {
            return console.log(err);
        } else if (data[0]) {
            // console.log("data: " + data);

            for (let i = 0; i < data.length; i++) {
                let id = data[i][0];
                let values = data[i][1];

                let eventObj = { id: id };
                for (let j = 0; j < values.length; j=j+2) {
                    eventObj[values[j]] = values[j+1];
                }
                console.log(`Event ${i}: ${JSON.stringify(eventObj)}`);
                console.log("Event type: " + eventObj.event_type);
            }

            return;
        } else {
            console.log("User doesn't exist yet")
        }
    });



    // try {
    //     const existingUsername = await User.getUserByUsername(req.body.username);
    //     if (existingUsername) {
    //         res.status(403).json({ message: "Username already exists!" });
    //         return;
    //     }
    //     const existingEmail = await User.getUserByEmail(req.body.email);
    //     if (existingEmail) {
    //         res.status(403).json({ message: "Email already exists!" });
    //         return;
    //     }

    //     // TODO: Consider changing from NUM_HASHES to salt
    //     const hashedPassword = await bcrypt.hash(req.body.password, NUM_HASHES);
    //     const user = new User({
    //         username: req.body.username,
    //         email: req.body.email,
    //         hashedPw: hashedPassword,
    //         roles: ['user'],
    //         userCreatedDate: Date.now(),
    //         wins: 0,
    //         losses: 0
    //     });

    //     try {
    //         const newUser = await user.save();
    //         console.log(newUser);
    //     } catch (err) {
    //         // Error saving to DB
    //         console.log(err);
    //         res.status(400).json({ message: err.message });
    //     }
    //     // Return successful registration with accessToken
    //     generateAccessToken(req.body.email)
    //     res.status(201).json({ message: "success" })
    // } catch (err) {
    //     // Error from bcrypt
    //     console.log(err);
    //     res.status(500)
    // }

});

module.exports = router;
