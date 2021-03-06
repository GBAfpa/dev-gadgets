
let imgCount = 0;
const picturesList = getPicturesLarge();
manageGalleryHandlers();

manageAddToCart();

manageAccordions();

let carouselCount = 0;
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const carouselList = document.getElementById("carousel-list");
manageCarousel();


// PICTURES GALLERY

function getThumbsElements() {
    return document.querySelectorAll("#thumbs img[data-img-large]");
}

function getPicturesLarge() {
    const list = [];
    getThumbsElements().forEach(img => {
        list.push(img.dataset.imgLarge);
    })
    return list;
}

function manageGalleryHandlers() {

    // Mobile - Click for previous picture
    document.getElementById("picture-prev").addEventListener("click", function(event) {
        imgCount--;
        if (imgCount < 0) {
            imgCount = picturesList.length-1;
        }
        displayPicture(picturesList[imgCount]);
    });

    // Mobile - Click for next picture
    document.getElementById("picture-next").addEventListener("click", function(event) {
        imgCount++;
        if (imgCount > picturesList.length-1) {
            imgCount = 0;
        }
        displayPicture(picturesList[imgCount]);
    });

    // Desktop - Display picture on mouse hover
    getThumbsElements().forEach(thumb => {
        thumb.addEventListener("mouseover", function(event) {
            const src = event.target.dataset.imgLarge;
            displayPicture(src);
            imgCount = picturesList.indexOf(src);
        })
    });
}

function displayPicture(imgSrc) {
    document.getElementById("picture-main").src = imgSrc;
}


// ADD TO CART

function manageAddToCart() {
    // Click on Add to cart button 
    document.getElementById("add-cta").addEventListener("click", addQuantityToCart);
    
    // Only numbers are allowed in quantity input
    document.getElementById("add-qty").addEventListener("keypress", function(event) {
        if (isNaN(parseInt(event.key))) event.preventDefault();
    });
}

function addQuantityToCart() {
    let qty = getQuantity();
    if (qty > 99) qty = "99+";
    updateCartQuantity(qty);
    disableCta(this);
}

function updateCartQuantity(quantity) {
    document.getElementById("cart-nb").innerText = quantity;
}

function getQuantity() {
    const qty = parseInt(document.getElementById("add-qty").value);
    return isNaN(qty) || qty < 1 ? 1 : qty;
}

function disableCta(button) {
    button.classList.add("added");
    button.innerText = "D??j?? au panier";
    button.removeEventListener("click", addQuantityToCart);
}


// ACCORDIONS

function manageAccordions() {
    document.querySelectorAll(".js-accordion-ttl").forEach(ttl => {

        // Update accordion status xith local storage
        updateAccordion(ttl);

        // Click on title
        ttl.addEventListener("click", function() {
            toggleAccordionDisplay(this);
        });
    });
}

function toggleAccordionDisplay(title) {
    title.classList.toggle("closed");
    title.nextElementSibling.classList.toggle("hidden");
    setAccordionStatus(title);
}

function closeAccordion(title) {
    title.classList.add("closed");
    title.nextElementSibling.classList.add("hidden");
    setAccordionStatus(title);
}

function setAccordionStatus(title) {
    localStorage.setItem(title.id, title.classList.contains("closed"));
}

function getAccordionStatusFromId(id) {
    return localStorage.getItem(id) == "true";
}

function updateAccordion(title) {
    if (getAccordionStatusFromId(title.id)) closeAccordion(title);
}


// CAROUSEL

function manageCarousel() {
    updateCarouselHandlers();

    carouselPrev.addEventListener("click", function(event) {
        carouselCount--;
        updateCarousel();
    });
    carouselNext.addEventListener("click", function(event) {
        carouselCount++;
        updateCarousel();
    });
}

function updateCarousel() {
    updateCarouselHandlers();
    carouselList.style.left = `-${carouselCount}00vw`;
}

function getCarouselLength() {
    return carouselList.childElementCount;
}

function updateCarouselHandlers() {
    if (carouselCount === 0) {
        carouselPrev.classList.add("hidden");
    } else {
        carouselPrev.classList.remove("hidden");
    }

    if (carouselCount === getCarouselLength()-1) {
        carouselNext.classList.add("hidden");
    } else {
        carouselNext.classList.remove("hidden");
    }
}