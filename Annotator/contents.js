
//highlighting
document.addEventListener('click', function (event) {
  const highlightedText = event.target;
  const highlightedElement = document.getElementsByClassName('highlight');
  for (let i = 0; i < highlightedElement.length; i++) {
    if(highlightedElement[i].classList.contains('active')){
      highlightedElement[i].classList.remove('active');
    }
  }
  var j=0;
  //we dont want to highlight the same text again 
  if (!document.querySelector('.hover-option-button') && highlightedText.classList.contains('highlight')) {
    for (j=0; j<highlightedElement.length; j++) {
      if(highlightedElement[j].innerHTML==highlightedText.innerHTML){
        console.log(highlightedText.innerHTML);
        highlightedElement[j].classList.add('active');
        break;
      }
    }
    
    let div = document.createElement('div');
    document.body.appendChild(div);
    div.classList.add('main');

    //buttons
    let paintButton = document.createElement('img');
    let noteButton = document.createElement('img');
    let deleteButton = document.createElement('img');
    paintButton.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM2kZn9T0d-vKwz5jMkPx1ik23rLeMejLtHA&s';
    noteButton.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wJxm0GPtZwgDyEjJ0lP2VlWQn3HbGCzrPA&s';
    deleteButton.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NwmH4k2nx9NtfSVweYSAQ_10hw1GggdEwg&s';
    
    div.appendChild(paintButton);
    div.appendChild(noteButton);
    div.appendChild(deleteButton);
    
    paintButton.classList.add('hover-option-button-hover');
    noteButton.classList.add('hover-option-button-hover');
    deleteButton.classList.add('hover-option-button-hover');


    //the options menu upon highlighting
    var box = highlightedElement[j].getBoundingClientRect();
    var pX = box.left + (window.pageXOffset || document.documentElement.scrollLeft);
    var pY = box.top + (window.pageYOffset || document.documentElement.scrollTop);
    div.style.position = 'absolute';
    div.style.top = `${pY+30}px`; 
    div.style.left = `${pX+30}px`; 

    //Hovering
    document.addEventListener('click', () => {
      if(div){
        div.remove();
      }
      },{ 
        once:true 
    });
    let buttonToggle = 0;
    if(buttonToggle){
      buttonToggle=0;
      document.getElementsByClassName('hover-option-button-hover')[2].click();
    }

    // Button to change color of highlight 
    paintButton.addEventListener('click',()=>{
      let pallette = document.createElement('div');
      pallette.classList.add('main2');
      let colors = ['#FFDC74', '#FBAC87', '#F3A6C8', '#AEB5FF', '#81E3E1', '#95C8F3', '#B3E561'];
      let buttons = [];
      //color pallete
      for (let i = 0; i < colors.length; i++) {
        let button = document.createElement('div');
        pallette.appendChild(button);
        button.style.backgroundColor = colors[i];
        button.classList.add('hover-option-button');
        buttons.push(button);
      }
      
      pallette.style.position = 'absolute';
      pallette.style.left = `${pX + 30}px`;
      pallette.style.top = `${pY + 30}px`;

      document.body.appendChild(pallette);

      //i might remove the enlargement
      pallette.focus();
      div.remove();

      document.addEventListener('click', (e) => {//might be wise to use async/nameless
        if (pallette && !div.contains(e.target) && e.target!=highlightedElement[j]) {
          highlightedElement[j].classList.remove('active');
          pallette.remove();
        }
      });



      var searchHighlight = JSON.parse(localStorage.getItem('highlights')) || [];

      //colour toggling
      searchHighlight.forEach((a,b) => {
      if(a.url==window.location.href && a.text==highlightedText.innerHTML){
        const match = document.getElementsByClassName('highlight');
        for (let i = 0; i < match.length; i++) {
          var d = match.item(i);
          if(d.innerHTML==a.text){
            break;
          } 
        }
        const chosenColour = document.getElementsByClassName('hover-option-button');
        for(let j=0; j< chosenColour.length ; j++){
          if(chosenColour[j].style.backgroundColor==d.style.backgroundColor){
            chosenColour[j].style.border = "2px solid white";
            break;
          }
        }
        
        //setting colors to the highlight
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener('click', () => {
            const color = buttons[i].style.backgroundColor;
            d.style.backgroundColor = color;
            searchHighlight[b].colour = color;
            localStorage.setItem('highlights', JSON.stringify(searchHighlight));
          });
        }
        return;
      }
      });
    });



    //highlighting sorted, note add now
    noteButton.addEventListener('click', function () {
      div.remove();
      const searchHighlights2 = JSON.parse(localStorage.getItem('highlights')) || [];
      searchHighlights2.forEach((a,b) => {
      if(a.url==window.location.href && a.text==highlightedText.innerHTML && a.textarea==0){
        searchHighlights2[b].textarea=1;
        localStorage.setItem('highlights', JSON.stringify(searchHighlights2));
        let textDiv = document.createElement('textarea');
        textDiv.classList.add('hover-textarea');
      
        textDiv.style.position = 'absolute';
        textDiv.style.top = `${pY+30}px`;
        textDiv.style.left = `${pX+30}px`;
        
        textDiv.value = searchHighlights2[b].textareaText;
      
        document.body.appendChild(textDiv);
        
        textDiv.focus();
        textDiv.addEventListener('blur', () => {
          searchHighlights2[b].textareaText=textDiv.value;
          textDiv.remove();
          searchHighlights2[b].textarea=0;// ye tha error
          localStorage.setItem('highlights', JSON.stringify(searchHighlights2));
        });
      };
    });
      return;
    });


    //Deletion
    deleteButton.addEventListener('click',()=>{
      div.remove(); 
      //confirmation
      deleteTrue = confirm("Are you sure?");
      var searchHighlights3 = JSON.parse(localStorage.getItem('highlights')) || [];
      searchHighlights3.forEach((a,b) => {
      if(a.url==window.location.href && a.text==highlightedText.innerHTML && deleteTrue){
        const match = document.getElementsByClassName('highlight');
        for (let i = 0; i < match.length; i++) {
          //similar code to adding the note
          var d = match.item(i);
          if(d.innerHTML==a.text){
            d.style.backgroundColor = 'transparent';
          } 
        }


        searchHighlights3.splice(b,1);
        //save to local storage array!!
        localStorage.setItem('highlights', JSON.stringify(searchHighlights3));


        highlightedElement[j].classList.remove('active');
        return;
      }
      });
    });
  }
});


function highlightText(colour) {
  const url = window.location.href;
  const select = window.getSelection();

  if (!select.rangeCount) return;
  var len = select.toString().length;

  const range = select.getRangeAt(0);
  var parentElement = range.commonAncestorContainer;
  if (parentElement.nodeType === Node.TEXT_NODE) {
    parentElement = parentElement.parentNode;
  }
  
  function position(range, parentElement) {
    var text = parentElement.innerHTML.toString();
    //first bit
    var text1 = '';
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      text1 = range.startContainer.nodeValue;
    } else {
      text1 = range.startContainer.outerHTML || range.startContainer.innerHTML;
    }
    text1 = text1.toString();
    while(text1[text1.length-1]==" " || text1[text1.length-1]==String.fromCharCode(160)){
      text1 = text1.substring(0,text1.length-1);
    }
    while(text1[0]==" " || text1[0]==String.fromCharCode(160)){
      text1 = text1.substring(1,text1.length-1);
    }
    //second bit
    var text2 = '';
    if (range.endContainer.nodeType === Node.TEXT_NODE) {
      text2 = range.endContainer.nodeValue;
    } else {
      text2 = range.endContainer.outerHTML || range.endContainer.innerHTML;
    }
    text2 = text2.toString();
    while(text2[text2.length-1]==" " || text2[text2.length-1]==String.fromCharCode(160)){
      text2 = text2.substring(0,text2.length-1);
    }
    while(text2[0]==" " || text2[0]==String.fromCharCode(160)){
      text2 = text2.substring(1,text2.length-1);
    }
    
    
    var startOffset = range.startOffset;
    var text3 = text;


    var flag=0;
    for(let i=0;i<text.length;i++){
      if(text[i]=='<'){
        flag=1;
      } 
      else if(text[i]=='>'){
        flag=0;
      } 
      if(i==text.indexOf(text1) && flag==1){
        startOffset+=text.indexOf(text1)+text1.length;
        text=text.substring(text.indexOf(text1)+text1.length,text.length);
        i=0;
      }
      else if(i==text.indexOf(text1) && flag==0){
        startOffset+=i;
        break;
      }
    }
  
    text=text3;
    var arr = [...text.matchAll('<span class="highlight"[^>]+>')];
    for(let j=0;j<arr.length;j++){
      startOffset-=arr[j].toString().length;
      startOffset-=7;
    }
    var endOffset = startOffset+len;
    return {
        startOffset,endOffset
    };
}

 
  var offsets = position(range, parentElement);
  const start = getXPath(range.startContainer);
  const end = getXPath(range.endContainer);
  const positionOfHighlight = {
    //starting
    startContainerXPath: start,
    startOffset: offsets.startOffset,

    //ending
    endContainerXPath: end,
    endOffset: offsets.endOffset
  };
  

  const span = document.createElement('span');
  span.style.backgroundColor = colour;
  span.className = 'highlight';

  const range1 = range.cloneContents();
  span.appendChild(range1);

  range.deleteContents();
  range.insertNode(span);

  var spanText = span.innerHTML;
  saveHighlight(colour,url,spanText,range,positionOfHighlight);
}


//PERSISTENCE
function saveHighlight(colour,url,text,range,highlight) {
const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
highlights.push({
    colour : colour,
    url: url,
    parentXPath: getXPath(range.commonAncestorContainer),
    textarea : 0,
    textareaText : "Add Note",
    text: text,
    startOffset: highlight.startOffset,
    endOffset: highlight.endOffset,
    innerText : range.toString(),
    id: new Date().toString(),
});
localStorage.setItem('highlights', JSON.stringify(highlights));
}


function getXPath(element) {

const paths = [];
for (; element && element.nodeType == 1; element = element.parentNode) {
    let i = 0;
    for (let j = element.previousSibling; j; j = j.previousSibling) {
      if (j.nodeType == Node.DOCUMENT_TYPE_NODE){
        continue;
      }
      if (j.nodeName == element.nodeName){
        ++i;
      }
    }
    const lowerName = element.nodeName.toLowerCase();
    const currentI = (i ? `[${i + 1}]` : '');

    //isko dubara check kr
    paths.splice(0, 0, lowerName + currentI);
}
return paths.length ? '/' + paths.join('/') : null;
}

  const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
  highlights.forEach(i => {
    if(i.url==window.location.href){
      restoreHighlight(i);
    }
  });


// Function to restore highlights
function restoreHighlight({colour, text, startOffset, parentXPath}) {
  const parent = document.evaluate(parentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!parent){
    return;
  } 
  if(startOffset<0){
    startOffset=0;
  } 
    var textPart = parent.innerHTML;
    var arr = [...textPart.matchAll('<span class="highlight"[^>]+>')];
    for(let j=0;j<arr.length;j++){
      startOffset+=arr[j].toString().length+7;
    }
    
    var starter = startOffset;
    if(text[0]=='<' || text[1]=='<'){
      while((textPart[startOffset]!='<' && textPart[startOffset]!='>') && startOffset>0){
        startOffset--;
      }
    }
    var starterStarter = starter-startOffset;
    if(textPart[startOffset]=='>' && (text[0]=='<' || text[1]=='<') && starter>startOffset){
      while(textPart[startOffset]!='<' && startOffset>0){
        startOffset--;
      }
      starterStarter=starter-startOffset-starterStarter;
      startOffset = starter;
      let tagTemp = text.match("<[a-zA-Z]");
      let tagCurr = tagTemp.toString();
      tagCurr= tagCurr.substring(1,tagCurr.length);
      textPart = textPart.substring(0, startOffset) +"</"+tagCurr+">"+"<span class='highlight' style='background-color:"+colour+"'>"+text+"</span> "+textPart.substring(text.length+startOffset-starterStarter-1,textPart.length);
    }

    else{
      if(textPart[startOffset-1]==text[0]){
        startOffset--;
      } 
      issue=0;

      for(let i=text.length+startOffset;i<textPart.length-1;i++){
        if(textPart[i]=='<' && textPart[i+1]!='/') break;
        else if(textPart[i]=='<' && textPart[i+1]=='/'){
          issue=1;
          var tagTemp = textPart.substring(i,i+10).match("<[^<]+>").toString();
          var arr = [...text.matchAll('<'+tagTemp.substring(2,tagTemp.length-1)+'[^>]+>')];
          
        }
      }
      
      if(issue){
        textPart = textPart.substring(0, startOffset) +"<span class='highlight' style='background-color:"+colour+"'>"+text+"</span>"+arr[arr.length-1]+textPart.substring(text.length+startOffset-tagTemp.length,textPart.length);
      } 
      else{
        textPart = textPart.substring(0, startOffset) +"<span class='highlight' style='background-color:"+colour+"'>"+text+"</span>"+textPart.substring(text.length+startOffset,textPart.length);
      } 
    }
    //ye mt bhul
    parent.innerHTML = textPart;

}

chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});

chrome.runtime.onMessage.addListener((msg,sender, res) => {
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    var temp = [];
    const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
    highlights.forEach(h => {
      if(h.url==window.location.href){
        temp.push(h);
      } 
    });
    res(temp);
  }
});

//Shortcut keys
chrome.runtime.onMessage.addListener(function(req) {
  if (req.action === "toggle_highlight") {
    highlightText("#FFDC74");
  } else if (req.action === "clear_highlights") {
    deleteHighlight();
  }
});



async function deleteHighlight() {
  const highlights2 = document.getElementsByClassName('highlight');
  for (let i = 0; i < highlights2.length; i++) {
    if(highlights2[i].classList.contains('active')){
      buttonToggle=3;
      await highlights2[i].click();
      break;
    }
  }
  
}
