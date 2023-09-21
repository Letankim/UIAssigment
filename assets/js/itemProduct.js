const changeImgPreview = (ele)=> {
    const mainImg = document.querySelector(".box-main-product img");
    mainImg.src = ele.querySelector("img").src;
    const imgActive = document.querySelector(".item-img-desc.active");
    imgActive.classList.remove("active");
    ele.classList.add("active");
}

const changeColorProduct = (ele)=> {
    const colorActive = document.querySelector(".item-color label.active");
    colorActive.classList.remove("active");
    ele.classList.add("active");
}