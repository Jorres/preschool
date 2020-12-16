#include "types_constants.h"

#include <stdio.h>
#include <string.h>

void write_move(const tgamestate *gms)
{
	int i, am = gms->move.amount;

	printf("%d", am);
	for (i = 0; i < am; i++)
		printf(" %c%c", gms->move.a[i].i + 'A', gms->move.a[i].j + 'A');
	putchar('\n');

	fflush(stdout);
}

void show_field(const tgamestate *gms)
{
	int i, j;
	for (i = FSIZE - 1; i >= 0; i--)
	{
		printf("%c|", i + 'A');
		for (j = 0; j < FSIZE; j++)
			switch (gms->field[i][j])
			{
			case 0: printf("@ "); break;
			case 1: printf("# "); break;
			default: printf(". "); break;
			}
		printf("\n");
	}
	printf("  ");
	for (i = 0; i < FSIZE; i++)
		printf("%c ", i + 'A');
	printf("\n");
}

int is_my_move(tgamestate *gms)
{
	return gms->cur_player == gms->me.num || gms->op_fin;
}

void read_move(tgamestate *gms)
{
	int n, i;
	char t[10];

	scanf("%d", &n);

	gms->move.amount = n;

	if (n == 0)
		gms->op_fin = 1;
	else
	{
		for (i = 0; i < n; i++)
		{
			char ci, cj;
			scanf(" %c%c", &ci, &cj);
			gms->move.a[i].i = ci - 'A';
			gms->move.a[i].j = cj - 'A';
		}
		gets(t);

		gms->move.fig = recognize_fig(gms->move);
	}
}

void mark_ditch(tgamestate *gms, int p, int i, int j)
{
	if (is_in(i, j))
		if (gms->field[i][j] == (1 - p) + DITCH)
			gms->field[i][j] = 2 * DITCH;
		else if (gms->field[i][j] == EMPTY)
			gms->field[i][j] = p + DITCH;
}

void make_move(tgamestate *gms)
{
	int i;

	if (gms->op_fin == 1)
		gms->cur_player = gms->me.num;

	for (i = 0; i < gms->move.amount; i++)
	{
		tcoord m = gms->move.a[i];
		gms->field[m.i][m.j] = gms->cur_player;

		mark_ditch(gms, gms->cur_player, m.i + 1, m.j);
		mark_ditch(gms, gms->cur_player, m.i - 1, m.j);
		mark_ditch(gms, gms->cur_player, m.i, m.j + 1);
		mark_ditch(gms, gms->cur_player, m.i, m.j - 1);
	}

	if (gms->cur_player == gms->me.num)
		gms->me.has_figure[gms->move.fig] = 0;
	else
		gms->op.has_figure[gms->move.fig] = 0;

#ifdef LOG_ON
	write_in_log(gms);
#endif

	gms->cur_player = 1 - gms->cur_player;

	gms->cur_turn++;
}

int is_game_over(const tgamestate *gms)
{
	return gms->my_fin;
}

void game(tgamestate *gms)
{
	while (!is_game_over(gms))
	{
		if (is_my_move(gms))
		{
			get_move(gms);
			write_move(gms);
		}
		else
			read_move(gms);

		if (!is_game_over(gms))
			make_move(gms);

//#ifdef DEBUG  FORCED_ALWAYS_SHOW
		show_field(gms);
//#endif
	}
}

void init(tgamestate *gms)
{
	int i;
	struct tmove f_move, s_move;

	memset(gms->field, EMPTY, sizeof gms->field[0][0] * FSIZE * FSIZE);

	init_fig(figs);

	gms->cur_player = 0;
	gms->my_fin = gms->op_fin = gms->cur_turn = 0;

	for (i = 0; i < FIGAMOUNT; i++)
		gms->me.has_figure[i] = gms->op.has_figure[i] = 1;

	read_move(gms);
	f_move = gms->move;

	read_move(gms);
	s_move = gms->move;

	scanf("%d", &(gms->me.num));
	gms->op.num = 1 - gms->me.num;

	gms->move = f_move;
	make_move(gms);
	gms->move = s_move;
	make_move(gms);


#ifdef LOG_ON
	fprintf(log_field, "%d\n", gms->me.num);
	fprintf(log_moves, "%d\n", gms->me.num);
	fprintf(log_comp_moves, "%d\n", gms->me.num);
#endif

#ifdef DEBUG
	show_field(gms);
#endif
}

int main()
{
	tgamestate gms;

#ifdef LOG_ON
	open_logs();
#endif

	init(&gms);

	game(&gms);

#ifdef LOG_ON
	close_logs();
#endif

	return 0;
}