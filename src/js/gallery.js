import { fetchImages } from "./fetchImages";
import { Notify } from "notiflix";

const searchForm = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

searchForm[1].addEventListener("click", search);
loadMoreBtn.style.display = "none";
loadMoreBtn.addEventListener("click", loadMore);

async function search(event) {
    const value = searchForm[0].value;

    event.preventDefault();
    clearMarkup();

    if (!value) {
        return;
    }

    const images = await fetchImages({ value });

    if (!images.total) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
        loadMoreBtn.style.display = "block";
        renderGallery(images.hits);
    }
}

function loadMore() {
    
}

function renderGallery(images) {
    const markup = images
        .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
            return `<div class="photo-card">
                <div><img src="${webformatURL}" alt="${tags}" loading="lazy" /></div>
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b>${likes}
                    </p>
                    <p class="info-item">
                    <b>Views</b>${views}
                    </p>
                    <p class="info-item">
                    <b>Comments</b>${comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads</b>${downloads}
                    </p>
                </div>
            </div>`;
            })
        .join("");
    
    gallery.innerHTML = markup;
}

function clearMarkup() {
    gallery.innerHTML = "";
}