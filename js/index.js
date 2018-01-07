(function() {
   const domGetId = id => {
     return document.querySelector(id)
   }
  let streaming = false,
      video        = domGetId('#video'),
      canvas       = domGetId('#canvas'),
      photo        = domGetId('#photo'),
      startbutton  = domGetId('#startbutton'),
      width = 320,
      height = 0;
      
  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    (stream) => {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    (err) => {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  const takepicture = () => {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  const soundNotification = () => {
    let fx = new Audio();
    let sound = 'http://www.sonidosmp3gratis.com/sounds/camara_5';
    fx.src = sound; fx.load(); fx.play();
  }
  startbutton.addEventListener('click', ev => {
      takepicture();
      soundNotification();
      ev.preventDefault();
  }, false); 
})();
