const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
        default: Horlapookie,
        useMultiFileAuthState,
        jidNormalizedUser,
        Browsers,
        delay,
        makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
        if (!fs.existsSync(FilePath)) return false;
        fs.rmSync(FilePath, {
                recursive: true,
                force: true
        })
};
const {
        readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
        const id = makeid();
        async function STAR_MD_QR_CODE() {
                const {
                        state,
                        saveCreds
                } = await useMultiFileAuthState('./temp/' + id)
                try {
                        let Qr_Code_By_Horlapookie = Horlapookie({
                                auth: state,
                                printQRInTerminal: false,
                                logger: pino({
                                        level: "silent"
                                }),
                                browser: Browsers.ubuntu("Chrome"),
                        });

                        Qr_Code_By_Horlapookie.ev.on('creds.update', saveCreds)
                        Qr_Code_By_Horlapookie.ev.on("connection.update", async (s) => {
                                const {
                                        connection,
                                        lastDisconnect,
                                        qr
                                } = s;
                                if (qr) await res.end(await QRCode.toBuffer(qr));
                                if (connection == "open") {
                                        await delay(5000);
                                        let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                                        await delay(800);
                                   let b64data = Buffer.from(data).toString('base64');
                                   let session = await Qr_Code_By_Horlapookie.sendMessage(Qr_Code_By_Horlapookie.user.id, { text: b64data });

                                   let STAR_MD_TEXT =`

╭─═━⌬━═─⊹⊱✦⊰⊹─═━⌬━═─
╎   『 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 』
╎  ✦ 𝚃𝙷𝚄𝙶𝙺𝙴𝙴𝙳 𝚂𝙴𝚂𝚂𝙸𝙾𝙽𝚂
╎  ✦  ʙʏ 𝚃𝙷𝚄𝙶𝙺𝙴𝙴𝙳
╰╴╴╴╴

▌   『 🔐 𝐒𝐄𝐋𝐄𝐂𝐓𝐄𝐃 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 』
▌  • Session ID:
▌  ⛔ [ Please set your SESSION_ID ]

╔═
╟   『 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 & 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 』
╟  🎥 𝐘𝐨𝐮𝐓𝐮𝐛𝐞:  https://youtube.com/THUGKEEDCODES
╟  👑 𝐎𝐰𝐧𝐞𝐫: 27630425996
╟  💻 Github: github.com/Thugkeedxxx
╟  💻 𝐑𝐞𝐩𝐨: github.com/Thugkeedxxx/THUG-MD
╟   📢 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥:  https://whatsapp.com/channel/0029VbBUnlCB4hdInUVuGl1r
╟  📸 telegram: t.me/thugkeed
╰
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦
𝐄𝐍𝐉𝐎𝐘 
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦ 
______________________________
★彡[ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ ᴛʜᴇ ʀᴇᴘᴏ!]彡★`;
         await Qr_Code_By_Horlapookie.sendMessage(Qr_Code_By_Horlapookie.user.id,{text:STAR_MD_TEXT},{quoted:session})



                                        await delay(100);
                                        await Qr_Code_By_Horlapookie.ws.close();
                                        return await removeFile("temp/" + id);
                                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                                        await delay(10000);
                                        STAR_MD_QR_CODE();
                                }
                        });
                } catch (err) {
                        if (!res.headersSent) {
                                await res.json({
                                        code: "Service is Currently Unavailable"
                                });
                        }
                        console.log(err);
                        await removeFile("temp/" + id);
                }
        }
        return await STAR_MD_QR_CODE()
});
module.exports = router
