document.getElementById("myButton").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          function SkipVideo() {
            var durationDisplay = document.getElementsByClassName("duration-display")[0];

            var currentVideoTime = document.getElementsByClassName("current-time-display")[0];

            if (durationDisplay && currentVideoTime) {
              // Kiểm tra khác null
              var durationText = durationDisplay.innerText;
              var currentTimeText = currentVideoTime.innerText;
              var playButton = document.getElementsByClassName("rc-PlayToggle")[0];

              var duration = parseTime(durationText);
              var currentTime = parseTime(currentTimeText);

              var remainingTime = duration - currentTime;
              for (i = 0; i < remainingTime - 0.1*remainingTime; i += 10) {
                // console.log(i);
                let buttons = document.getElementsByClassName("css-f0pscy");
                if (buttons.length > 1) {
                  buttons[1].click();
                } else {
                  console.warn("Skip button not found!");
                }
              }
              playButton.click();
              playButton.click();
              console.log("Remaining time: " + remainingTime + " seconds");
              // Thực hiện hành động bỏ qua video ở đây, ví dụ:
              // video.currentTime = duration - 5; // Tua đến 5 giây trước khi hết video
            } else {
              console.error("Không tìm thấy thời gian video.");
            }
          }

          function parseTime(timeString) {
            if (!timeString) return 0; // Xử lý trường hợp timeString null hoặc undefined
            var parts = timeString.split(":");
            return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
          }

          function getElementByXpath(path) {
            return document.evaluate(
              path,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
          }

          SkipVideo(); // Gọi SkipVideo() sau khi đã định nghĩa các hàm
        },
      });
    } else {
      console.error("Không tìm thấy tab hoạt động.");
    }
  });
});
