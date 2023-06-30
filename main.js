song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1_status = "";
scoreRightWrist = 0;
song2_status = "";

function preload()
{
     song1 = loadSound("Alone.mp3");
     song2 = loadSound("LetMeLoveYou.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialised');
}

function gotPoses(results)
{
    
    if (results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + " LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.x;
        console.log("RightWristX = " + rightWristX + " RightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video,0,0,600,500);

    fill("#FF00AA");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        song1_status = song1.isPlaying();
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        
        if (song1_status == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "You are listening to Alone by Alan Walker";
        }  
    }
    
    if(scoreRightWrist > 0.2)
    {
        song2_status = song2.isPlaying();
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        
        if (song2_status == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "You are listening to Let Me Love You by Justin Bieber";
        }  
    }
}
