const grid = document.getElementById("videoGrid");

// Generate thumbnail
function generateThumbnail(videoPath, callback) {
  const video = document.createElement("video");
  video.src = videoPath;
  video.muted = true;

  video.addEventListener("loadeddata", () => {
    video.currentTime = 2;
  });

  video.addEventListener("seeked", () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    callback(canvas.toDataURL("image/jpeg"));
  });
}

// Load video list
fetch("videos.txt")
  .then(res => res.text())
  .then(data => {
    const files = data.split("\n").filter(f => f.trim() !== "");

    displayVideos(files);
  });

function displayVideos(files) {
  grid.innerHTML = "";

  files.forEach(path => {
    const div = document.createElement("div");
    div.className = "video";

    const img = document.createElement("img");
    const title = document.createElement("div");

    title.className = "video-title";
    title.innerText = path.split("/").pop();

    generateThumbnail(path, (thumb) => {
      img.src = thumb;
    });

    div.appendChild(img);
    div.appendChild(title);

    div.onclick = () => {
      window.location.href = "video.html?video=" + encodeURIComponent(path);
    };

    grid.appendChild(div);
  });
}
