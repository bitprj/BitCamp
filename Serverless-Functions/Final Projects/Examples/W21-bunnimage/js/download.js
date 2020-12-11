async function handle(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    $('#submit').html(`Trying to find pdf with "${username}"...`);
    // target the output element ID and change content
    // stop the page from reloading

    var myform = document.getElementById("image-form");
        console.log("Attempting to get your pdf...");
        const resp = await fetch("https://bunnimage1.azurewebsites.net/api/downloadTrigger?code=ryCKYqZQJpiq9bagb4Nmifbg6pFZvcyfsNmF4GEybYaL68bGsbdrNA==", {
            method: 'GET',
            headers: {
                'username' : username
            },
        });

        var data = await resp.json();
        console.log("PDF link received!")
        console.log(data.downloadUri)
        console.log(data.success)
        const link = data.downloadUri
        var success = data.success

        if (!success) {
          $('#submit').html(`Your file named ${username}.pdf has not been converted yet. Please continue refreshing!`)
        } else {
          $('#submit').html(`Found ${username}.pdf! Click to Download.`);
          document.getElementById('getLink').setAttribute('onclick',`getPdf("${link}", "${username}")`);
          document.getElementById("getLink").style.visibility = "visible";
          var element = document.getElementById("refresh");
          element.parentNode.removeChild(element);
          document.getElementById("upload").src = "img/downloadsuccess.gif";
        }
}

function getPdf(link, username) {
  window.open(link);
  document.getElementById("getLink").disabled = true;
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  console.log("Downloaded: " + datetime);
  setTimeout(function() { deletePdf(username); }, 10000);
}

async function deletePdf(username) {
  const response = await fetch("https://bunnimage1.azurewebsites.net/api/deletePDF?code=ycWOjABK17rneifTcCDD/4fipiWiX3jxOkMXIgLQYtGMFAhMksQC9g==", {
            method: 'GET',
            headers: {
                'file' : username + ".pdf"
            },
        });
  var data = await response.json();
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  console.log("Deleted " + datetime);
    // set timeout to delay the Azure Function from triggering to prevent Blob from deleting before PDF is downloaded.
}
