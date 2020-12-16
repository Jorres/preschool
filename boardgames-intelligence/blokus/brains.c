#include "types_constants.h"
#include <string.h>

int is_in(int row, int col)
{
	return row >= 0 && row < FSIZE && col >= 0 && col < FSIZE;
}

int no_walls_around(const tgamestate *gms, struct tplayer p, int row, int col)
{
	return (!is_in(row + 1, col) || is_in(row + 1, col) && gms->field[row + 1][col] != p.num) &&
		(!is_in(row - 1, col) || is_in(row - 1, col) && gms->field[row - 1][col] != p.num) &&
		(!is_in(row, col + 1) || is_in(row, col + 1) && gms->field[row][col + 1] != p.num) &&
		(!is_in(row, col - 1) || is_in(row, col - 1) && gms->field[row][col - 1] != p.num);
}

int is_ditch(const tgamestate *gms, struct tplayer p, int row, int col)
{
	return gms->field[row][col] == p.num + DITCH;
}

int is_corner_around(const tgamestate *gms, struct tplayer p, int row, int col)
{
	return (is_in(row + 1, col + 1) && gms->field[row + 1][col + 1] == p.num) ||
		(is_in(row + 1, col - 1) && gms->field[row + 1][col - 1] == p.num) ||
		(is_in(row - 1, col + 1) && gms->field[row - 1][col + 1] == p.num) ||
		(is_in(row - 1, col - 1) && gms->field[row - 1][col - 1] == p.num);
}

int is_empty(const tgamestate *gms, struct tplayer p, int row, int col)
{
	return gms->field[row][col] == EMPTY || gms->field[row][col] == (1 - p.num) + DITCH;
}

void count_corners(const tgamestate *gms, struct tplayer p, tcoord *corn, int *c)
{
	int i, j, cnt = 0;

	for (i = 0; i < FSIZE; i++)
		for (j = 0; j < FSIZE; j++)
			if (is_empty(gms, p, i, j) && no_walls_around(gms, p, i, j) && is_corner_around(gms, p, i, j))
			{
				corn[cnt].i = i;
				corn[cnt++].j = j;
			}
	*c = cnt;
}

int can_be_placed(const tgamestate *gms, struct tplayer p, tcoord corn, struct tsim sim, int n, int target)
{
	int i;
	tcoord benchmark = sim.cells[target];


	for (i = 0; i < n; i++)
	{
		sim.cells[i].i += corn.i - benchmark.i;
		sim.cells[i].j += corn.j - benchmark.j;

		if (!(is_in(sim.cells[i].i, sim.cells[i].j) &&
			is_empty(gms, p, sim.cells[i].i, sim.cells[i].j)))
			return 0;
	}

	return 1;
}

void set_temp_fig(tgamestate *gms, tcoord corn, int num, struct tsim sim, int am, int val)
{
	int shifti = corn.i - sim.cells[num].i,
		shiftj = corn.j - sim.cells[num].j,
		i;

	for (i = 0; i < am; i++)
		gms->field[sim.cells[i].i + shifti][sim.cells[i].j + shiftj] = val;
}

void go(tgamestate *gms, tqueue *q, int si, int sj, int ni, int nj, int clr_ar[][FSIZE], struct tplayer pl, int val)
{
	if (ni >= 0 && ni < FSIZE && nj >= 0 && nj < FSIZE
		&& gms->field[ni][nj] != DITCH + pl.num
		&& gms->field[ni][nj] != pl.num
		&& gms->field[ni][nj] != 1 - pl.num
		&& (clr_ar[ni][nj] == -1 || clr_ar[ni][nj] > clr_ar[si][sj] + val)
		&& no_walls_around(gms, pl, ni, nj))
	{
		tcoord p = { ni, nj };
		clr_ar[ni][nj] = clr_ar[si][sj] + val;
		enqueue(q, p);
	}
}

tcoord dequeue(tqueue *q)
{
	if (q->head == QSIZE - 1)
	{
		q->head = 0;
		return q->a[QSIZE - 1];
	}
	else
	{
		q->head++;
		return q->a[q->head - 1];
	}
}


void color(tgamestate *gms, int clr_ar[][FSIZE], struct tplayer pl)
{
	int c_am, i, j;
	tqueue q;
	tcoord corn[FSIZE * FSIZE], p;

	makenull(&q);
	memset(clr_ar, -1, sizeof clr_ar[0][0] * FSIZE * FSIZE);

	count_corners(gms, pl, corn, &c_am);

	for (i = 0; i < c_am; i++)
	{
		enqueue(&q, corn[i]);
		clr_ar[corn[i].i][corn[i].j] = 0;
	}

	while (!empty(&q))
	{
		p = dequeue(&q);
		for (i = p.i - 1; i <= p.i + 1; i++)
			for (j = p.j - 1; j <= p.j + 1; j++)
				if (i == p.i || j == p.j)
					go(gms, &q, p.i, p.j, i, j, clr_ar, pl, SIDE_STEP);
				else if (pl.has_figure[20])
					go(gms, &q, p.i, p.j, i, j, clr_ar, pl, CORNER_STEP);
	}
}

void save_move(struct tmove *move, struct tsim sim, int am, tcoord corn, int num, int fignum)
{
	int shifti = corn.i - sim.cells[num].i,
		shiftj = corn.j - sim.cells[num].j,
		i;
	move->amount = am;
	move->fig = fignum;
	for (i = 0; i < am; i++)
	{
		move->a[i].i = sim.cells[i].i + shifti;
		move->a[i].j = sim.cells[i].j + shiftj;
	}
}

double max(double a, double b)
{
	return (a > b) ? a : b;
}

int count_joints(tgamestate *gms, struct tplayer pl, int si, int sj)
{
	int i, j, ans = 0;
	for (i = si - 1; i <= si + 1; i++)
		for (j = sj - 1; j <= sj + 1; j++)
			if (is_in(i, j) && ((i == si) ^ (j == sj)) && is_empty(gms, pl, i, j) && !is_ditch(gms, pl, i, j))
				ans++;

	return ans;
}

double how_useful_safe_corner(tgamestate *gms, int ci, int cj)
{
	int i, j, space_cells = 0, space_joints = 0;

	int walls_near =
		(is_ditch(gms, gms->me, ci - 1, cj) || gms->field[ci][cj] == gms->op.num) +
		(is_ditch(gms, gms->me, ci + 1, cj) || gms->field[ci][cj] == gms->op.num) +
		(is_ditch(gms, gms->me, ci, cj - 1) || gms->field[ci][cj] == gms->op.num) +
		(is_ditch(gms, gms->me, ci, cj + 1) || gms->field[ci][cj] == gms->op.num)
		;

	for (i = ci - 2; i <= ci + 2; i++)
		for (j = cj - 2; j <= cj + 2; j++)
			if (is_in(i, j) && is_empty(gms, gms->me, i, j) && no_walls_around(gms, gms->me, i, j))
			{
				space_cells++;
				space_joints += count_joints(gms, gms->me, i, j);
			}


	return	((double)(space_joints - space_cells) / space_cells) * STANDART_CORNER * (NEEDED_OPENESS - walls_near);
	/*
	walls_near == 4 -> not a good turn, k = -0.5
	walls_near == 3 -> plus, bot not as much, k = 0.5
	walls_near == 2 -> wonderful, k =s 1.5
	*/
}

double evaluate(tgamestate *gms, tgamestate *turned_gms, int meB[][FSIZE], int opB[][FSIZE], int meA[][FSIZE], int opA[][FSIZE], int cells_am)
{
	double ans = 0.0;

	int i, j, f_cam, s_cam;
	tcoord fcorn[FSIZE * FSIZE], scorn[FSIZE * FSIZE];
	int corner_field[FSIZE][FSIZE] = { 0 };

	count_corners(gms, gms->me, fcorn, &f_cam);
	count_corners(turned_gms, gms->me, scorn, &s_cam);

	for (i = 0; i < f_cam; i++)
		corner_field[fcorn[i].i][fcorn[i].j] += 1;
	for (i = 0; i < s_cam; i++)
		corner_field[scorn[i].i][scorn[i].j] += 2;

	for (i = 0; i < FSIZE; i++)
		for (j = 0; j < FSIZE; j++)
			if (corner_field[i][j] == 2 && !no_walls_around(turned_gms, turned_gms->op, i, j))
				ans += how_useful_safe_corner(turned_gms, i, j);


	for (i = 0; i < FSIZE; i++)
		for (j = 0; j < FSIZE; j++)
			if (opA[i][j] == CLR_INF && opB[i][j] != CLR_INF)
				// value of cut forever cell for enemy
				ans += OP_CLOSED_CELL;
			else
			{
				if (is_empty(turned_gms, gms->me, i, j)) // how much had we come closer to some space
					ans += (double)CLOSER_WE  * (meB[i][j] - meA[i][j]) * max(0.1, 2 - (opB[i][j]) / CL_IMPORTANCE);

				if (is_empty(turned_gms, gms->op, i, j)) // how much enemy had become farther from some space
					ans += (double)FARTHER_OP  * (opA[i][j] - opB[i][j]) * max(0.1, 2 - (opB[i][j]) / CL_IMPORTANCE);
			}

	// value of taken cells
	ans += CELL_PRICE * turned_gms->cur_turn * turned_gms->cur_turn * cells_am;

	return ans;
}


void get_move(tgamestate *gms)
{
	int c_am, cur_corn, cur_fig, cur_sim, cur_cell;
	double maxK = INF, t;

	int clr_bef_me[FSIZE][FSIZE], clr_bef_op[FSIZE][FSIZE],
		clr_af_me[FSIZE][FSIZE], clr_af_op[FSIZE][FSIZE];

	tcoord corn[FSIZE * FSIZE];

	tgamestate turned_gms = *gms;

	count_corners(gms, gms->me, corn, &c_am);

	color(gms, clr_bef_me, gms->me);
	color(gms, clr_bef_op, gms->op);

	for (cur_corn = 0; cur_corn < c_am; cur_corn++)
		for (cur_fig = 0; cur_fig < FIGAMOUNT; cur_fig++)
			if (gms->me.has_figure[cur_fig])
				for (cur_sim = 0; cur_sim < figs[cur_fig].s; cur_sim++)
					for (cur_cell = 0; cur_cell < figs[cur_fig].n; cur_cell++)
						if (can_be_placed(gms, gms->me, corn[cur_corn], figs[cur_fig].sim[cur_sim], figs[cur_fig].n, cur_cell))
						{
							set_temp_fig(&turned_gms, corn[cur_corn], cur_cell, figs[cur_fig].sim[cur_sim], figs[cur_fig].n, gms->me.num);


							color(&turned_gms, clr_af_me, turned_gms.me);
							color(&turned_gms, clr_af_op, turned_gms.op);

							t = evaluate(gms, &turned_gms, clr_bef_me, clr_bef_op, clr_af_me, clr_af_op, figs[cur_fig].n);

							if (maxK < t)
							{
								maxK = t;
								save_move(&(gms->move), figs[cur_fig].sim[cur_sim], figs[cur_fig].n, corn[cur_corn], cur_cell, cur_fig);
							}

							set_temp_fig(&turned_gms, corn[cur_corn], cur_cell, figs[cur_fig].sim[cur_sim], figs[cur_fig].n, EMPTY);
						}

	if (maxK == INF)
	{
		gms->my_fin = 1;
		gms->move.amount = 0;
	}
}