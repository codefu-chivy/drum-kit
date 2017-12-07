(function() {
    const sounds = document.getElementsByClassName("sound");
    let timerInt;
    let duration = 0;
    let recordingArr = [];
    let recordObj = {};
    let audioInt;
    let count = 0;
    let id;

    //Recorder Object
    let recorder = {
        recording: false,
        soundsArr: [],
        durationArr: [],
        timer: () => {
            timerInt = setInterval(() => {
                duration += 0.01;
            }, 1);
        },
        stopTimer: () => {
            duration = 0;
            clearInterval(timerInt);
        }
    }

    //Show audio recordings
    function showRecordings() {
        let audioCont = document.getElementById("recordings");
        audioCont.innerHTML = "";
        console.log(recordingArr)
        if (!recordingArr[0].audio.length) {
            return;
        }
        for (let i = 0; i < recordingArr.length; i++) {
            let button = document.createElement("button");
            button.textContent = "Play Audio #" + (i + 1);
            button.setAttribute("class", "play-audio");
            button.setAttribute("id", i);
            button.addEventListener("click", playAudio);
            audioCont.appendChild(button);
        }  
    }

    //Play recordings
    function playAudio(e) {
        let ele = e.target;
        id = e.target.getAttribute("id");
        intervals(id);
    }

    //Manage intervals
    function intervals(i) {
        if (!recordingArr[i].audio[count]) {
            count = 0;
            return;
        }
        else {
            if (count > 0) {
                recordingArr[i].audio[count - 1].pause();
                recordingArr[i].audio[count - 1].currentTime = 0;
                
            }
            recordingArr[i].audio[count].play();
            setTimeout(addUp, (recordingArr[i].duration[count] * 375));
            count++;
        }
    }

    function addUp() {
        intervals(id);
    }

    //Event Listeners

    //Add listeners to each sound div
    for (let j = 0; j < sounds.length; j++) {
        sounds[j].addEventListener("click", () => {
            let audio = document.querySelector("#sound" + (j + 1) + " audio");
            if (recorder.recording) {
                if (duration) {
                    recorder.durationArr.push(Number(duration.toString().slice(0, 4)));
                    recorder.stopTimer();
                }
                recorder.timer();
                recorder.soundsArr.push(audio);
            }
            audio.currentTime = 0;
            audio.pause();
            audio.play();
            sounds[j].classList.add("pressed");
            setTimeout(() => {
                sounds[j].classList.remove("pressed");
            }, 200);
        });
    }

    //Start recording when record button pressed
    document.querySelector("#record").addEventListener("click", () => {
        let live = document.getElementById("live");
        recorder.recording = !recorder.recording;
        recordObj = {};
        if (recorder.recording) {
            live.style.display = "initial";
        }
        else {
            live.style.display = "none";
            recorder.stopTimer();
            recordObj.duration = recorder.durationArr.map((ele) => {
                return ele;
            });
            recordObj.audio = recorder.soundsArr.map((ele) => {
                return ele;
            });
            recordingArr.push(recordObj);
            recorder.soundsArr = [];
            recorder.durationArr = [];
            showRecordings();
        }
    });
}());