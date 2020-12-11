function loadFile(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};

async function handle(event){
    console.log('submitting form...')
    $('#emotion').html('Loading...');
    event.preventDefault();

    var myform = document.getElementById('image-form');
    var payload = new FormData(myform);

    const resp = await fetch(config.functionUrl, {
        method: 'POST',
        body: payload
    });

    var data = await resp.json();

    var emotion = data.result[0].faceAttributes.emotion;

    var resultString = `

    <h3>Emotions in the image:</h3><br />
    <p>anger: ${emotion.anger}</p>
    <p>contempt: ${emotion.contempt}</p>
    <p>disgust: ${emotion.disgust}</p>
    <p>fear: ${emotion.fear}</p>
    <p>happiness: ${emotion.happiness}</p>
    <p>neutral: ${emotion.neutral}</p>
    <p>sadness: ${emotion.sadness}</p>
    <p>surprise: ${emotion.surprise}</p>
    `;
    
    var valence = emotion.happiness + emotion.surprise - emotion.anger - emotion.contempt -
    emotion.disgust - emotion.fear - emotion.sadness;
    if (valence < emotion.neutral){
        valence = 0.5;
    }
    else if (valence > 1){
        valence = 1;
    }
    else if (valence < 0){
        valence = 0;
    }
    
    $('#emotion').html(resultString);
    $('#hidden-emotion').html(valence);

}