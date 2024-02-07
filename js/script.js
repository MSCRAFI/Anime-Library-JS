const url = 'https://myanimelist.p.rapidapi.com/anime/top/airing';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': API_KEY,
		'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
	}
};

const animeInfoArray = []

async function fetchResult() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const finalResult = result.title;
        result.forEach((items, index) => {
            if (index <4) {
                animeInfoArray.push({
                    title: items.title,
                    picture: items.picture_url,
                    aired_on: items.aired_on
                });
            }
            
        });
    } catch (error) {
        console.error(error);
    }

}

async function displayPopularContent() {
    await fetchResult();
    let htmlElement = '';
    animeInfoArray.forEach(items => {
        htmlElement += `
        <div class="popular-content-card">
            <img src="${items.picture}" alt="${items.title}">
            <div class="popular-card-info">
                <h3>${items.title}</h2>
                <p>${items.aired_on}</p>
            </div>
        </div>`;
        console.log(htmlElement);

    });
    document.querySelector('.popular-content').innerHTML = htmlElement;

}

displayPopularContent();