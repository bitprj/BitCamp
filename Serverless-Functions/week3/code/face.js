function loadFile(event) {
    var image = document.getElementById('output')
    image.src = URL.createObjectURL(event.target.files[0])
}

async function handle(event) {
    console.log("submitting...")
    $('#emotions').html('Loading...');
    event.preventDefault();

    var myForm = document.getElementById('image-form');
    var payload = new FormData(myForm);

    const resp = await fetch(functionURL, {
        method: 'POST',
        body: payload,
    });

    var data = await resp.json();
    
    console.log(data);

    var beard = data.analysis[0].faceAttributes.facialHair;

    var resultString = `
    
    <h3> Facial Hair in image: </h3>
    <p> Moustache: ${beard.moustache}</p>
    <p> Sideburns: ${beard.sideburns}</p>
    <p> Beard: ${beard.beard}</p>
    
    `

    $('#facial-hair').html(resultString);
}
