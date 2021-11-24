song = ""
lwx = 0
lwy = 0
rwx = 0
rwy = 0
scorelw = 0
scorerw = 0

function preload() {
  song = loadSound('music.mp3')
}

function setup() {
  canvas = createCanvas(600, 500)
  canvas.center()
  video = createCapture(VIDEO)
  video.hide()
  poseNet = ml5.poseNet(video, modelLoaded)
  poseNet.on('pose', gotPoses)
}

function draw() {
  image(video, 0, 0, 600, 500)
  if (scorelw > 0) {
    fill('red')
    circle(lwx, lwy, 20)
    number_lwy = Number(lwy);
    remove_decimals = floor(number_lwy)
    volume = remove_decimals / 500
    document.getElementById('volume').innerHTML = "Volume: " + volume;
    song.setVolume(volume)
  }
  if (scorerw > 0) {
    fill('blue')
    circle(rwx, rwy, 20)
    if (rwy > 0 && rwy <= 100) {
      document.getElementById('speed').innerHTML = 'Speed: 0.5x'
      song.rate(0.5)
    }
    else if (rwy > 100 && rwy <= 200) {
      document.getElementById('speed').innerHTML = 'Speed: 1x'
      song.rate(1)
    }
    else if (rwy > 200 && rwy <= 300) {
      document.getElementById('speed').innerHTML = 'Speed: 1.5x'
      song.rate(1.5)
    }
    else if (rwy > 300 && rwy <= 400) {
      document.getElementById('speed').innerHTML = 'Speed: 2x'
      song.rate(2)
    }
    else {
      document.getElementById('speed').innerHTML = 'Speed: 2.5x'
      song.rate(2.5)
    }
  }
}

function Start() {
  song.play()
  song.setVolume(0.5)
  song.rate(1)
}

function modelLoaded() {
  console.log('Model is loaded')
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results)
    lwx = results[0].pose.leftWrist.x;
    lwy = results[0].pose.leftWrist.y;
    rwx = results[0].pose.rightWrist.x;
    rwy = results[0].pose.rightWrist.y;
    scorelw = results[0].pose.keypoints[9].score
    scorerw = results[0].pose.keypoints[10].score
  }
}