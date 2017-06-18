/**
 * Get the current window URLs.
 *
 * @param {function(string)} callback - called when the URL of the tabs
 *   are found.
 */
function getTabUrls(callback) {
  var queryInfo = {
  //  active: true,
    currentWindow: true
  };
//query all tabs in current window and store urls of each
  chrome.tabs.query(queryInfo, function(tabs) {
    console.log(tabs);
    var url=[];
    for(var i=0;i<tabs.length;i++){
      url[i]=tabs[i].url;
    }
    console.log(url);
    callback(url);
  });

}



document.addEventListener('DOMContentLoaded', function() {
  getTabUrls(function(url) {

    document.getElementById('no_of_tabs').textContent =url.length;

      for(var i=0;i<url.length;i++){
        var li=document.createElement("li");
        li.innerHTML="<a href="+url[i]+">"+url[i]+"</a>";
        document.getElementById('tab_list').appendChild(li);
        console.log("happening");
}
});
});

document.getElementById('save').addEventListener("click",function(){
  getTabUrls(function(url){
  var key=new Date();
  console.log(key);
  //TODO: store multiple sessions with attribute;
  //var no_of_sess=chrome.storage.local.getItem('no_of_sess');
  //if (no_of_sess==null)
    //chrome.storage.local.setItem('no_of_sess',0);
  //no_of_sess=chrome.storage.local.getItem('no_of_sess');


// store the session urls in local storage
  chrome.storage.local.set({session_url:url},function(){console.log("Session Urls saved");
  chrome.storage.local.get(function(url) {
            console.log(url);
          });});

});
});

document.getElementById('open').addEventListener("click",function(){
  //get saved session urls from storage
    chrome.storage.local.get('session_url',function(obj){
    console.log(obj);
    var urls= obj.session_url;
    console.log(urls);
    //iterate over the url list and create new tabs
    for(var i=0;i<urls.length;i++){
      chrome.tabs.create({url:urls[i]},function(){
        console.log(urls[i]+ "opened in new tab.");
      });
    }
  });
  });

document.getElementById('view').addEventListener('click',function(){
  //show-hide the tab list
  var x = document.getElementById('tab_list');
   if (x.style.display === 'none') {
       x.style.display = 'block';
   } else {
       x.style.display = 'none';
   }
  });
