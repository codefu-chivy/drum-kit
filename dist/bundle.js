/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var sounds = document.getElementsByClassName("sound");
	var timerInt = void 0;
	var duration = 0;
	var recordingArr = [];
	var recordObj = {};
	var audioInt = void 0;
	var count = 0;
	var id = void 0;

	//Recorder Object
	var recorder = {
	    recording: false,
	    soundsArr: [],
	    durationArr: [],
	    timer: function timer() {
	        timerInt = setInterval(function () {
	            duration += 0.01;
	        }, 1);
	    },
	    stopTimer: function stopTimer() {
	        duration = 0;
	        clearInterval(timerInt);
	    }
	};

	//Show audio recordings
	function showRecordings() {
	    var audioCont = document.getElementById("recordings");
	    audioCont.innerHTML = "";
	    console.log(recordingArr);
	    if (!recordingArr[0].audio.length) {
	        return;
	    }
	    for (var i = 0; i < recordingArr.length; i++) {
	        var button = document.createElement("button");
	        button.textContent = "Play Audio #" + (i + 1);
	        button.setAttribute("class", "play-audio");
	        button.setAttribute("id", i);
	        button.addEventListener("click", playAudio);
	        audioCont.appendChild(button);
	    }
	}

	//Play recordings
	function playAudio(e) {
	    var ele = e.target;
	    id = e.target.getAttribute("id");
	    intervals(id);
	}

	//Manage intervals
	function intervals(i) {
	    if (!recordingArr[i].audio[count]) {
	        count = 0;
	        return;
	    } else {
	        if (count > 0) {
	            recordingArr[i].audio[count - 1].pause();
	            recordingArr[i].audio[count - 1].currentTime = 0;
	        }
	        recordingArr[i].audio[count].play();
	        setTimeout(addUp, recordingArr[i].duration[count] * 375);
	        count++;
	    }
	}

	function addUp() {
	    intervals(id);
	}

	//Event Listeners

	//Add listeners to each sound div

	var _loop = function _loop(j) {
	    sounds[j].addEventListener("click", function () {
	        var audio = document.querySelector("#sound" + (j + 1) + " audio");
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
	        setTimeout(function () {
	            sounds[j].classList.remove("pressed");
	        }, 200);
	    });
	};

	for (var j = 0; j < sounds.length; j++) {
	    _loop(j);
	}

	//Start recording when record button pressed
	document.querySelector("#record").addEventListener("click", function () {
	    var live = document.getElementById("live");
	    recorder.recording = !recorder.recording;
	    recordObj = {};
	    if (recorder.recording) {
	        live.style.display = "initial";
	    } else {
	        live.style.display = "none";
	        recorder.stopTimer();
	        recordObj.duration = recorder.durationArr.map(function (ele) {
	            return ele;
	        });
	        recordObj.audio = recorder.soundsArr.map(function (ele) {
	            return ele;
	        });
	        recordingArr.push(recordObj);
	        recorder.soundsArr = [];
	        recorder.durationArr = [];
	        showRecordings();
	    }
	});

/***/ }
/******/ ]);