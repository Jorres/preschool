#include "types_constants.h"

void makenull(tqueue *q)
{
	q->head = q->tail = 0;
}

int empty(tqueue *q)
{
	return q->head == q->tail;
}

/*tcoord dequeue(tqueue *q)
{
q->head++;
return q->a[q->head - 1];
}*/

void enqueue(tqueue *q, tcoord p)
{
	if (q->tail == QSIZE - 1)
	{
		q->tail = 0;
		q->a[QSIZE - 1] = p;
	}
	else
		q->a[q->tail++] = p;
}