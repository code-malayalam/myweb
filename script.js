/**
 * 
 * This is a script for codemalayalam.in.
 * This gets data from youtube
 */



const initiateApi = () => {
    return fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBSKzus6IHW_j6rNIjSoXm4Rz5IOAlr4tI&channelId=UC6VX0uvoQekFE5Lc6vVywdw&part=snippet,id&order=date&maxResults=100')
    .then(response => response.json())
    .then(data => data);
}

const doMatch = (a, b) => {
    return a.toLowerCase().indexOf(b.toLowerCase()) !== -1;
}

const template = (item) => {
    const title = item.snippet.title;
    const id = item.id.videoId;
    const thumb = item.snippet.thumbnails.default.url;
    return `
<div class="box">
<div class="box-title">
    <span>
    <a href="http://www.youtube.com/watch?v=${id}}" target="_blank" rel="noopener noreferrer"><img src="${thumb}" alt="image" width="72" height="54"></a>
    </span>
    <span>${title}</span>
</div>
<div class="box-link">
    <a href="http://www.youtube.com/watch?v=${id}}" target="_blank" rel="noopener noreferrer">See in Youtube</a>
</div>
</div>
    `;
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

            fillDom(gitArr, 'git');
            fillDom(othersArr, 'others');
            fillDom(jsArr, 'js');
            

        })
}

main();