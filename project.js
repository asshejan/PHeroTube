
const categories = document.getElementById("categories-container");
const videoContainer = document.getElementById("video-container");
let increase = true;

function get() {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((doc) => {
        doc.data.forEach((element) => {
            const categoryDiv = document.createElement("button");
            categoryDiv.className = "category";
            categoryDiv.addEventListener("click", () => {
                console.log("Category Clicked:", element.category_id);
                loadData(element.category_id);
                increase = true;
            });
            
            
            categoryDiv.innerHTML = `<div id="cat">
            ${element.category}
            </div>`;
            
            categories.appendChild(categoryDiv);
        });
    });
}
get();

const globaldata = [];


const loadData = (id) => {
    
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then(res => res.json())
        .then(data => {
            globaldata.length = 0; 
            globaldata.push(...data.data);

            displayData(globaldata);
        });
}


const displayData = (data) => {
    videoContainer.innerHTML = "";

    if (data.length === 0) {
     
     const noVideosMessage = document.createElement("div");
     noVideosMessage.innerHTML = `
         <img src="./Icon.png" alt="No videos available">
         <h3>Oops!!Sorry,There is no<br>content here..</h3>
     `;
     videoContainer.appendChild(noVideosMessage);
    } else {
        data.forEach((data) => {
            console.log(data);
            const card = document.createElement("div");
            card.classList.add("box");
            const isVerified = data.authors[0].verified;
            const verifiedMark = isVerified ? '<span class="verified-mark">&#9989;</span>' : '';

            const videoTime = Math.floor((data.others.posted_date) / (1000 * 60 * 60));

            card.innerHTML = `
            <img class="box-img" src=${data.thumbnail} alt="" srcset="">
            <span class="posted-time">${videoTime} hours ago</span>
            <h3>${data.title}</h3>
            <p>${data.authors[0].profile_name} ${verifiedMark}<br>
            Views: ${data.others.views}</p>
            `;
            videoContainer.appendChild(card);
        });
    }
};

loadData(1000);

const sortByView = () => {

    console.log("Sorting by views");

    globaldata.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));

    displayData(globaldata);
}
