let best = [
    "🥅",
    "💛",
    "💙",
    "💪",
    "👏",
    "👍",
    "👉",
    "👀",
    "😁",
    "😍", 
    "😃",
    "😉",
    "⚽",
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟",
    "🤩",
    "😱",
    "😎",
    "⬇️",
    "⬆️",
    "🔝",
]

for (emoji of best){
    let obj = {
        "emoji": emoji,
        "description": "",
        "aliases": [],
        "tags": []
    }
    console.log(obj);
    console.log(",");
}