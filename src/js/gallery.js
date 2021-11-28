import { fetchImages } from "./fetchImages";
import { Notify } from "notiflix";

const searchForm = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

searchForm[1].addEventListener("click", search);
loadMoreBtn.addEventListener("click", loadMore);

const perPage = 40;
let searchPage = 1;
let searchValue;

async function search(event) {
    searchValue = searchForm[0].value;
    searchPage = 1;

    event.preventDefault();
    clearMarkup();

    if (!searchValue) {
        return;
    }

    const images = await loadImages(searchValue);

    if (images.totalHits) {
        Notify.success(`Hooray! We found ${images.totalHits} images.`);
    }
}

async function loadMore() {
    loadMoreBtn.style.display = "none";

    searchPage += 1;
    await loadImages(searchValue, searchPage);
}

async function loadImages(value, page = 1) {
    const images = await fetchImages({ value, page });

    if (!images.totalHits) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
        const totalImages = page * perPage;

        if (totalImages <= images.totalHits) {
            loadMoreBtn.style.display = "block";
        } else {
            Notify.info("We're sorry, but you've reached the end of search results.");
        }

        renderGallery(images.hits);
    }

    return images;
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
    
    gallery.innerHTML += markup;
}

function clearMarkup() {
    gallery.innerHTML = "";
}