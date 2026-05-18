  <script>
    const cover = document.getElementById("cover");
    const leftDoor = document.getElementById("leftDoor");
    const rightDoor = document.getElementById("rightDoor");
    const bgm = document.getElementById("bgm");
    const musicBtn = document.getElementById("musicBtn");
    const introPage = document.getElementById("introPage");

    let introClosed = false;
    let touchStartY = 0;

    introPage.addEventListener("wheel", closeIntroPage);

    introPage.addEventListener("touchstart", (event) => {
      touchStartY = event.touches[0].clientY;
    });

    introPage.addEventListener("touchmove", (event) => {
      const touchCurrentY = event.touches[0].clientY;
      if (touchStartY - touchCurrentY > 30) {
        closeIntroPage();
      }
    });

    function closeIntroPage() {
      if (introClosed) return;

      introClosed = true;
      introPage.style.transform = "translateY(-100%)";
      introPage.style.opacity = "0";

      setTimeout(() => {
        introPage.style.display = "none";
        startAutoScroll();
      }, 1200);
    }

    cover.addEventListener("click", async () => {

      setTimeout(() => {
        leftDoor.style.transform = "translateX(-100%)";
        rightDoor.style.transform = "translateX(100%)";
      }, 250);

      setTimeout(() => {
        cover.style.transition = "opacity 0.6s ease";
        cover.style.opacity = "0";
      }, 1200);

      setTimeout(() => {
        cover.style.display = "none";
      }, 1800);

      try {
        await bgm.play();
        musicBtn.textContent = "❚❚";
      } catch (e) {}
    });

    musicBtn.addEventListener("click", async () => {
      if (bgm.paused) {
        await bgm.play();
        musicBtn.textContent = "❚❚";
      } else {
        bgm.pause();
        musicBtn.textContent = "♫";
      }
    });

    const weddingDate = new Date("2026-06-21T19:00:00");

    function updateCountdown() {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) return;

      document.getElementById("days").textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
      document.getElementById("hours").textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
      document.getElementById("minutes").textContent = Math.floor((diff / (1000 * 60)) % 60);
      document.getElementById("seconds").textContent = Math.floor((diff / 1000) % 60);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

   let autoScroll = true;
const scrollSpeed = 0.20;

function startAutoScroll() {
  autoScroll = true;

  function step() {
    if (!autoScroll) return;

    window.scrollBy(0, scrollSpeed);

    const atBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

    if (!atBottom) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

    window.addEventListener("wheel", () => autoScroll = false);
    window.addEventListener("touchstart", () => autoScroll = false);

    function openGuestForm() {
      document.getElementById("guestModal").style.display = "flex";
    }

    function closeGuestForm() {
      document.getElementById("guestModal").style.display = "none";
    }
    function generatePDF() {
  const name = document.getElementById("guestName").value.trim();
  const count = document.getElementById("guestCount").value.trim();

  if (!name || !count) {
    alert("请填写姓名和人数");
    return;
  }

  const pdfWindow = window.open("", "_blank");

  pdfWindow.document.write(`
    <!DOCTYPE html>
    <html lang="zh">
    <head>
      <meta charset="UTF-8">
      <title>${name}-婚礼请帖</title>
      <style>
        body {
          margin: 0;
          background: #fff8f0;
          font-family: "Microsoft YaHei", "SimSun", sans-serif;
        }

        .invite {
          width: 794px;
          height: 1123px;
          margin: 0 auto;
          padding: 80px 60px;
          border: 18px solid #b03141;
          color: #5a3b32;
          text-align: center;
          box-sizing: border-box;
        }

        h1 {
          color: #b03141;
          font-size: 42px;
          margin-top: 40px;
        }

        h2 {
          font-size: 36px;
          margin: 40px 0 20px;
        }

        h3 {
          color: #b03141;
          font-size: 30px;
          margin: 35px 0;
        }

        p {
          font-size: 22px;
          line-height: 2;
        }

        .divider {
          width: 140px;
          height: 3px;
          background: #b03141;
          margin: 45px auto;
        }

        .footer {
          margin-top: 80px;
          font-size: 20px;
        }

        @media print {
          body {
            background: white;
          }

          .invite {
            margin: 0;
            width: 100%;
            height: 100vh;
          }
        }
      </style>
    </head>
    <body>
      <div class="invite">
        <h1>正式婚礼请帖</h1>

        <p>诚挚邀请</p>

        <h2>${name}</h2>

        <p>携 ${count} 位嘉宾</p>

        <div class="divider"></div>

        <p>参加我们的婚礼典礼</p>

        <h3>新郎名字 & 新娘名字</h3>

        <p>时间：2026年6月21日 19:00</p>
        <p>地点：请填写酒店名称</p>

        <p class="footer">
          感谢你的见证与祝福<br>
          我们在婚礼现场等你
        </p>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 500);
        };
      <\/script>
    </body>
    </html>
  `);

  pdfWindow.document.close();
}
  </script>
