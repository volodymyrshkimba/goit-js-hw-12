export const createMarkup = arr => {
	return arr.map(imgObj => {
	const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = imgObj;
	return `<li class="item">
					<a class="item-link" href="${largeImageURL}"><img class="item-img" src="${webformatURL}" alt="" title="${tags}" /></a>
					<ul class="item-desc">
							<li>Likes
								<p>${likes}</p>
							</li>
							<li>Views
								<p>${views}</p>
							</li>
							<li>Comments
								<p>${comments}</p>
							</li>
							<li>Downloads
								<p>${downloads}</p>
							</li>
					</ul>
				</li>`
}).join('');
}