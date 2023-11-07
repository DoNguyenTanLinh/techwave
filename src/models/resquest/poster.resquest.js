const PosterResquest = (oldPoster, poster) => {
    oldPoster.title = poster.title;
    oldPoster.description = poster.description;
    oldPoster.content = poster.content;
    oldPoster.product_id = poster.product_id;
    oldPoster.image = poster.image;
    oldPoster.modifiedBy = poster.modifiedBy;
    oldPoster.modifiedAt = poster.modifiedAt;
}

module.exports = { PosterResquest };