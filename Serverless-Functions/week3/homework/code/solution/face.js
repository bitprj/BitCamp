function loadFile(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};

async function handle(event){
    console.log('submitting form...')
    $('#emotion').html('Loading...');
    event.preventDefault();

    var myform = document.getElementById('myform');
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
    
    $('#emotion').html(resultString);

}
