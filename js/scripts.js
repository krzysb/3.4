(function ($) {

    function VideoPlayer(videoContainer) {
        this.video = videoContainer.querySelector("video");
        this.playPause = videoContainer.querySelector(".playPause");
        this.progressBar = videoContainer.querySelector(".progressBar");
        this.loadedBar = videoContainer.querySelector(".loadedBar");
        this.playbackBar = videoContainer.querySelector("#progress");
        this.currentTime = videoContainer.querySelector(".currentTime");
        this.totalTime = videoContainer.querySelector(".totalTime");
        this.fullVolume = videoContainer.querySelector(".fullVolume");
        this.currentVolume = videoContainer.querySelector(".currentVolume");
        this.assignEventListeners();
    }



    VideoPlayer.prototype.assignEventListeners = function (e) {
        this.playPause.onclick = this.play.bind(this);
        this.video.onprogress = this.updateProgress.bind(this);
        this.video.addEventListener("timeupdate", this.updatePlayingProgress.bind(this), false);
        this.video.addEventListener("timeupdate", this.updateCurrentTime.bind(this), false);
        this.video.ondurationchange=this.setDuration.bind(this);
        this.playbackBar.onclick=this.setCurrentPlayback.bind(this);
        this.video.onended=this.resetPlay.bind(this);

    }
    
    VideoPlayer.prototype.resetPlay=function(){
         this.playPause.classList.remove("fa-pause");
          this.playPause.classList.add("fa-play");
        
    }
    VideoPlayer.prototype.setCurrentPlayback=function(e){
        var leftPos=this.playbackBar.getBoundingClientRect().left,
            clickPos=e.pageX,
            pixelsFromLeft=clickPos-leftPos,
        percent=(pixelsFromLeft/this.playbackBar.offsetWidth);
        var newTime=this.video.duration * percent;
        this.video.currentTime=newTime;
    }

    VideoPlayer.prototype.setDuration=function(){
        
        this.totalTime.innerHTML=this.formatTime(this.video.duration);
    }
    
    VideoPlayer.prototype.formatTime=function(seconds){
        var seconds=Math.round(seconds),
            minutes=Math.floor(seconds/60),
            remainingSeconds=seconds-minutes*60;
        if(remainingSeconds==0){
            remainingSeconds="00";
        }else if(remainingSeconds<10){
            remainingSeconds="0"+remainingSeconds;
        }
        return minutes+":"+remainingSeconds;
        
    }
    VideoPlayer.prototype.updateProgress = function (e) {

        if (this.video.buffered.length > 0) {
            var percentLoaded = (this.video.buffered.end(0) / this.video.duration) * 100;
            // console.log(percentLoaded);
            //this.loadedBar.style.width=percentLoaded+ " %";

        }

    }
    VideoPlayer.prototype.updateCurrentTime = function () {
      
        this.currentTime.innerHTML =this.formatTime(this.video.currentTime) 
    }

        VideoPlayer.prototype.updatePlayingProgress = function () {
        var percentPlayed = (this.video.currentTime / this.video.duration) * 100;
        this.playbackBar.value = percentPlayed;
    }




    VideoPlayer.prototype.play = function (e) {

        if (this.video.paused) {
            this.video.play();

            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");

        } else {

            this.video.pause();
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play");
        }
    }
    var videoPlayer1 = new VideoPlayer(document.querySelector("#videoPlayer"));

})(jQuery);
