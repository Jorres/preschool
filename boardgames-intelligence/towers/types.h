#ifndef TYPES_CONSTANTS_H
#define TYPES_CONSTANTS_H

#pragma GCC optimize ("unroll-loops")
#pragma GCC optimize ("Ofast")

#include <iostream>
#include <vector>
#include <algorithm>
#include <set>
#include <queue>
#include <climits>
#include <string>
#include <cmath>
#include <ctime> //off then not a random
using namespace std;

//DIRECTIONS ARE THE SAME AS R IN DA DOCUMENT (!!!)

const int SIZE = 10;
const int TWRS_AMOUNT = 4;
const int EMPTY = -1;
const int BLOCKED = -2;

typedef vector<vector<int>> matrix;
typedef long double LD;
typedef long long LL;

struct coord {
	int row, col;

	coord() {}
	coord(int r, int c) { row = r; col = c; }

	void set(int r, int c) { row = r; col = c; }
	bool operator== (coord crd) const { return row == crd.row && col == crd.col; }
};

struct tmove {
	coord src, dst, block;

	tmove() {}
	tmove(coord s, coord d, coord b) { src = s; dst = d; block = b; }
};

struct player {
	int num;
	vector<coord> twrs;
};

struct gamestate {
	matrix field;
	player me, op;

	tmove move;

	int cur_player, cur_turn;

	bool over;
	bool isolated;
};
/* SENSE CONSTANTS */
const int INF = INT_MAX;

/* PROTOTYPES */

LD evaluate(gamestate &, const tmove &);
void init(gamestate &);
void organise_testing_game();
void make_move(gamestate &);
bool check_for_isolation (const gamestate &);
void find_blocks(const gamestate &, vector<tmove> &, coord, coord);

LD player_1_evaluate(gamestate &, const tmove &);
LD player_2_evaluate(gamestate &, const tmove &);

void show_field(const gamestate &);


/* CODE SHORTENING */

#define forn(i, a, b) for (int i = a; i < b; ++i)
#define downto(i, a, b) for (int i = a; i >= b; --i)
#define all(a) (a).begin(), (a).end()
#define pb push_back 
#define mp make_pair
#define Fi first
#define Se second

#endif