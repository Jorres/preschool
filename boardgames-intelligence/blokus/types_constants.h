#ifndef TYPES_CONSTANTS_H
#define TYPES_CONSTANTS_H


#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>

#define FSIZE 14
#define QSIZE 2 * FSIZE * FSIZE
#define FIGSIZE 5
#define FIGAMOUNT 21
#define EMPTY -1 
#define DITCH 2 
#define INF -1000000.0 // used in get_move for best move

#define DEBUG1
#define LOG_ON1

#ifdef LOG_ON
FILE *number, *log_field, *log_moves, *log_comp_moves;
#endif

struct coord {
	int i, j;
};

typedef struct coord tcoord;


struct tmove {
	int amount;
	int fig;
	tcoord a[5];
};

struct tfig {
	struct tsim {
		tcoord cells[FIGSIZE];
	} sim[8];

	int n, s;
};

struct gamestate {
	int field[FSIZE][FSIZE];

	struct tmove move;

	struct tplayer {
		int num, has_figure[FIGAMOUNT];
	} me, op;

	int cur_player, my_fin, op_fin, cur_turn;
};

typedef struct gamestate tgamestate;

struct tfig figs[FIGAMOUNT];


/*
queue for bfs in get_move
*/

struct queue {
	tcoord a[QSIZE];
	int head, tail;
};


typedef struct queue tqueue;

/*
intellect evaluation
*/

#define FARTHER_OP 10.0
#define CLOSER_WE 6.0

#define CL_IMPORTANCE 16 

/*
CL_IMPORTANCE
6 - only strives to take up closest cells to enemy

14 - has more rational spread of cells

16 - sometimes too far from enemy
*/

#define STANDART_CORNER 1000
#define NEEDED_OPENESS 3.5

#define SIDE_STEP 1
#define CORNER_STEP 4

#define OP_CLOSED_CELL 200

#define CELL_PRICE 4

#define CLR_INF -1 // do not change, used in memset

#endif
