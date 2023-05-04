import bot from "../..";

const groupId = process.env.GROUP_NOTIFICOFERTA_ID

if(!groupId)
    throw new Error("ID not specified");

export interface IGroupBotProps {
    partner: 'Amazon' | 'Magalu';
    title: string;
    description: string;
    link: string;
    topic?: number;
};

export const handlerSendMessage = async (props: IGroupBotProps) => {

    const msg = `
        *Oferta do parceiro ${props.partner}*

        Titulo: ${props.title}
        Descrição: ${props.description}

        [Saiba mais](${props.link})
    `;

    const sendMsg = await bot.sendMessage(groupId, msg, {
        parse_mode: "Markdown",
        message_thread_id: props.topic
    });

    return sendMsg;

};

bot.on("new_chat_members", (msg) => {
    const users = msg.new_chat_members;

    if(!!users){
        let names = '';
        users.forEach(user => {
            names += ` - ${user.first_name}
            `;
        });

        const welcomeMsg = `
            *Sejam bem vindo(s)*

            ${names}

            Caso não conheçam o Notifica Oferta, 
            nós temos alguns Bot's que constantemente postam promoções e ofertas
            de nossa rede de parceiros.

            Membros não podem postar mensagens no grupo, mas pode interagir com nosso bot
            clicando [aqui](tg://user?id=6009820380)
        `;

        bot.sendMessage(groupId, welcomeMsg, {
            message_thread_id: 1
        });
    }
});