import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

import admin from 'firebase-admin'

import serviceAccount from 'firebase-adminsdk-key.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.get('/fcm', (req, res) => {
  const AndroidPhoneQA = 'cXsrlAtaRD6-argCwNMy-U:APA91bEeVvOawvg9UK6wY3FXpY-LQ_3a6zlv6naTsyDGrCNCX6UiviPI-fHoi5CE_eIXZ38SW6YuUH2hR7Ai5SlF7TCW_kWoRt7Ejiqbl18GlOQ5e7sXvhS2mTa9fKoe-kIFVqJgVZbS'
  const AndroidSimulatorDev = 'cmkAch1NTTCEpVJxUsjq0u:APA91bG_pZTxu3bZR4gLzgChP790kBspDwLQz0kqzJ0IeKA3Sh1Zw4gatxJUBRHrfjd6_8O4Q1rNQwgawF68uW3o0pBRfHnYrlODw5uAGLg6tdtm0Dex-kSRnVdCjqIThm4TQKDvYIG4'
  const IOSDev = 'dTBCfBdCQkfov0Nauhxsdk:APA91bGaSwcdeObnUzoi_9xTU0Vyk6iAT75c9hBo3eyLipI_Ek7LyK0IlDBSsAnhV6DWgwQmE4VmUvhVj2m-088P_5RAEBBDANa1_DfVoMHJ16A7jeddiS5ZWvNQYJ4b4dkd-PZB4bAl'
  // const payload = {
  //   notification : {
  //     title : "FCM IS COOL !",
  //     body : "Notification has been recieved",
  //     content_available : "true",
  //     image:"https://i.ytimg.com/vi/iosNuIdQoy8/maxresdefault.jpg"
  //   }
  // }
  // const options = {
  //   priority: "high"
  // }
  const message = {
    data: {
      notifee: JSON.stringify({
        title: 'Talent Hunt',
        subtitle: 'aaqib@surreal.company',
        body: 'Greetings from Edify World School!!! "The will to win, the desire to succeed, the urge to reach your full potential...these are the keys that will unlock the door to personal excellence."',
        android: {
          channelId: 'default',
          largeIcon: 'https://robohash.org/f244598a7ebd9debc044fad7e23b8076?set=set4&bgset=&size=400x400',
          style: { type: 1, text: 'Greetings from Edify World School!!! "The will to win, the desire to succeed, the urge to reach your full potential...these are the keys that will unlock the door to personal excellence."' },
          actions: [
            {
              title: 'Mark as Read',
              pressAction: {
                id: 'read',
              },
            },
          ],
        },
      }),
    },
    tokens: [AndroidPhoneQA, AndroidSimulatorDev, IOSDev]
  };
  admin.messaging().sendMulticast(message)
    .then(function (response) {
      res.send('message successfully sent !')
    })
    .catch(function (error) {
      res.send(error).status(500)
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
