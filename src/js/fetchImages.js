const KEY = "24561265-9956eb3917e109e6a295ac624";

async function fetchImages({ value, page }) {
    try {
        const params = new URLSearchParams({
            key: KEY,
            q: encodeURIComponent(value),
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: page || 1,
            per_page: 40,
        });
        const response = await fetch(`https://pixabay.com/api/?${params}`);
        const images = await response.json();

        console.log(images);

        return images;
    } catch (error) {
        console.log(error.message);
    }
}

export { fetchImages };