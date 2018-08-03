if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }


// Sending POST Request via Fetch

// fetch('http://httpbin.org/post', 
// {method: 'post',
// headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json' 
// },
// body: JSON.stringify({message: "Sending POST request via fetch"})
// },
// ).then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log("POST REQUEST: ", data);
// }).catch(function(err){
//     console.log(err);
// });

// // GET

// fetch('https://jsonplaceholder.typicode.com/users', { 
// method: 'GET'
// }).then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log('GET Request: ', data);
// }).catch(function(err){
//     console.log(err);
// });

// var myImage = document.getElementById("image");

// fetch('http://httpbin.org/image/jpeg').then(function(response) {
//     if(response.ok) {
//       return response.blob();
//     }
//     throw new Error('Network response was not ok.');
//   }).then(function(myBlob) { 
//     var objectURL = URL.createObjectURL(myBlob); 
//     myImage.src = objectURL; 
//   }).catch(function(error) {
//     console.log('There has been a problem with your fetch operation: ', error.message);
//   });   