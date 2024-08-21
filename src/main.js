import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createMarkup } from './js/render-functions';
import { fetchByUserKey } from './js/pixabay-api';

const formEL = document.querySelector('.search-form');
const galleryEL = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loaderEl = document.createElement('p');
loaderEl.classList.add('loader');
const galleryModal = new SimpleLightbox('.gallery a');
loadMoreBtn.style.display = 'none';

let page = 1;
let userKeywordForLoadMore;
let totalPages;

const onFormElSubmit = async event => {
	event.preventDefault();	
	const userKeyword = event.target.elements.user_keyword.value;
	if (userKeyword.trim() === '') {
		return;
	}
	userKeywordForLoadMore = userKeyword;
	galleryEL.innerHTML = '';
	loadMoreBtn.style.display = 'none';
	page = 1;
	
	galleryEL.after(loaderEl);
	
	try {
		const response = await fetchByUserKey(userKeyword, page);
		if (response.data.hits.length === 0) {
			iziToast.error({
				message: 'Sorry, there are no images matching your search query. Please try again!',
				position: 'topRight',
			});
			loaderEl.remove();
			return;
		}
			galleryEL.innerHTML = createMarkup(response.data.hits);
			galleryModal.refresh();
			loaderEl.remove();
			formEL.reset();	
			page += 1;
			totalPages = Math.ceil(response.data.totalHits / 15)
    		if (totalPages > 1) {
				 loadMoreBtn.style.display = 'block';					 
			}
		} catch (error) {
			console.log(error);
  		}	
}

const onLoadMoreClick = async () => {
	galleryEL.after(loaderEl);
	loadMoreBtn.style.display = 'none';
			try {
				const response = await fetchByUserKey(userKeywordForLoadMore, page);
				const markup = createMarkup(response.data.hits);
				loaderEl.remove();
				galleryEL.insertAdjacentHTML('beforeend', markup);
				galleryModal.refresh();
         	loadMoreBtn.style.display = 'block';
				page += 1;
		   	 } catch (error) {
				 console.log(error);
				}
				if (page > totalPages) {
					iziToast.info({
						message: "We're sorry, but you've reached the end of search results.",
						position: 'topRight',
					});
					loadMoreBtn.style.display = 'none';
					return; 
					} 
		}

formEL.addEventListener('submit', onFormElSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

