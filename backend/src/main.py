from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from typing import Dict, Set
from game import Game


app = Flask(__name__)
cors = CORS(app)


games: Dict[int, Game] = dict()
logins: Set[str] = set()
game_id_counter = 0


def create_error_message(message: str):
    return jsonify({'error': message}), 400


def is_field_in_json(json, field: str) -> bool:
    if field not in json:
        return False

    return True


def is_login_taken(login):
    return login in logins


@app.route("/createGame", methods=['POST'])
def create_game():
    global game_id_counter
    data = request.json

    if not is_field_in_json(data, 'login'):
        return create_error_message('You must provide non empty login.')
    login = data.get('login')
    if is_login_taken(login):
        return create_error_message('Login is taken.')
    
    game = Game(game_id_counter, login)
    games[game_id_counter] = game
    game_id_counter = game_id_counter + 1
    logins.add(login)

    return game.get_json()


@app.route("/joinGame", methods=['POST'])
def join_game():
    data = request.json

    if not is_field_in_json(data, 'login'):
        return create_error_message('You must provide non empty login.')
    login = data.get('login')
    if is_login_taken(login):
        return create_error_message('Login is taken')
    
    for game in games.values():
        if game.can_add_player():
            game.add_player(login)
            logins.add(login)
            return game.get_json()
    
    return create_error_message('Cant find a game')


@app.route("/move", methods=['POST'])
def move():
    data = request.json

    if not is_field_in_json(data, 'login'):
        return create_error_message('You must provide non empty login.')
    if not is_field_in_json(data, 'gameId'):
        return create_error_message('You must provide gameId.')
    if not is_field_in_json(data, 'cell'):
        return create_error_message('You must provide cell.')
    
    login = data.get('login')
    gameId = data.get('gameId')
    cell = data.get('cell')

    if gameId not in games:
        return create_error_message('Provided gameId doesnt exist')
    
    game = games[gameId]
    moved = game.move(login, int(cell))
    if not moved:
        return create_error_message('Something went wrong with your move')
    return game.get_json()


@app.route("/get", methods=['POST'])
def get():
    data = request.json

    if not is_field_in_json(data, 'login'):
        return create_error_message('You must provide non empty login.')
    if not is_field_in_json(data, 'gameId'):
        return create_error_message('You must provide gameId.')
    
    login = data.get('login')
    gameId = data.get('gameId')

    if gameId not in games:
        return create_error_message('Provided gameId doesnt exist')
    
    game = games[gameId]
    if not (game.login1 == login or game.login2 == login):
        return create_error_message('This login doesnt play in this game')
    return game.get_json()


if __name__ == '__main__':
    app.run(port=8080, host="0.0.0.0")