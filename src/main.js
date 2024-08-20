import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createMarkup } from './js/render-functions';
import { fetchByUserKey } from './js/pixabay-api';

const formEL = document.querySelector('.search-form');
const galleryEL = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const galleryModal = new SimpleLightbox('.gallery a');
loadMoreBtn.style.display = 'none';

let page = 1;

const onFormElSubmit = async event => {
	event.preventDefault();
	const userKeyword = event.target.elements.user_keyword.value;
	if (userKeyword.trim() === '') {
		return;
	}
	galleryEL.innerHTML = '';
	page = 1;
	
	const loaderEl = document.createElement('p');
	loaderEl.classList.add('loader');
	formEL.after(loaderEl);
	
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
		loadMoreBtn.style.display = 'block';
		const onLoadMoreClick = async () => {
			try {
				page += 1;
				const response = await fetchByUserKey(userKeyword, page);
				const markup = createMarkup(response.data.hits);
				galleryEL.insertAdjacentHTML('beforeend', markup);
				galleryModal.refresh();
			 } catch (error) {
		 console.log(error);
  		}
		}
		loadMoreBtn.addEventListener('click' , onLoadMoreClick)
		} catch (error) {
		console.log(error);
  		}
	
}

formEL.addEventListener('submit', onFormElSubmit);


