document.addEventListener("DOMContentLoaded", function() {

    var SkipButton = document.getElementById("SkipButton");
    SkipButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: SkipVideo
            });
        });
    
    });

    
    
    // var SkipVideoBtn = document.getElementById("SkipVideo");
    
    // SkipButton.addEventListener("click", () => {
    //     SkipButton();
    // });
    
    
    function SkipVideo() {
        let buttons = document.getElementsByClassName("css-4a32g3");
        if (buttons.length > 1) {
            buttons[1].click();
        } else {
            console.warn("Skip button not found!");
        }
    }

});


