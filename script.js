const videos = [
  {
    title: "Tech Review",
    thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/0.jpg",
    url: "https://www.youtube.com/embed/ysz5S6PUM-U"
  },
  {
    title: "Gaming Video",
    thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/0.jpg",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY"
  }
];

const grid = document.getElementById("videoGrid");

function displayVideos(list) {
  grid.innerHTML = "";
  list.forEach(video => {
    const div = document.createElement("div");
    div.className = "video";

    div.innerHTML = `
      <img src="${video.thumbnail}">
      <div class="video-title">${video.title}</div>
    `;

    div.onclick = () => {
      window.location.href = "video.html?src=" + encodeURIComponent(video.url);
    };

    grid.appendChild(div);
  });
}

displayVideos(videos);

// Search
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = videos.filter(v => v.title.toLowerCase().includes(value));
  displayVideos(filtered);
});
