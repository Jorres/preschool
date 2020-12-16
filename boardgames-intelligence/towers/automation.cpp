#include "types.h"

void get_player_move(gamestate &gms, int player)
{
	vector<tmove> moves; //m[move_num]: <src, dst, block>
	forn(t, 0, TWRS_AMOUNT) {
		coord src(gms.me.twrs[t].row, gms.me.twrs[t].col);
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
	if (moves.size() == 0) {
		gms.over = true;
		return;
	}
	//game is over for us :(
	srand(time(0));

	LD best_coef = INT_MIN, cur_coef;
	for (auto cur_move : moves)
	{
		if (player == 0)
			cur_coef = player_1_evaluate(gms, cur_move);
		else
			cur_coef = player_2_evaluate(gms, cur_move);
		if (cur_coef > best_coef)
		{
			best_coef = cur_coef;
			gms.move = cur_move;
		}
	}
}

void artificial_init(gamestate &gms) {
	gms.me.twrs.resize(TWRS_AMOUNT);
	gms.op.twrs.resize(TWRS_AMOUNT);

	gms.me.twrs[0].set(4, 0);
	gms.me.twrs[1].set(4, 9);
	gms.me.twrs[2].set(0, 2);
	gms.me.twrs[3].set(0, 7);

	for (int i = 0; i < TWRS_AMOUNT; i++) {
		gms.op.twrs[i].row = SIZE - 1 - gms.me.twrs[i].row;
		gms.op.twrs[i].col = gms.me.twrs[i].col;
	}

	gms.me.num = 0;
	gms.op.num = 1;

	gms.field.assign(SIZE, vector<int>(SIZE, -1));

	for (int i = 0; i < TWRS_AMOUNT; i++) {
		gms.field[gms.me.twrs[i].row][gms.me.twrs[i].col] = gms.me.num;
		gms.field[gms.op.twrs[i].row][gms.op.twrs[i].col] = gms.op.num;
	}

	gms.cur_player = 0;
	gms.cur_turn = 0;
	gms.over = false;
	gms.isolated = false;

	show_field(gms);
}

void show_static_field(const gamestate &gms, char f, char s)
{
	for (int i = SIZE - 1; i >= 0; i--) {
		cout << i << ' ';

		for (int j = 0; j < SIZE; j++)
			if (gms.field[i][j] == EMPTY)
				cout << ". ";
			else if (gms.field[i][j] == BLOCKED)
				cout << "x ";
			else if (gms.field[i][j] == 0)
				cout << f << " ";
			else if (gms.field[i][j] == 1)
				cout << s << " ";

		cout << endl;
	}

	cout << ' ';
	for (int i = 0; i < SIZE; i++)
		cout << ' ' << (char)(i + 'A');
	cout << endl;
}

void organise_testing_game() {
	srand(time(0));

	gamestate gms;
	artificial_init(gms);
	cout << "player 0 - experimental features" << endl;
	cout << "player 1 - stable logical alpha 1.0" << endl;
	cout << "who do you want to make move first?" << endl;
	int cur_int;
	cin >> cur_int;
	char f, s;
	if (cur_int == 0) {
		cout << "first turn for experimental" << endl;
		f = 'E'; s = 'S';
	}
	else {
		cout << "first turn for standart" << endl;
		f = 'S'; s = 'E';
	}

	while (true) {
		get_player_move(gms, cur_int);
		if (gms.over) {
			if (cur_int == 0)
				cout << "Lose of experimental intelligence" << endl;
			else
				cout << "Lose of standart intelligence" << endl;
			while (true) {}
		}
		make_move(gms);
		cur_int = 1 - cur_int;
		show_static_field(gms, f, s);
		cout << endl;
		swap(gms.me.twrs, gms.op.twrs);
		swap(gms.me.num, gms.op.num);
	}
}
