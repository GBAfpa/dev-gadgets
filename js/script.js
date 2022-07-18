// PICTURE GALLERY

let imgCount = 0;
const picturesList = getPicturesLarge();
manageGalleryHandlers();

function getPicturesLarge() {
    const list = [];
    document.querySelectorAll("#thumbs img[data-img-large]").forEach(img => {
        list.push(img.dataset.imgLarge);
    })
    return list;
}

function manageGalleryHandlers() {
    document.getElementById("picture-prev").addEventListener("click", function(event) {
        imgCount--;
        if (imgCount < 0) {
            imgCount = picturesList.length-1;
        }
        displayPicture(picturesList[imgCount]);
    })
    document.getElementById("picture-next").addEventListener("click", function(event) {
        imgCount++;
        if (imgCount > picturesList.length-1) {
            imgCount = 0;
        }
        displayPicture(picturesList[imgCount]);
    })
}

function displayPicture(imgSrc) {
    document.getElementById("picture-main").src = imgSrc;
}

