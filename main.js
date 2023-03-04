const uploadBox = document.querySelector(".upload-box");
previewImage = document.querySelector("img")
fileInput = document.querySelector("input");
widthInput = document.querySelector(".width input");
heightInput = document.querySelector(".height input");
ratiotInput = document.querySelector(".ratio input");
const qualityInput = document.querySelector(".quality input")
downloadButton = document.querySelector(".download-btn");

let ogImageRatio; 

const loadFile = (e) =>{
    const file = e.target.files[0];
    if(!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener("load",()=>{
        widthInput.value = previewImage.naturalWidth;
        heightInput.value = previewImage.naturalHeight;
        ogImageRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    })
    console.log(file);
}

widthInput.addEventListener("keyup",() => {
    const height = ratiotInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener("keyup",() => {
    const width = ratiotInput.checked ? heightInput.value *ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDownload = () =>{
    console.log("clicked")
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInput.checked ? 0.7 :1.0;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImage,0,0,canvas.width,canvas.height);

    a.href = canvas.toDataURL("image/jpeg",imgQuality);
    a.download = new Date().getTime();
    a.click();

}


downloadButton.addEventListener("click",resizeAndDownload)
fileInput.addEventListener("change",loadFile);
uploadBox.addEventListener("click",() => fileInput.click());