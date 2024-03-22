from typing import Tuple, List

class Tictactoe:
    SYMBOL_1 = 'O'
    SYMBOL_2 = 'X'

    WINNING: List[Tuple[int,int,int]] = [
        (0,1,2),
        (3,4,5),
        (6,7,8),
        (0,3,6),
        (1,4,7),
        (2,5,8),
        (0,4,8),
        (2,4,6)
    ]
    def __init__(self):
        self.board = ["" for i in range(9)]
        self.move_counter = 0
        self.result = ''

    def move(self, player: str, cell: int):
        if not self._player_can_move(player):
            print(player, "cant move")
            return False
        
        if not self._is_cell_free(cell):
            print(cell, "is not free")
            return False
        
        print(player, "picks", cell)
        self.board[cell] = player
        self.move_counter += 1

        if self.move_counter == 9:
            self.result = 'draw' 

        won = self.check_winning(player)
        if won:
            self.result = player

        return True
    
    def get_game_board(self):
        return self.board
    
    def check_winning(self, player):
        for winning_cells in self.WINNING:
            won = True
            for cell in winning_cells:
                if self.board[cell] != player:
                    won = False
                    break
            if won:
                return True
        return False
    
    def get_json(self):
        return {
            'board': self.get_game_board(),
            'turn': self.whose_turn(),
            'result': self.result
        }

    def whose_turn(self):
        return self.SYMBOL_1 if self.move_counter % 2 == 0 else self.SYMBOL_2

    def _player_can_move(self, player: str):
        return self.whose_turn() == player
    
    def _is_cell_free(self, cell: int):
        if cell > 8 or cell < 0:
            return False
        
        if self.board[cell] == "":
            return True
        return False
