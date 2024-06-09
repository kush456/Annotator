
const setDOMInfo = info => {
 
 
  for(let i=0;i<info.length;i++){
    
    let div1 = document.createElement('div');
    let span = document.createElement('span');
    let p = document.createElement('p');
    div1.classList.add('HighlightedText');
    div1.setAttribute("id",info[i].id.toString()+"*");
    
    p.innerText = info[i].innerText+'\n\nNote: '+info[i].textareaText;
    
    
    div1.appendChild(p);
    div1.appendChild(span);
    document.body.appendChild(div1);
  };
  attachEventListeners();
};


const attachEventListeners = () => {
  const bts = document.getElementsByClassName('bt');
  for (let i = 0; i < bts.length; i++) {
    bts[i].addEventListener("click", () => {
      let doc = document.getElementById(bts[i].getAttribute('id').toString() + "*");
      let value = doc.querySelector('p').innerText;
      navigator.clipboard.writeText(value);
    });
  }

  const keywordInput = document.getElementById('keyword');
  if (keywordInput) {
    keywordInput.addEventListener('input', searchDivs);
  }

  const dateSelect = document.getElementById('dateSelect');
  if (dateSelect) {
    dateSelect.addEventListener('change', sortDivs);
  }

  const download = document.getElementById('download');
  if (download) {
    download.addEventListener('click', popup);
  }
};




window.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        setDOMInfo);
  });
});




async function popup(){
    document.body.style.fontSize='20px';
    document.getElementsByClassName('navbar')[0].style.display = 'none';
    let d = document.getElementsByClassName('bt');
    for(let i=0;i<d.length;i++) d[i].style.visibility = "hidden";
    await html2pdf().from(document.body).save('output.pdf');
    for(let i=0;i<d.length;i++) d[i].style.visibility = "visible";
    document.getElementsByClassName('navbar')[0].style.display = 'flex';
    document.body.style.fontSize='';
}




function searchDivs() {
  
  const keyword = document.getElementById('keyword').value.toLowerCase();
  const divs = document.getElementsByClassName('HighlightedText');
  for (let i = 0; i < divs.length; i++) {
      const div = divs[i].querySelector('p');
      console.log(div);
      if (div.innerText.toLowerCase().includes(keyword)) {
          divs[i].classList.remove('hide');
      } else if(keyword !="") {
          divs[i].classList.add('hide');
      }
  }
}

function sortDivs() {
  const selected = document.getElementById('dateSelect').value;
  if(selected == 'Date'){
    document.body.innerHTML = document.getElementsByClassName('navbar')[0].outerHTML;
    
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup', subject: 'DOMInfo'},
          setDOMInfo);
    });
  }



  else if(selected=='style'){
    const divs = document.getElementsByClassName('HighlightedText');
    var temp = Array.from(divs);
    function getBackgroundColor(element) {
      return window.getComputedStyle(element).backgroundColor;
    }
    const sortedDivs = temp.sort((a, b) => {
        const colorA = getBackgroundColor(a);
        const colorB = getBackgroundColor(b);
        return colorA.localeCompare(colorB);
    });
    const body = document.body;
    sortedDivs.forEach(div => body.appendChild(div));
  }
}


