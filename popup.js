document.getElementById("start").addEventListener("click", function() {
  chrome.tabs.create({ url: 'visualizer.html' });
});
