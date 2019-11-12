import {
   FacebookAdapter,
   FacebookEventTypeMiddleware
} from 'botbuilder-adapter-facebook';
import { Botkit } from 'botkit';

const adapter = new FacebookAdapter({
   verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
   app_secret: process.env.FACEBOOK_APP_SECRET,
   access_token: process.env.FACEBOOK_ACCESS_TOKEN
});

adapter.use(new FacebookEventTypeMiddleware());

const controller = new Botkit({
  adapter
});

controller.on('message', async (bot, message) => {
  await bot.reply(message, 'Hallo, I heard a message!');
});

// eslint-disable-next-line import/prefer-default-export
export const hello = (event, context, callback) => {
  const p = new Promise(resolve => {
    resolve('success');
  });
  p.then(() =>
    callback(null, {
      message: 'Go Serverless Webpack (Ecma Script) v1.0! First module!',
      event,
    })
  ).catch(e => callback(e));
};
