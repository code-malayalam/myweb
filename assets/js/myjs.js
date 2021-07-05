
function template(item = {}) {
    const title = item.snippet.title;
    const id = item.id.videoId;
    const img = item.snippet.thumbnails.high.url;
    const description = item.snippet.description;
    const url = `http://www.youtube.com/watch?v=${id}`;
    return `
<div class="col-4 col-6-medium col-12-small">
    <section class="box video-box">
        <a target="_blank" href="${url}" class="image featured"><img src="${img}" alt="" /></a>
        <header>
            <h3 class="video-title">${title}</h3>
        </header>
        <p class="video-description">${description}</p>
        <footer>
            <ul class="actions">
                <li><a target="_blank" href="${url}" class="button alt">Watch on YouTube</a></li>
            </ul>
        </footer>
    </section>
</div>
    `;
}


const initiateApi = () => {
    return fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBSKzus6IHW_j6rNIjSoXm4Rz5IOAlr4tI&channelId=UC6VX0uvoQekFE5Lc6vVywdw&part=snippet,id&order=date&maxResults=100')
    .then(response => response.json())
    .then(data => data);
}

const doMatch = (a, b) => {
    return a.toLowerCase().indexOf(b.toLowerCase()) !== -1;
}


const fillDom = (arr, id) => {
    const dom = arr.map(template).join(' ');
    var node = document.getElementById(id);
    node.insertAdjacentHTML('beforeend', dom);
}
const main = () => {
    initiateApi()
        .then((data) => {
            const jsArr = [];
            const gitArr = [];
            const reactArr = [];
            const othersArr = [];
            const filter = [];

            const items = data.items;
            items.forEach(item => {
                if(item.id.videoId) {
                    if(doMatch(item.snippet.title, '1.0')) {
                        filter.push(item);
                    } else if(doMatch(item.snippet.title, 'JavaScript')) {
                        jsArr.push(item);
                    } else if (doMatch(item.snippet.title, 'Git')) {
                        gitArr.push(item);
                    } else if (doMatch(item.snippet.title, 'React')) {
                        reactArr.push(item);
                    } else {
                        othersArr.push(item);
                    }
                }
            });

            console.log(jsArr);
            console.log(gitArr);
            console.log(othersArr);

            const content = document.body
            content.classList.add('hide-loading');

            fillDom(reactArr, 'react');
            fillDom(gitArr, 'git');
            fillDom(othersArr, 'others');
            fillDom(jsArr, 'js');
            

        })
}

main();