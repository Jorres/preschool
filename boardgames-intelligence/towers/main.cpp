#include "types.h"

void show_field(const gamestate &gms)
{
	for (int i = SIZE - 1; i >= 0; i--) {
		cout << i << ' ';

		for (int j = 0; j < SIZE; j++)
			if (gms.field[i][j] == EMPTY)
				cout << ". ";
			else if (gms.field[i][j] == BLOCKED)
				cout << "x ";
			else if (gms.field[i][j] == gms.me.num)
				cout << "M ";
			else if (gms.field[i][j] == gms.op.num)
				cout << "O ";

		cout << endl;
	}

	cout << ' ';
	for (int i = 0; i < SIZE; i++)
		cout << ' ' << (char)(i + 'A');
	cout << endl;
}

void init(gamestate &gms) {
	//1. PLAYER'S POSITIONS AND NUMBERS
	gms.me.twrs.resize(TWRS_AMOUNT);
	gms.op.twrs.resize(TWRS_AMOUNT);

	//default: me is first player
	gms.me.twrs[0].set(4, 0);
	gms.me.twrs[1].set(4, 9);
	gms.me.twrs[2].set(0, 2);
	gms.me.twrs[3].set(0, 7);

	for (int i = 0; i < TWRS_AMOUNT; i++) {
		gms.op.twrs[i].row = SIZE - 1 - gms.me.twrs[i].row;
		gms.op.twrs[i].col = gms.me.twrs[i].col;
	}

	cin >> gms.me.num;
	gms.op.num = 1 - gms.me.num;

	if (gms.me.num == 0)
		swap(gms.me.twrs, gms.op.twrs);

	//2. FIELD
	gms.field.assign(SIZE, vector<int>(SIZE, -1));

	for (int i = 0; i < TWRS_AMOUNT; i++) {
		gms.field[gms.me.twrs[i].row][gms.me.twrs[i].col] = gms.me.num;
		gms.field[gms.op.twrs[i].row][gms.op.twrs[i].col] = gms.op.num;
	}

	//3. TIMELINE
	gms.cur_player = 0;
	gms.cur_turn = 0;
	gms.over = false;
	gms.isolated = false;

	show_field(gms);
}

bool is_game_over(const gamestate &gms)
{
	return gms.over;
}

bool is_my_move(const gamestate &gms)
{
	return gms.cur_player == gms.me.num;
}

void find_blocks(const gamestate &gms, vector<tmove> &moves, coord src, coord dst)
{
	//UP
	for (int r = dst.row + 1; r < SIZE && (gms.field[r][dst.col] == EMPTY || r == src.row && dst.col == src.col); r++)
		moves.push_back(tmove(src, dst, coord(r, dst.col)));

	//DOWN
	for (int r = dst.row - 1; r >= 0 && (gms.field[r][dst.col] == EMPTY || r == src.row && dst.col == src.col); r--)
		moves.push_back(tmove(src, dst, coord(r, dst.col)));

	//RIGHT
	for (int c = dst.col + 1; c < SIZE && (gms.field[dst.row][c] == EMPTY || dst.row == src.row && c == src.col); c++)
		moves.push_back(tmove(src, dst, coord(dst.row, c)));
	
	//LEFT
	for (int c = dst.col - 1; c >= 0 && (gms.field[dst.row][c] == EMPTY || dst.row == src.row && c == src.col); c--)
		moves.push_back(tmove(src, dst, coord(dst.row, c)));
}

void get_move(gamestate &gms)
{
	//1. Check all possible moves of our towers
	vector<tmove> moves; //m[move_num]: <src, dst, block>
	for (int t = 0; t < TWRS_AMOUNT; t++) {
		coord src (gms.me.twrs[t].row, gms.me.twrs[t].col);
		//UP
		for (int r = src.row + 1; r < SIZE && gms.field[r][src.col] == EMPTY; r++) {
			coord dst(r, src.col);
			find_blocks(gms, moves, src, dst);
		}

		//DOWN
		for (int r = src.row - 1; r >= 0 && gms.field[r][src.col] == EMPTY; r--) {
			coord dst(r, src.col);
			find_blocks(gms, moves, src, dst);
		}

		//RIGHT
		for (int c = src.col + 1; c < SIZE && gms.field[src.row][c] == EMPTY; c++) {
			coord dst(src.row, c);
			find_blocks(gms, moves, src, dst);
		}
		
		//LEFT
		for (int c = src.col - 1; c >= 0 && gms.field[src.row][c] == EMPTY; c--) {
			coord dst(src.row, c);
			find_blocks(gms, moves, src, dst);
		}
	}
	if (moves.size() == 0)
		gms.over = true;
		//game is over for us :(
	
	srand(time(0));

	LD best_coef = INT_MIN, cur_coef;
	for (auto cur_move : moves)
	{
		cur_coef = evaluate(gms, cur_move);
		if (cur_coef > best_coef)
		{
			best_coef = cur_coef;
			gms.move = cur_move;
		}
	}
}

void write_move(gamestate gms)
{
	cout << (char)(gms.move.src.col + 'A')   << gms.move.src.row;
	cout << (char)(gms.move.dst.col + 'A')   << gms.move.dst.row;
	cout << (char)(gms.move.block.col + 'A') << gms.move.block.row << endl;
}

void read_move(gamestate &gms)
{
	string input;
	cin >> input;

	gms.move.src.set  (input[1] - '0', input[0] - 'A');
	gms.move.dst.set  (input[3] - '0', input[2] - 'A');
	gms.move.block.set(input[5] - '0', input[4] - 'A');
}

void make_move(gamestate &gms)
{
	//cout << gms.move.src.row << gms.move.src.col << ' ' << gms.move.dst.row << gms.move.dst.col << ' ' << gms.move.block.row << gms.move.block.col << endl;
	
	gms.field[gms.move.dst.row][gms.move.dst.col] = gms.field[gms.move.src.row][gms.move.src.col];
	gms.field[gms.move.src.row][gms.move.src.col] = EMPTY;
	gms.field[gms.move.block.row][gms.move.block.col] = BLOCKED;

	if (gms.cur_player == gms.me.num)
		*find(gms.me.twrs.begin(), gms.me.twrs.end(), gms.move.src) = gms.move.dst;
	else
		*find(gms.op.twrs.begin(), gms.op.twrs.end(), gms.move.src) = gms.move.dst;

	gms.cur_turn++;
	gms.cur_player = 1 - gms.cur_player;

	gms.isolated = check_for_isolation(gms);
}

void game(gamestate &gms)
{
	while (!is_game_over(gms)) {
		if (is_my_move(gms)) {
			get_move(gms);
			write_move(gms);
		}
		else
			read_move(gms);

		make_move(gms);
		show_field(gms);
	}
}



int main() {
	gamestate gms;

	organise_testing_game();
	return 0;

	init(gms);

	game(gms);
}