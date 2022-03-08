$(document).ready(function () {
  $("#tabs").tabs();
});

function createAccordion(obj) {
  $(".accordion").remove();
  $("body").append(`
  <div class="accordion">
    <h3>Titulo</h3>
    <div >
      <p id=''>${obj.title}</p>
    </div>
    <h3>Duraçao</h3>
    <div >
      <p id=''>${obj.duration}</p>
    </div>
    <h3>Url</h3>
    <div>
      <p id=''>${obj.url}</p>
    </div>
    <h3>Autor</h3>
    <div>
      <p id=''>${obj.author}</p>
    </div>
 </div>
`);
  $(function () {
    $(".accordion").accordion();
  });
}
const playerInfoList = [
  {
    id: "player1",
    videoId: "M5QY2_8704o",
  },
  {
    id: "player2",
    videoId: "f02mOEt11OQ",
  },
  {
    id: "player3",
    videoId: "4pcNRDx6KrE",
  },
  {
    id: "player4",
    videoId: "neV3EPgvZ3g",
  },
  {
    id: "player5",
    videoId: "32XsfeIX_rM",
  },
];
const videoInfo = [];
function createPlayer(playerInfo) {
  return new YT.Player(playerInfo.id, {
    videoId: playerInfo.videoId,
    playerVars: {
      showinfo: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onYouTubeIframeAPIReady() {
  if (typeof playerInfoList === "undefined") return;
  let curplayer = createPlayer(playerInfoList[0]);
  players[0] = curplayer;
  for (let i = 0; i < playerInfoList.length; i++) {
    $("#fragment" + (i + 1)).on("click", function () {
      let curplayer = createPlayer(playerInfoList[i]);
      videoInfo.forEach((e) => {
        if (e.video_id == playerInfoList[i].videoId) {
          createAccordion(e);
        }
      });
      players[i] = curplayer;
    });
  }
}

let players = new Array();

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";

const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onPlayerReady(event) {
  console.log(event.target);
  const videoDat = event.target.getVideoData();
  const url = event.target.getVideoUrl();
  const duration = event.target.getDuration();
  const videoId = videoDat.video_id;
  const obj = {
    video_id: videoId,
    author: videoDat.author,
    title: videoDat.title,
    url: url,
    duration: duration,
  };
  videoInfo.push(obj);
  createAccordion(obj);
}
let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
