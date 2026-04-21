import { Telegraf } from 'telegraf';

export default {
  async fetch(request, env) {
    // Создаём бота, берём токен из настроек Cloudflare
    const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);

    // Команда /start
    bot.start((ctx) => ctx.reply('👋 Привет! Я работаю на Cloudflare Workers.'));

    // Ответ на любой текст
    bot.on('text', (ctx) => ctx.reply(`💬 Ты написал: "${ctx.message.text}"`));

    // Cloudflare принимает только POST-запросы от Telegram (Webhook)
    if (request.method === 'POST') {
      const update = await request.json();
      await bot.handleUpdate(update);
      return new Response('OK', { status: 200 });
    }

    // Если открыли URL в браузере
    return new Response('🤖 Бот активен. Напиши ему в Telegram!', { status: 200 });
  },
};