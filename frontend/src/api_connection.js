var apiEndpoint = 'http://{{PUBLIC_IP}}:8080/';
var login;
var gameId;
var mySymbol;

function handleLoginAction(endpoint, successMessage) {
    var loginInput = document.getElementById('login').value;
    if (loginInput.trim() === '') {
        alert('Please enter your login to ' + endpoint + ' a game.');
        return
    }

    fetch(apiEndpoint + endpoint + 'Game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: loginInput })
    })
    .then(response => {
        if(response.status === 400) {
            response.json().then(data => {
                alert(data.error)
                throw new Error(data.error)
            })
        }
        return response.json()
    })
    .then(data => {
        alert(successMessage + data.gameId);
        gameId = data.gameId;
        login = loginInput
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('game').style.display = '';

        x(data);
        setInterval(get_board, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function createGame() {
    handleLoginAction('create', 'Game created! ID: ');
}

function joinGame() {
    handleLoginAction('join', 'Joining game! ID: ');
}

function move(tile){
    fetch(apiEndpoint + 'move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            login: login,
            gameId: gameId,
            cell: tile
         })
    })
    .then(response => {
        if(response.status === 400) {
            response.json().then(data => {
                alert(data.error)
                throw new Error(data.error)
            })
        }
        return response.json()
    })
    .then(data => {
        //populateBoard(data.game.board)
        x(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function get_board(){
    fetch(apiEndpoint + 'get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            login: login,
            gameId: gameId
         })
    })
    .then(response => {
        if(response.status === 400) {
            response.json().then(data => {
                alert(data.error)
                throw new Error(data.error)
            })
        }
        return response.json()
    })
    .then(data => {
        x(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// setInterval(get_board, 5000);