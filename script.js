const wrapper = document.querySelector(".wrapper"),
      qrInput = wrapper.querySelector(".form input"),
      generateBtn = document.getElementById("generate-btn"),
      qrImg = wrapper.querySelector(".qr-code img"),
      downloadBtn = document.getElementById("download-btn");

let preValue = "";

generateBtn.addEventListener("click", () => {
  const qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;

  generateBtn.innerText = "Generating QR Code...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;

  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
    downloadBtn.classList.remove("hidden");
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
    downloadBtn.classList.add("hidden");
  }
});

downloadBtn.addEventListener("click", () => {
  if (!qrImg.src) return;
  const link = document.createElement("a");
  link.href = qrImg.src;
  link.download = "qr-code.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
