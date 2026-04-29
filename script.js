const videos = [
  {
    title: "Actress Clip 1",
    url: "videos/video1.mp4"
  },
  {
    title: "Actress Clip 2",
    url: "videos/video2.mp4"
  }
];

const grid = document.getElementById("videoGrid");

// 🎬 Generate thumbnail from video
function generateThumbnail(videoPath, callback) {
  const video = document.createElement("video");
  video.src = videoPath;
  video.crossOrigin = "anonymous";
  video.muted = true;

  video.addEventListener("loadeddata", () => {
    video.currentTime = 2; // capture at 2 seconds
  });

  video.addEventListener("seeked", () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg");
    callback(image);
  });
}

// 📺 Display videos
function displayVideos(list) {
  grid.innerHTML = "";

  list.forEach(video => {
    const div = document.createElement("div");
    div.className = "video";

    const img = document.createElement("img");
    img.src = ""; // placeholder

    const title = document.createElement("div");
    title.className = "video-title";
    title.innerText = video.title;

    // Generate thumbnail
    generateThumbnail(video.url, (thumbnail) => {
      img.src = thumbnail;
    });

    div.appendChild(img);
    div.appendChild(title);

    div.onclick = () => {
      window.location.href = "video.html?video=" + encodeURIComponent(video.url);
    };

    grid.appendChild(div);
  });
}

displayVideos(videos);

// 🔍 Search
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = videos.filter(v => v.title.toLowerCase().includes(value));
  displayVideos(filtered);
});
