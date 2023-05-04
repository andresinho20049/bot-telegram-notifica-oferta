import TelegramBot from "node-telegram-bot-api";
import bot from "../..";
import { helpMsg, sejaBemVindo } from "../../customMessages";


const defaultOptions: TelegramBot.SendMessageOptions = {
    reply_markup: {
        keyboard: [
            [{text: "oferta"}, {text: "notifique"}]
        ]
    }, parse_mode: "Markdown"
};

const helpAction = (chatId: number) => {
    bot.sendMessage(chatId, "Resposta invalida!");
    bot.sendMessage(chatId, helpMsg, {
        parse_mode: "Markdown",
        reply_markup: {
            keyboard: [
                [{text: "oferta"}, {text: "notifique"}]
            ]
        }
    });
};

bot.onText(/\/start/, (msg: TelegramBot.Message) => {
    // const language_user = msg.from?.language_code || "en";
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, sejaBemVindo, defaultOptions);
});

bot.onText(/\/oferta|oferta/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const nameUser = msg.from?.first_name;

    const msgRes = `
        Olá ${nameUser}, legal! É sempre bom estar por dentro das ofertas, mas me diga, deseja visualizar oferta de um produto especifico, ou por categoria?
    `

    bot.sendMessage(chatId, msgRes, {
        reply_markup: {
            force_reply: true,
            keyboard: [
                [{text: "Produto" }, {text: "Categoria"}]
            ]
        }
    }).then(reply => {
        
        bot.once("message", (replyMsg) => {
            const optionSelect = replyMsg.text;

            if(!/Produto|Categoria/.test(optionSelect || '')){
                helpAction(chatId);
                return;
            }

            const msgRes = `
                Certo! Selecionou a opção ${optionSelect}, agora só falta eu saber qual ${optionSelect} você gostaria de buscar por oferta.
            `;

            
            const sentMsg = bot.sendMessage(reply.chat.id, msgRes, {reply_markup: {remove_keyboard: true}});
            sentMsg.then(() => handlerFindOffer());
            
        });

    })

});

const handlerFindOffer = () => {

    bot.once('message', (message) => {

        const replyMsg = `
        *Solicitação feita com sucesso*

        Legal, recebemos aqui seu pedido de oferta por:
        _${message.text}_

        Já estamos trabalhando nisso, retornamos em breve!!!
        `;

        const msgPull = bot.sendMessage(message.chat.id, replyMsg, {
            reply_to_message_id: message.message_id,
            parse_mode: 'Markdown'
        });

        const msgPartners = `
        Confira as ofertas direto da nossa rede de parceiros

        *Partners*
        - [Amazon](${process.env.LINK_AMAZON})
        - [Magalu](${process.env.LINK_MAGALU})
        `;
        msgPull.then(msg => bot.sendMessage(msg.chat.id, msgPartners, {parse_mode: 'Markdown'}));

    });
};

bot.onText(/\/notifique|notifique/, (msg:TelegramBot.Message) => {

    bot.sendMessage(msg.chat.id, "Em desenvolvimento!");

    bot.sendMessage(msg.chat.id, "Click aqui: /ofertas");

});