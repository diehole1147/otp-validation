let OTP_number;
let wrap = document.querySelector(".wrap");
let descrption = document.querySelector(".desc");
let emailArea = document.querySelector(".emailarea");
let mailId = document.querySelector(".mailid");
let form1 = document.querySelector(".form1");
let btn = document.querySelector(".buttn");
let otp = document.querySelector(".otp");
let errorbox = document.getElementById("errorbox")
const errorSound = new Audio("https://www.myinstants.com/media/sounds/faahhhhhh.mp3");
errorSound.preload = "auto";
errorSound.volume = 1;

const now = new Date();
const plus15 = new Date(now.getTime() + 15 * 60 * 1000);

  form1.addEventListener("submit", async(e) => {
    e.preventDefault();
    OTP_number = await OTPSend();
  });

function OTPSend(){
  let pass_code = random4Digits();
  console.log(pass_code);
  // emailjs.init("97OG0GUasGGddrBxu");

  // form.addEventListener("submit", async (event) => {
    // event.preventDefault();

    // try {
      // const res = await emailjs.send("otp_service", "otp_template", {
      //   passcode: pass_code,
      //   time: plus15.toLocaleString();,
      //   email: emailInput.value, // must match your EmailJS template variable name
      // });
            otp.innerHTML = `<div class="desc">Enter the OTP sent to <span style="color:#68E1FD;">${mailId.value}</span></div>
          <form id="form" class="form2">
            <div class="mail2">
          <div class="number-cont">
      <input inputmode="numeric" type="tel" class="otp-input" maxlength="1" autofocus required>
      <input inputmode="numeric" type="text" class="otp-input" maxlength="1" required >
      <input inputmode="numeric" type="text" class="otp-input" maxlength="1" required>
      <input inputmode="numeric" type="text" class="otp-input" maxlength="1" required>
      </div>
          <button id="buttn" class="buttn" type="submit">Send OTP</button>
        </div>
        </form>
      </div>`
      
  //   } catch (err) {
  //     btn.value = "Send OTP";
  //     console.error("EmailJS error:", err);
  //   }
  // });
  const form2 = document.querySelector(".form2");
  let numb_cont = document.querySelector(".number-cont");
numb_cont.addEventListener("input", (e) => otpAutoTab(e, numb_cont));
numb_cont.addEventListener("keydown", (e) => otpAutoClear(e, numb_cont));
form2.addEventListener("submit", (e) => otpValidation(e));
return pass_code;
}

function otpValidation(e){
  const otp_string = [...document.querySelectorAll(".number-cont .otp-input")]
  .map(i => i.value)
  .join("");
  console.log(otp_string);
  if(otp_string == OTP_number){
    window.location.assign("https://www.youtube.com/shorts/KL4Rp6uMR6M");
  } else {
    const otp_box = [...document.querySelectorAll(".number-cont .otp-input")];
    errorHandle(otp_box);
  }
  e.preventDefault();
}


function otpAutoTab(e, container){
  const el = e.target;
  if (!el.matches("input.otp-input")) return;
  const inp_box = [ ...container.querySelectorAll("input.otp-input")];
  const i = inp_box.indexOf(el);
  if (el.value && i > -1) inp_box[i + 1]?.focus();
}

function otpAutoClear(e, container){
  const el = e.target;
  if (!el.matches("input.otp-input")) return;
  const inp_box = [ ...container.querySelectorAll("input.otp-input")];
  const i = inp_box.indexOf(el);
  console.log(i)
  if (e.key === "Backspace"){
  if (el.value === "") {
    const prev = inp_box[i - 1];
    console.log(i-1)
    if (prev) prev.focus();
  } else { 
        el.value = "";
  }
  }
}

function handleResize() {
  let height = window.innerHeight;
  let width = window.innerWidth;
  document.documentElement.style.setProperty(
      `--fontsize`,
      (Number(2) * (Number(0.3) * height + Number(0.4) * width) * Number(0.125)) / Number(2.5) + "px"
    );
  }

function random4Digits() {
  return String(Math.floor(Math.random() * 10000)).padStart(4, "0");
}

function errorHandle(otp_box){
    wrap.classList.add("blurred");
    playErrorSound();
   errorbox.classList.add("errorbox");
   errorbox.innerHTML=` <div class="msg">You seem to have entered an invalid OTP!</div>
    <div class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" aria-hidden="true">
      <path d="M78.5 13.5c-17.9-17.9-47.1-17.9-65.1 0-17.9 17.9-17.9 47.1 0 65.1 9 9 20.8 13.5 32.5 13.5 11.8 0 23.6-4.5 32.5-13.5 18.1-18 18.1-47.2.1-65.1zM19.1 72.9C5.3 59 4.4 37 16.4 22.1l53.5 53.5C55 87.6 33 86.8 19.1 72.9zm56.5-3L22.1 16.4C29 10.8 37.5 8 46 8c9.7 0 19.5 3.7 26.9 11.1C86.7 33 87.6 55 75.6 69.9z" fill="#f52c2c" class="svgShape color000000-0 selectable">
      </path>
    </svg>
    </div>
    <div class="btn">
      <button class="btn" type="button">Retry</button>
    </div>`

    errorbox.querySelector(".btn").addEventListener("click", () => {
    wrap.classList.remove("blurred");
    errorbox.classList.remove("errorbox");
    errorbox.innerHTML = "";
    otp_box.forEach(i => (i.value = ""));
    otp_box[0]?.focus();
  });
}

function playErrorSound() {
  errorSound.muted = false;
  errorSound.volume = 1;
  errorSound.currentTime = 0;
  errorSound.play().catch((e) => console.log("Audio failed:", e?.name, e));
}

function clearMailError() {
  mailId.classList.remove("error", "shake");
}

window.addEventListener("load", handleResize);
window.addEventListener("resize", handleResize);


