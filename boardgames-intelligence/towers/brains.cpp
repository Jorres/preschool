#include "types.h"

/*
things to note - it works too long.
interestingly, switching off bfs made him an interesting player

*/

bool exists(int row, int col) {
	return row >= 0 && row < SIZE && col >= 0 && col < SIZE;
}

void bfs(gamestate &gms, matrix &dist, vector<coord> &twrs) {
	dist.assign(SIZE, vector<int>(SIZE, INF));
	queue<coord> q;
	for (auto &t : twrs) {
		q.push(t);
		dist[t.row][t.col] = 0;
	} 
	
	while (!q.empty()) {
		coord c = q.front();
		q.pop();

		int pdist = dist[c.row][c.col] + 1;
		forn(row, c.row + 1, SIZE) {
			if (gms.field[row][c.col] != EMPTY)
				break;
			dist[row][c.col] = pdist;
		}
		forn(col, c.col + 1, SIZE) {
			if (gms.field[c.row][col] != EMPTY)
				break;	
			dist[c.row][col] = pdist;
		}
		downto(row, c.row - 1, 0) {
			if (gms.field[row][c.col] != EMPTY)
				break;
			dist[row][c.col] = pdist;
		}
		downto(col, c.col - 1, 0) {
			if (gms.field[c.row][col] != EMPTY)
				break;
			dist[c.row][col] = pdist;
		}
	}
}

LD evaluate_capturing(gamestate &gms, matrix &dist, vector<coord> &twrs) { 
	LD res = 0;

	int distsum = 0;
	forn(i, 0, twrs.size() - 1)
		forn(j, i + 1, twrs.size())
			distsum += abs(twrs[i].row - twrs[j].row) + abs(twrs[i].col - twrs[j].col);
	
	LD single_cell_value = 1;
	if (distsum > 30)
		single_cell_value = 2;
	else if (distsum > 20)
		single_cell_value = 1.5;
	else if (distsum < 10)
		single_cell_value = 0.5;


	forn(r, 0, SIZE)
		forn(c, 0, SIZE)
			if (dist[r][c] == 1)
				res += single_cell_value;

	forn(i, 0, twrs.size()) {
		int cur = 0;
		coord t = twrs[i];
		for (int row = t.row + 1; row < SIZE && gms.field[row][t.col] == EMPTY; row++, cur++);
		for (int row = t.row - 1; row >= 0   && gms.field[row][t.col] == EMPTY; row--, cur++);
		for (int col = t.col + 1; col < SIZE && gms.field[t.row][col] == EMPTY; col++, cur++);
		for (int col = t.col - 1; col >= 0   && gms.field[t.row][col] == EMPTY; col--, cur++);
		res += cur;
	}
	
	return res;
}

LD evaluate(gamestate &gms, const tmove &move) {
	LD ans = 0;
	if (gms.isolated) {
	}
	else {
		gamestate tgms = gms;
		tgms.move = move;
		make_move(tgms);

		matrix dist_me, dist_op;
		bfs(tgms, dist_op, tgms.op.twrs);
		bfs(tgms, dist_me, tgms.me.twrs);

		ans += evaluate_capturing(tgms, dist_me, tgms.me.twrs);
		ans -= evaluate_capturing(tgms, dist_op, tgms.op.twrs);
	}

	return ans;
}

bool check_for_isolation(const gamestate &gms) {
	return false;
}