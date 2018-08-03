function createCard(counter, name, link) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardHeader = document.createElement('div');
    card.appendChild(cardHeader);
    var title = document.createTextNode(counter+" - "+name);
    cardHeader.appendChild(title);
    cardHeader.className = 'card-header';
    var cardBody = document.createElement('div');
    card.appendChild(cardBody);
    cardBody.className = 'card-body';
    var a = document.createElement('a');
    cardBody.appendChild(a);
    var aText = document.createTextNode("Go to profile");
    a.appendChild(aText);
    a.className = 'btn btn-primary';
    a.href = link;
    cardBody.appendChild(a);
    document.body.appendChild(card);
}

function clearCards(){
    while(card.hasChildNodes()){
      card.removeChild(card.lastChild);
    }
  }

var url = 'https://api.github.com/users/imrizwan/followers';
var dataReceived = false;

fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        dataReceived = true;
        console.log("From web: ", data);
        for(let i=0; i<data.length;i++){
            createCard(i+1, data[i].login, data[i].html_url)
        }
    })

if('caches' in window){
    caches.match(url)
        .then(function(res){
            if(res){
                return res.json();
            }
        })
        .then(function(data){
            if(!dataReceived){
                // for(let i=0; i<data.length;i++){
                //     createCard(i+1, data[i].login, data[i].html_url)
                // }
            }
        })
}