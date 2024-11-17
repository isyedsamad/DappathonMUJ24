module metaschool::TicTacToe_01 {
    use std::string::{String, utf8};
    use std::signer;

    struct GameState has key {
        board: [String; 9],
        current_player: String,
        game_result: String,
    }

    public entry fun createGame(account: &signer) acquires GameState {
        if (exists<GameState>(signer::address_of(account))) {
            let state = borrow_global_mut<GameState>(signer::address_of(account));
            state.board = [utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" ")];
            state.current_player = utf8(b"X");
            state.game_result = utf8(b"Game in progress");
        } else {
            let state = GameState {
                board: [utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" "); utf8(b" ")],
                current_player: utf8(b"X"),
                game_result: utf8(b"Game in progress"),
            };
            move_to(account, state);
        }
    }

    public fun get_game_state(account: &signer): (String, String, [String; 9]) acquires GameState {
        let state = borrow_global<GameState>(signer::address_of(account));
        (state.current_player, state.game_result, state.board)
    }

    public entry fun make_move(account: &signer, position: u8) acquires GameState {
        let state = borrow_global_mut<GameState>(signer::address_of(account));

        if (state.board[position as usize] != utf8(b" ") || state.game_result != utf8(b"Game in progress")) {
            return;
        }

        let player_marker = &state.current_player;
        state.board[position as usize] = player_marker.clone();

        // Check for win condition
        if (check_winner(state.board)) {
            state.game_result = utf8(b"Player Win");
        } else if (state.board.iter().all(|&cell| cell != utf8(b" "))) {
            state.game_result = utf8(b"Draw");
        } else {
            // Switch player turn
            state.current_player = if *player_marker == utf8(b"X") { utf8(b"O") } else { utf8(b"X") };
        }
    }

    fun check_winner(board: [String; 9]): bool {
        let win_combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6], // diagonals
        ];

        for combination in win_combinations {
            let [a, b, c] = combination;
            if (board[a] == board[b] && board[b] == board[c] && board[a] != utf8(b" ")) {
                return true;
            }
        }
        false
    }
}
