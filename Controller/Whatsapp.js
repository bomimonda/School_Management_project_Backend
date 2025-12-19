
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;

import qrcode from 'qrcode-terminal';

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "bot2" })
});

client.on('qr', qr => {
    console.log("📱 Scan this QR with your WhatsApp app (first time only):");
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log("🔑 Authenticated successfully!");
});

client.on('ready', async () => {
    console.log('✅ WhatsApp client is ready!');
    // const number = '923424747026@c.us';
    // const message = 'Hello! This is a WhatsApp message from Node.js';

    // try {
    //     const msg = await client.sendMessage(number, message);
    //     console.log('📤 Message sent! ID:', msg.id._serialized);
    // } catch (err) {
    //     console.error('❌ Failed to send message:', err);
    // }
});

client.on('auth_failure', msg => {
    console.error("❌ Authentication failed:", msg);
});




export const Whatsappstartboat=()=>{
client.initialize();
}



function formatNumber(number) {
    // Remove non-digit characters
    number = number.replace(/\D/g, '');
    // Convert leading 0 to country code
    if (number.startsWith('0')) {
        number = '92' + number.slice(1);
    }
    return number + '@c.us';
}


export let attendence_Message=async(req,res)=>{
    // console.log(req.body);



      try {
        const attendanceList = req.body;

        for (const val of attendanceList) {
            const number = val.Data[0]?.Phone;
            if (!number) continue; // skip if phone not present

            const whatsappNumber = formatNumber(number);
            const message = `Dear Parent, your child ${val.Student} has been ${val.checked}`;

            console.log(`Sending message to: ${val.Student}`);
            console.log(`Number: ${whatsappNumber}`);
            console.log(`Message: ${message}`);

            try {
                await client.sendMessage(whatsappNumber, message);
                console.log(`✅ Message sent to ${val.Student}`);
            } catch (err) {
                console.error(`❌ Failed to send to ${val.Student}:`, err);
            }

            // Optional delay to avoid Puppeteer rate limit
            await new Promise(r => setTimeout(r, 1000));
        }

        res.json({ success: true, message: 'All messages processed' });
    } catch (err) {
        console.error('❌ Error in attendence_Message:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};



    // req.body.forEach(async (val,ind)=>{
    //     // console.log(val.Student);
    //     // console.log(val.checked);
    //     // console.log(val.Data[0].Phone + '@c.us');
    //     let Number=val.Data[0].Phone + '@c.us'
    //     let Message=`Dear Parent your Children ${val.Student} has been ${val.checked}`
    //     console.log(Message);
    //     console.log(Number);


    //      try {
    //     await client.sendMessage(Number, Message);
    //     console.log(`✅ Message sent to ${val.Student}`);
    // } catch (err) {
    //     console.error(`❌ Failed to send to ${val.Student}:`, err);
    // }
        
        
        
        
        
    // })
    

