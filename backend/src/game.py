from tictactoe import Tictactoe

class Game:
    def __init__(self, id: int, login) -> None:
        self.id = id
        self.tictactoe = Tictactoe()
        self.login1: str = login
        self.login2: str = None

    def move(self, login: str, cell: int):
        if login == self.login1:
            return self.tictactoe.move(Tictactoe.SYMBOL_1, cell)
        elif login == self.login2:
            return self.tictactoe.move(Tictactoe.SYMBOL_2, cell)
        return False

    def add_player(self, login: str):
        if self.login1 == None:
           self.login1 = login
           return True
        if self.login2 == None:
            self.login2 = login
            return True
        return False
    
    def can_add_player(self):
        return self.login2 == None
    
    def get_json(self):
        return {
            'gameId': self.id,
            'game': self.tictactoe.get_json(),
            'player1': self.login1,
            'player2': self.login2
        }


