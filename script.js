<script>
    const cover = document.getElementById("cover");
    const leftDoor = document.getElementById("leftDoor");
    const rightDoor = document.getElementById("rightDoor");
    const leftPerson = document.getElementById("leftPerson");
    const rightPerson = document.getElementById("rightPerson");
    const bgm = document.getElementById("bgm");
    const musicBtn = document.getElementById("musicBtn");

    cover.addEventListener("click", async () => {
      leftPerson.style.transform = "translateX(-80px) rotate(-15deg)";
      rightPerson.style.transform = "translateX(80px) scaleX(-1) rotate(-15deg)";

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
        startAutoScroll();
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

    function startAutoScroll() {
      function step() {
        if (!autoScroll) return;
        window.scrollBy(0, 0.20);

        if (window.innerHeight + window.scrollY < document.body.scrollHeight - 2) {
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

        .flower-frame {
  position: absolute;
  inset: 25px;
  border: 2px solid rgba(255, 218, 150, 0.75);
  border-radius: 20px;
  z-index: 12;
  pointer-events: none;
}

.flower {
  position: absolute;
  font-size: 48px;
  animation: flowerFloat 3s ease-in-out infinite;
}

.top-left {
  top: -18px;
  left: -10px;
}

.top-right {
  top: -18px;
  right: -10px;
}

.bottom-left {
  bottom: -18px;
  left: -10px;
}

.bottom-right {
  bottom: -18px;
  right: -10px;
}

@keyframes flowerFloat {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.08) rotate(8deg);
  }
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

        <h3>白少维 & 许梓柔</h3>

        <p>时间：2026年6月21日 19:00</p>
        <p>新江河鱼酒楼：62, Jalan Sultan Azlan Shah, 31400 Ipoh, Perak</p>

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
