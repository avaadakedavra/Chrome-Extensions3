var contextList=["selection","link","image","page"];


for(var i=0; i<contextList.length; ++i){
chrome.contextMenus.create({
  title: "Share this on twitter",
  contexts: [contextList[i]],
  onclick: tweetIt,
  id: contextList[i]
});
}
function tweetIt(data,tab){
  var tweetLink="https://twitter.com/intent/tweet?text=";
  switch(data.menuItemId){
    case "selection":
      var selectedText=data.selectionText;
      if(selectedText.length<=140)
        chrome.windows.create({url: tweetLink+encodeURIComponent(selectedText),type:"panel" });
      else
        alert("The text selected exceeds 140 characters. Select less!");
      break;
    case "link":
      chrome.windows.create({url: tweetLink+encodeURIComponent(data.linkUrl),type:"panel" });
      break;
    case "image":
      chrome.windows.create({url: tweetLink+encodeURIComponent(data.srcUrl),type:"panel" });
      break;
    case "page":
      chrome.windows.create({url: tweetLink+encodeURIComponent(tab.title)+"&url="+data.pageUrl,type:"panel" });
      break;
  }
}
