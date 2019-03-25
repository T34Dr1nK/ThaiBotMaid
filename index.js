const Discord = require("discord.js");

var Long = require("long");

const client = new Discord.Client();


const config = require("./config.json");

client.on("ready", () => {
 
  console.log(` ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  
  client.user.setActivity(`กําลังบริการอยู่ ${client.guilds.size} servers เจ้าคะ `);
});

client.on("guildCreate", guild => {
  
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`กําลังบริการอยู่ ${client.guilds.size} servers เจ้าคะ `);
});

client.on("guildDelete", guild => {
  
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`กําลังบริการอยู่ ${client.guilds.size} servers เจ้าคะ `);
});






const getDefaultChannel = (guild) => {
  
  if(guild.channels.has(guild.id))
    return guild.channels.get(guild.id)

  
  const generalChannel = guild.channels.find(channel => channel.name === "general");
  if (generalChannel)
    return generalChannel;
  
  return guild.channels
   .filter(c => c.type === "text" &&
     c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
   .sort((a, b) => a.position - b.position ||
     Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
   .first();
}

client.on("guildMemberAdd", member => {
  const channel = getDefaultChannel(member.guild);
  channel.send(`ยินดีต้อนรับนายท่าน , ${member} สู่ server นะเจ้าค่ะ`);
  member.send("สวัสดีค่ะยินดีต้อนรับสู่ Server นะคะ");
});
client.on("guildMemberRemove", member => {
  const channel = getDefaultChannel(member.guild);
  channel.send(`นายท่าน , ${member} ได้ออกจาก เซิฟเวอร์`);
});


client.on("message", async message => {
  
  if(message.author.bot) return;
  
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
    if(command === "เตะ"){
    
    const user = message.mentions.users.first();
    
    if (user) {
      
      const member = message.guild.member(user);
      
      if (member) {
        	      
		member.send("ท่านถูกเตะออกจากเซิฟเจ้าคะ");
        member.kick('ไม่มีเหตุผลเจ้าค่ะ').then(() => {  
          message.reply(`เตะท่าน ${user.tag} ออกจากห้องสําเร็จแล้วคะ`);
        }).catch(err => {
          
          message.reply('ขออภัยค่ะนายท่านฉันไม่สามารถเตะเค้าได้');
          
          console.error(err);
        });
      } else {
        
        message.reply('ไม่พบผู้ใช้ดังกล่าวในห้องนี้เจ้าคะ');
      }
    
    } else {
      message.reply('โปรดระบุคนที่จะเตะด้วยนะเจ้าค่ะ');
    }
  };
  
  if(command === "แบน"){
	  const user = message.mentions.users.first();
    
    if (user) {
      
      const member = message.guild.member(user);
      
      if (member) {
       
        member.ban({
          reason: 'นิสัยไม่ดีเจ้าค่ะ',
        }).then(() => {
          
          message.reply(`ทําการแบนท่าน ${user.tag} สําเร็จแล้วค่ะ`);
        }).catch(err => {
          
          message.reply('ขอโทษคะไม่สามารถแบนท่านนั้นได้');
          
          console.error(err);
        });
      } else {
        message.reply('เค้าไม่ได้อยู่ใน server นี้นะเจ้าค่ะ');
      }
    } else {
      message.reply('โปรดระบุตัวคนที่จะแบนด้วยเจ้าคะ');
    }
  };
  
  if(command === "เช็คปิง") {
    
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! ความเร็วสเฉลี่ยสู่ข้อมูลปลายทางคือ ${m.createdTimestamp - message.createdTimestamp}ms. ความเร็วสเฉลี่ยสู่ข้อมูลปลายทางของ API คือ  ${Math.round(client.ping)}ms เจ้าค่ะ`);
  }
  
  if(command === "พูด") {
    
    const sayMessage = args.join(" ");
    
    message.delete().catch(O_o=>{}); 
    
    message.channel.send(sayMessage);
  }
 
 




 if(command === "หวัดดี"){
	 return message.reply("สวัสดีค่ะนายท่าน");
  }
  
  if(command === "สหวัดดี"){
	 return message.reply("สวัสดีค่ะนายท่าน มีอะไรให้รับใช้ไหมคะ");
  }
  
  
  
  if(command === "ทำอะไรอยู่"){
	 return message.reply("คุยกับนายท่านไงเจ้าค่ะ");
  }
 
 
 
 
 
 
 
  if(command === "คู่มือ"){
	  return message.reply("ขณะนี้นายท่านสามารถใช้คําสั่งได้ดังนี้เจ้าค่ะ \n |ลบ เพื่อลบข้อความเก่าในช่องแชทค่ะ exe.|ลบ แล้วตามด้วยจํานวนข้อที่จะลบตั้่งแต่ 2-100 ค่ะ.  \n |เตะ   เอาไว้เตะคนออกจากห้องเจ้าค่ะ exe.|เตะ ตามด้วยการMentionค่ะ. \n |แบน   เอาไว้แบนคนออกจากห้องค่ะ  exe.|แบน ตามด้วยการMentionเจ้าค่ะ. \n |เช็คปิง เอาไว้ดูปืงภายในserverว่าเสถียรแค่ไหน exe.|เช็คปิง . \n |พูด เวลาที่นายท่านไม่อยากพูดเองให้ฉันแทนนายท่านได้เจ้าค่ะ exe.|พูด ตามด้วยข้อความที่จะให้ฉันพูดค่ะ \n และถ้านายท่านมีห้อง general อยู่ฉันก็จะไปต้อนรับแขกที่เข้ามาใหม่ที่ห้องนั้นค่ะ");
  }
  
  if(command === "ลบ") {
    
    const deleteCount = parseInt(args[0], 10);
    
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("โปรดใส่เลขระหว่าง 2 ถึง 100 นะเจ้าค่ะ");
    
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`ไม่สามารถลบข้อความข้างได้เพราะ : ${error}เจ้าคะ`));
  }
});



client.login(process.env.BOT_TOKEN)
