import{a as w,S as E,i as p}from"./assets/vendor-f144e563.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const y=o=>o.map(t=>{const{webformatURL:s,largeImageURL:i,tags:e,likes:r,views:n,comments:L,downloads:b}=t;return`<li class="item">
					<a class="item-link" href="${i}"><img class="item-img" src="${s}" alt="" title="${e}" /></a>
					<ul class="item-desc">
							<li>Likes
								<p>${r}</p>
							</li>
							<li>Views
								<p>${n}</p>
							</li>
							<li>Comments
								<p>${L}</p>
							</li>
							<li>Downloads
								<p>${b}</p>
							</li>
					</ul>
				</li>`}).join(""),f=(o,t)=>w.get("https://pixabay.com/api/",{params:{key:"45426984-94cd792edc1ba8c0f2dda7afb",q:`${o.trim()}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}}),u=document.querySelector(".search-form"),d=document.querySelector(".gallery"),a=document.querySelector(".load-more-btn"),c=document.createElement("p");c.classList.add("loader","own-styles");const g=new E(".gallery a");let l=1,h,m;const v=async o=>{o.preventDefault();const t=o.target.elements.user_keyword.value;if(t.trim()!==""){h=t,d.innerHTML="",a.style.display="none",l=1,u.after(c);try{const s=await f(t,l);if(s.data.hits.length===0){p.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}d.innerHTML=y(s.data.hits),g.refresh(),u.reset(),l+=1,m=Math.ceil(s.data.totalHits/15),m>1&&(a.style.display="block")}catch(s){console.log(s)}finally{c.remove()}}},M=async()=>{try{d.after(c),a.style.display="none";const o=await f(h,l),t=y(o.data.hits);c.remove(),d.insertAdjacentHTML("beforeend",t),g.refresh(),a.style.display="block",l+=1;const i=document.querySelector(".gallery li").getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"}),l>m&&(p.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a.style.display="none")}catch(o){console.log(o)}};u.addEventListener("submit",v);a.addEventListener("click",M);
//# sourceMappingURL=commonHelpers.js.map
