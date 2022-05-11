//https://teachablemachine.withgoogle.com/models/udH3H2i4z/

prediction_1 = "";
prediction_2 = "";

//Webcam.set will initialise properties for the webcam
//set function accepts data in JSON format. set({})
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quaility: 90
});
camera = document.getElementById('camera');
//Webcam.attach will capture the image and display on div tag in HTML
Webcam.attach('camera')

//Webcam.snap is a pre-defined function from webcam.js whic is used to capture images from webca
//Webcam.snap(), and pass data_uri inside it, data_uri to display the image

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    })
}  
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/i48Xu8XGI/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!')
}
//speechSynthesis is a APi which is used to convert text to speech
//we are storing it on variable synth(API)
//SpeechSynthesisUtterance is the function of the API stored in variable synth which will convert text to speech
//speak is a pre-defined function of the API which will make system speak about the data

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = 'The first Prediction Is' + prediction_1;
    speak_data_2 = ' And The second Prediction Is' + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
if(error){
    console.error(error);
} else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction_1 =  results[0].label;//higher confidence
    prediction_2 =  results[1].label;//2nd highest confidence
    speak();//system will speak out the predictions
    //depending on predictions in label 1 ,update the emojis accordingly in HTML
    if(results[0].label == 'OK'){
        document.getElementById('update_emoji'). innerHTML = '&#x1F44C';
    }
    if(results[0].label == 'Victory'){
        document.getElementById('update_emoji'). innerHTML = '&#x270C';
    }
    if(results[0].label == 'Thumbs Up'){
        document.getElementById('update_emoji'). innerHTML = '&#x1F44D';
    }
    //depending on predictions in label 2 ,update the emojis accordingly in HTML
    if(results[1].label == 'OK'){
        document.getElementById('update_emoji2'). innerHTML = '&#x1F44C';
    }
    if(results[1].label == 'Victory'){
        document.getElementById('update_emoji2'). innerHTML = '&#x270C';
    }
    if(results[1].label == 'Thumbs Up'){
        document.getElementById('update_emoji2'). innerHTML = '&#x1F44D';
    }

}
}