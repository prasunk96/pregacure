nlp = window.nlp_compromise;

var messages = [], 
  lastUserMessage = "", 
  botMessage = "", 
  botName = 'Pregnancy Chatbot', 
  talking = true; 

function chatbotResponse() {
  talking = true;
  botMessage = "I don't have the answer right now. Sorry for the inconvinience caused. You query will be resolved shortly. Thank You";

  if (lastUserMessage.toLowerCase() === 'hi' || lastUserMessage.toLowerCase() =='hello') {
    const hi = ['hi','hey','hello']
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  }

  if (lastUserMessage.toLowerCase() === 'name'||lastUserMessage.toLowerCase() === 'who are you'||lastUserMessage.toLowerCase() === 'what are you') {
    botMessage = 'My name is ' + botName+'. I am here to solve your queries';
  }
  
  
  if (lastUserMessage.toLowerCase() === 'am i in labor' || lastUserMessage.toLowerCase()=='labor pain') {
    botMessage = 'If you are having contractions and if your back hurts and if your water breaks frequently the you are definitely in labor. You should meet your doctor';
  }
  if (lastUserMessage.toLowerCase() === 'what is my delievery date' || lastUserMessage.toLowerCase()=='delievery date') {
    botMessage = 'You should have known this !';
  }
  if (lastUserMessage.toLowerCase() === 'how do i know i am pregnant' || lastUserMessage.toLowerCase()=='am i pregnant') {
    botMessage = 'Wondering if you’re pregnant? A pregnancy test is the way to know for sure. But what if it’s too soon for accurate results? You may notice some subtle signs of pregnancy—fatigue, nausea, frequent urination, aversions to foods that you normally love, morning sickness, breast swelling and tenderness, and a missed period if you are very regular with menstruation.';
  }
  if (lastUserMessage.toLowerCase() === 'should i go for a prenatal checkup' || lastUserMessage.toLowerCase()=='prenatal checkup') {
    botMessage = 'A lot will happen at your first prenatal visit and it’s best to be ready for a lengthy appointment with your Doctor';
  }
  if (lastUserMessage.toLowerCase() === 'vitamins that i should i take' || lastUserMessage.toLowerCase()=='vitamins') {
    botMessage = 'Rather than just selecting a prenatal vitamin yourself, talk to your doctor or midwife about if you need a special formulation (i.e., in cases of anemia or nutritional deficiencies), and if a tablet, capsule, or liquid prenatal vitamin will work most efficiently';
  }
  
    if (lastUserMessage.toLowerCase() === 'symptoms' || lastUserMessage.toLowerCase()=='pregnancy symptoms') {
    botMessage = 'Slight Bleeding,Swollen Breasts,Mood Swings,Headaches,Vomiting etc';
  }
    if (lastUserMessage.toLowerCase() === 'stretch marks' || lastUserMessage.toLowerCase()=='i have got stretch marks') {
    botMessage = '90% of women get stretch marks during pregnancy.You can remove it by drinking lot of water';
  }
    if (lastUserMessage.toLowerCase() === 'fitness activities' || lastUserMessage.toLowerCase()=='exercise') {
    botMessage = 'Aqua aerobics, walking, jogging (if you did it before your pregnancy), yoga, Pilates, tai chi, and dance are all totally safe';
  }
    if (lastUserMessage.toLowerCase() === 'diet' || lastUserMessage.toLowerCase()=='what should i eat') {
    botMessage = 'meat, poultry, fish, eggs, beans, tofu, cheese, milk and nuts, Krieger';
  }
    if (lastUserMessage.toLowerCase() === 'gynacologist') {
    botMessage = 'A doctor dealing with pregnancy';
  }
    if (lastUserMessage.toLowerCase() === 'is it really safe to have sex during pregnancy' || lastUserMessage.toLowerCase()=='sex during pregnancy') {
    botMessage = 'Most women who are having a normal pregnancy may continue to have sex right up until their water breaks or they go into labor.';
  }
    if (lastUserMessage.toLowerCase() === 'is it safe to travel while pregnant' || lastUserMessage.toLowerCase()=='travel during pregnancy') {
    botMessage = 'Travelling up to the end of your second trimester is fine.';
  }
   if (lastUserMessage.toLowerCase() === 'difficluties in pain' || lastUserMessage.toLowerCase()=='how difficult is labor pain') {
    botMessage = 'This pain can be felt as strong cramping in the abdomen, groin, and back, as well as an achy feeling. Some women experience pain in their sides or thighs as well.';
  }
  
  
  
  

}
function newEntry() {
  if (document.getElementById("chatbox").value != "") {
    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    messages.push("<b>Me: </b> " +lastUserMessage);
    chatbotResponse();
    messages.push("<b>" + botName + ":</b> " + botMessage); 
    Speech(botMessage);
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    speechSynthesis.speak(utterance);
  }
}
document.onkeypress = keyPress;
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {    newEntry();
  }
  if (key == 38) {
    console.log('hi')
    }
}

function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}