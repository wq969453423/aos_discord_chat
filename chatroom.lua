--[[
Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
Date: 2024-05-26 15:43:56
LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
LastEditTime: 2024-05-27 00:32:53
FilePath: \ao\chatroom.lua
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
--]]
local json = require("json")


SendDiscordLists = SendDiscordLists or {}


Colors = {
    red = "\27[31m",
    green = "\27[32m",
    blue = "\27[34m",
    reset = "\27[0m",
    gray = "\27[90m"
}

Members = Members or {}

Handlers.add(
  "Register",
  Handlers.utils.hasMatchingTag("Action", "Register"),
  function (msg)
    table.insert(Members, msg.From)
    Handlers.utils.reply("registered")(msg)
  end
)

Handlers.add(
  "Broadcast",
  Handlers.utils.hasMatchingTag("Action", "Broadcast"),
  function (msg)
    Broadcast(msg)
  end
)


Handlers.add(
  "BroadcastDiscord",
  Handlers.utils.hasMatchingTag("Action", "BroadcastDiscord"),
  function (msg)
    BroadcastDiscord(msg)
  end
)


Handlers.add(
  "Announcement",
  Handlers.utils.hasMatchingTag("Action", "Announcement"),
  function (msg)
    print(Colors.green..msg.Event..Colors.red.." : "..Colors.reset.. msg.Data)
  end
)

function BroadcastDiscord(msg)
    for _, recipient in ipairs(Members) do
        ao.send({Target = recipient,Action = "Announcement", Data = msg.Data,Event=msg.Event})
    end
end

function Broadcast(msg)
    local fromText
    for _, recipient in ipairs(Members) do
        if #msg.From>10 then
            local firstFour = string.sub(msg.From, 1, 4)
            local lastFour = string.sub(msg.From, -4)
            fromText=firstFour.."...."..lastFour
        end
        ao.send({Target = recipient,Action = "Announcement", Data = msg.Data,Event=fromText})
    end
    ao.send({Target = ao.id,Action = "SendDiscordMsg", Data = msg.Data,Event=fromText,OriginatingFrom=msg.From})
end

Handlers.add(
  "SendDiscordMsg",
  Handlers.utils.hasMatchingTag("Action", "SendDiscordMsg"),
  function (msg)
    -- table.insert(SendDiscordLists,{From=msg.OriginatingFrom,Data=msg.Date,Event=msg.Event})
  end
)




