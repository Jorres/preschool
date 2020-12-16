function SmartPlace (const gms: TGameState; const x, y, tp: Integer): Boolean;

function EdgeSmartPlace(const gms: TGameState; const x, y, tp: Integer): Boolean;

var
        t: Boolean;

begin
        with gms do
        begin
        if tp = 1 then // hor
        begin
                if (x = 1) and (y = 1) then
                        t := field[2, 2].left or field[2, 3].left or field[2, 3].down
                else if (y = 1) and (x > 1) and (x < 8) then // левая сторона
                begin
                        with gms.field[x, y + 1] do
                                t := left or right;

                        with gms.field[x + 1, y + 1] do
                                t := t or left or right;

                        t := t or field[x,y + 2].up
                end
                else if (x = 8) and (y = 1) then
                        t := field[8, 2].left or field[8, 2].right or field[8, 3].up
                else if (y > 1) and (y < 8) and (x = 8) then // нижняя сторона
                begin
                        with gms.field[x, y - 1] do
                                t := up or right;

                        with gms.field[x, y + 1] do
                                t := t or left or right;

                        t := t or field[x, y + 2].up
                end
                else if (x = 8) and (y = 8) then
                        t := field[8, 7].up or field[8, 7].right or field[8, 8].right
                else if (x > 1) and (x < 8) and (y = 8) then // правая сторона
                begin
                        with gms.field[x, y] do
                                t := left or right;

                        with gms.field[x + 1, y] do
                                t := t or left or right;

                        t := t or field[x, y - 1].up
                end
                else if (x = 1) and (y = 8) then
                        t := field[2, 8].left or field[2, 8].right or field[2, 7].down  // верхний правый угол
                else if (y > 1) and (y < 8) and (x = 1) then // верхняя сторона
                begin
                        with gms.field[x + 1, y - 1] do
                                t := down or right;

                        with gms.field[x + 1, y + 1] do
                                t := t or left or right;

                        t := t or field[x, y + 2].up
                end
        end
        else     //vert
        begin
                if (x = 1) and (y = 1) then
                        t := field[2, 2].up or field[3, 2].down or field[3, 2].left  // верхний левый угол
                else if (y = 1) and (x > 1) and (x < 8) then // левая сторона

                begin
                        with gms.field[x - 1, y + 1] do
                                t := left or up;

                        with gms.field[x + 1, y + 1] do
                                t := t or up or down;

                        t := t or field[x + 2, y].right
                end
                else if (x = 8) and (y = 1) then
                        t := field[7, 2].left or field[8, 2].up or field[8, 2].down // нижний левый угол
                else if (y > 1) and (y < 8) and (x = 8) then // нижняя сторона
                begin
                        with gms.field[x, y] do
                                t := down or up;

                        with gms.field[x, y + 1] do
                                t := t or down or up;

                        t := t or field[x - 1, y + 1].right
                end
                else if (x = 8) and (y = 8) then
                        t := field[8, 8].down or field[8, 8].up or field[7, 8].right // нижний правый угол
                else if (x > 1) and (x < 8) and (y = 8) then // правая сторона
                begin
                        with gms.field[x, y] do
                                t := up or down;

                        with gms.field[x + 2, y] do
                                t := t or down or right;

                        t := t or field[x - 1, y].right
                end
                else if (x = 1) and (y = 8) then
                        t := field[2, 8].up or field[2, 8].down or field[3, 8].right // верхний правый угол
                else if (y > 1) and (y < 8) and (x = 1) then // верхняя сторона
                begin
                        with gms.field[x + 1, y] do
                                t := up or down;

                        with gms.field[x + 1, y + 1] do
                                t := t or up or down;

                        t := t or field[x + 2, y].right
                end
        end
        end;

        with gms do
        t := t or ((me[1] = x + 1) and (me[2] = y)) or ((me[1] = x) and (me[2] = y + 1)) or
             ((op[1] = x + 1) and (op[2] = y)) or ((op[1] = x) and (op[2] = y + 1))
             or ((me[1] = x) and (me[2] = y)) or ((op[1] = x) and (op[2] = y))
             or ((me[1] = x + 1) and (me[2] = y + 1)) or ((op[1] = x + 1) and (op[2] = y + 1));

        EdgeSmartPlace := t;
end;

var t: Boolean;
begin
        if (x > 1) and (x < 8) and (y > 1) and (y < 8) then
        begin
                if tp = 1 then // hor
                begin
                        with gms.field[x, y] do
                                t := left or right or down;

                        with gms.field[x + 1, y - 1] do
                                t := t or up or right;

                        with gms.field[x + 1, y + 1] do
                                t := t or left or right;

                        with gms.field[x, y + 2] do
                                t := t or left or down
                end
                else // vert
                begin
                        with gms.field[x, y] do
                                t := up or down;

                        with gms.field[x - 1, y + 1] do
                                t := t or left or up;

                        with gms.field[x + 2, y] do
                                t := t or down or right;

                        with gms.field[x + 1, y + 1] do
                                t := t or up or down;
                end;


        with gms do
        t := t or ((me[1] = x + 1) and (me[2] = y)) or ((me[1] = x) and (me[2] = y + 1)) or
             ((op[1] = x + 1) and (op[2] = y)) or ((op[1] = x) and (op[2] = y + 1))
             or ((me[1] = x) and (me[2] = y)) or ((op[1] = x) and (op[2] = y))
             or ((me[1] = x + 1) and (me[2] = y + 1)) or ((op[1] = x + 1) and (op[2] = y + 1));

        SmartPlace := t
        end
        else
        SmartPlace := EdgeSmartPlace(gms, x, y, tp)
end;

procedure MoveDraught (const gms: TGameState; down, right: Integer; var curPl: TPos);
begin
        curPl[1] := curPl[1] - down;
        curPl[2] := curPl[2] + right
end;

function noPerp (const gms: TGameState; const x, y: Integer): Boolean;
var
        tup, tright: Boolean;
begin
        noPerp := FALSE;
        tup := gms.field[x, y].up or gms.field[x, y + 1].up;
        tright := gms.field[x, y].right or gms.field[x + 1, y].right;

        if tup or tright then
                Exit;

        noPerp := TRUE
end;

procedure InitWall (var gms: TGameState; const x, y, tp: Integer; const val: Boolean; var PerpAmount: Integer);
begin
        if tp = 1 then begin
                gms.field[x, y].down := val;
                gms.field[x, y + 1].down  := val;
                gms.field[x + 1, y].up := val;
                gms.field[x + 1, y + 1].up := val
        end
        else
        begin
                gms.field[x, y].right := val;
                gms.field[x + 1, y].right  := val;
                gms.field[x, y + 1].left := val;
                gms.field[x + 1, y + 1].left := val
        end;

        if val then
                Dec (PerpAmount)
        else
                Inc (PerpAmount)
end;

procedure ChangeMove (var move: TMove; const tp, row1, col1, row2, col2: Integer);
begin
        move[2] := row1;
        move[3] := col1;

        if tp = DRAUGHT then
                move[1] := DRAUGHT
        else
        begin
                move[1] := PARTITION;
                move[4] := row2;
                move[5] := col2
        end;
end;

procedure Bfs (const gms: TGameState; var myway, opway: Integer);

type
        TLine = record
                l : array [1..SIZE*SIZE] of TPos;
                head : Integer;
                tail : Integer
        end;

        TTable = array [1..SIZE, 1..SIZE] of Integer;

procedure WriteToLine (var line : TLine; p : TPos);
begin
        line.l[line.tail] := p;
        Inc (line.tail)
end;

procedure ReadFromLine (var line : TLine; var p : TPos);
begin
        p := line.l[line.head];
        Inc (line.head)
end;

procedure WriteWave (var a : TTable; var line : TLine; i, j, w : Integer);
var
        p : TPos;
begin
        if a[i, j] = -1 then begin
                a[i, j] := w;

                p[1] := i;
                p[2] := j;

                WriteToLine (line, p)
        end
end;

procedure GeneratePath (var a : TTAble; pos : TPos);
var
        line : TLIne;
        p : TPos;

begin
        FillChar (a, SizeOf (a), Byte (-1));
        a[pos[1], pos[2]] := 0;

        line.head := 1;
        line.tail := 1;

        WriteToLine (line, pos);

        while line.head <> line.tail do begin
                ReadFromLine (line, p);

                if not gms.field[p[1], p[2]].right then
                        WriteWave (a, line, p[1], p[2] + 1, a[p[1], p[2]] + 1);

                if not gms.field[p[1], p[2]].left then
                        WriteWave (a, line, p[1], p[2] - 1, a[p[1], p[2]] + 1);

                if not gms.field[p[1], p[2]].up then
                        WriteWave (a, line, p[1] + 1, p[2], a[p[1], p[2]] + 1);

                if not gms.field[p[1], p[2]].down then
                        WriteWave (a, line, p[1] - 1, p[2], a[p[1], p[2]] + 1);
        end;
end;

var
        a : TTable;
        min, i, j : Integer;
begin
        GeneratePath (a, gms.me);
        min := SIZE*SIZE;
        for i := 1 to SIZE do
                if gms.player = FIRST then
                begin
                        if a[9, i] < min then
                                min := a[9, i];
                end
                else begin
                        if a[1, i] < min then
                                min := a[1, i];
                end;
        myway := min;

        GeneratePath (a, gms.op);
        min := SIZE*SIZE;
        for i := 1 to SIZE do
                if gms.player = FIRST then
                begin
                        if a[1, i] < min then
                                min := a[1, i]
                end
                else
                        if a[9, i] < min then
                                min := a[9, i];

        opway := min
end;

function OpUp (const gms: TGameState; curPl, curOp: TPos): Boolean;
begin
        OpUp := (curPl[1] + 1 = curOp[1]) and (curPl[2] = curOp[2]) and not gms.field[curPl[1], curPl[2]].up
end;

function OpDown (const gms: TGameState; curPl, curOp: TPos): Boolean;
begin
        OpDown := (curPl[1] - 1 = curOp[1]) and (curPl[2] = curOp[2]) and not gms.field[curPl[1], curPl[2]].down
end;

function OpLeft (const gms: TGameState; curPl, curOp: TPos): Boolean;
begin
        OpLeft := (curPl[1] = curOp[1]) and (curPl[2] - 1 = curOp[2]) and not gms.field[curPl[1], curPl[2]].left
end;

function OpRight (const gms: TGameState; curPl, curOp: TPos): Boolean;
begin
        OpRight := (curPl[1] = curOp[1]) and (curPl[2] + 1 = curOp[2]) and not gms.field[curPl[1], curPl[2]].right
end;

procedure Turn (var gms: TGameState; turncnt: Integer);

var
        i, j, mefn, opfn, curPerp, m, o: Integer;
        curOp, curPl: TPos;

begin
        if turncnt = BOTTOM then
        begin
                Bfs (gms, mefn, opfn);
                m := mefn - mest;
                o := opfn - opst;

                cost := m * o; //считаем!
                Inc (cntturns);
                Exit
        end;

        if turncnt mod 2 = 1 then
        begin
                curOp := gms.me;
                curPl := gms.op;
                curPerp := EnemyPerpAmount
        end
        else
        begin
                curOp := gms.op;
                curPl := gms.me;
                curPerp := PerpAmount
        end;

        for i := 1 to SIZE - 1 do
                for j := 1 to SIZE - 1 do
                begin
                        if noPerp (gms, i, j) then
                                if SmartPlace (gms, i, j, 1) and (curPerp > 0) then
                                begin
                                        InitWall(gms, i, j, 1, TRUE, curPerp);
                                        Turn (gms, turncnt + 1);
                                        InitWall(gms, i, j, 1, FALSE, curPerp);
                                        RedoWalls(gms)
                                end;

                        if noPerp (gms, i, j) then
                                if SmartPlace (gms, i, j, 1) and (curPerp > 0) then
                                begin
                                        InitWall(gms, i, j, 2, TRUE, curPerp);
                                        Turn (gms, turncnt + 1);
                                        InitWall(gms, i, j, 2, FALSE, curPerp);
                                        RedoWalls(gms)
                                end
                end;


        with gms.field[curOp[1], curOp[2]] do
                if OpUp (gms, curPl, curOp) then
                begin
                        if up then
                                if left then //Можем сходить вверх вправо
                                begin
                                        MoveDraught (gms, -1, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, -1, curPl)
                                end
                                else if right then //Можем сходить вверх влево
                                begin
                                        MoveDraught (gms, -1, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, 1, curPl)
                                end
                                else //Можем сходить и туда и туда
                                begin
                                        MoveDraught (gms, -1, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, -1, curPl);

                                        MoveDraught (gms, -1, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, 1, curPl)
                                end
                        else //Можем сходить на 2 клетки вверх
                        begin
                                MoveDraught (gms, -2, 0, curPl);
                                Turn (gms, turncnt + 1);
                                MoveDraught (gms, 2, 0, curPl)
                        end;

                        with gms.field[curPl[1], curPl[2]] do
                        begin
                                if not left then //влево
                                begin
                                        MoveDraught (gms, 0, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 0, 1, curPl)
                                end;

                                if not right then //вправо
                                begin
                                        MoveDraught (gms, 0, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 0, -1, curPl)
                                end;

                                if not down then //вниз
                                begin
                                        MoveDraught (gms, 1, 0, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, 0, curPl)
                                end
                        end
                end
                else if OpDown (gms, curPl, curOp) then
                begin
                        if down then
                                if left then //можем сходить вниз вправо
                                begin
                                        MoveDraught (gms, 1, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, -1, curPl)
                                end
                                else if gms.field[curOp[1], curOp[2]].right then //можем сходить вниз влево
                                begin
                                        MoveDraught (gms, 1, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, 1, curPl)
                                end
                                else //можем сходить и туда и туда
                                begin
                                        MoveDraught (gms, 1, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, -1, curPl);

                                        MoveDraught (gms, 1, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, 1, curPl)
                                end
                        else //Можем сходить на 2 клетки вниз
                        begin
                                MoveDraught (gms, 2, 0, curPl);
                                Turn (gms, turncnt + 1);
                                MoveDraught (gms, -2, 0, curPl)
                        end;


                        with gms.field[curPl[1], curPl[2]] do
                        begin
                                if not left then //влево
                                begin

                                        MoveDraught (gms, 0, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 0, 1, curPl)
                                end;

                                if not right then //вправо
                                begin
                                        MoveDraught (gms, 0, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 0, -1, curPl)
                                end;

                                if not up then //вверх
                                begin
                                        MoveDraught (gms, -1, 0, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, 0, curPl)
                                end
                        end
                end
                else if OpRight (gms, curPl, curOp) then
                begin
                        if right then
                                if up then //можем cходить вниз вправо
                                begin
                                        MoveDraught (gms, 1, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, -1, curPl)
                                end
                                else if down then //можем сходить вверх вправо
                                begin
                                        MoveDraught (gms, -1, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, -1, curPl)
                                end
                                else //можем сходить и туда и туда
                                begin
                                        MoveDraught (gms, 1, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, -1, curPl);

                                        MoveDraught (gms, -1, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, -1, curPl)
                                end
                        else //можем сходить на 2 клетки вправо
                        begin
                                MoveDraught (gms, 0, 2, curPl);
                                Turn (gms, turncnt + 1);
                                MoveDraught (gms, 0, -2, curPl)
                        end;

                        with gms.field[curPl[1], curPl[2]] do
                        begin
                                if not right then //вправо
                                begin
                                        MoveDraught (gms, 0, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 0, -1, curPl)
                                end;

                                if not down then //вниз
                                begin
                                        MoveDraught (gms, 1, 0, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, 0, curPl)
                                end;

                                if not up then //вверх
                                begin
                                        MoveDraught (gms, -1, 0, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, 0, curPl)
                                end
                        end
                end
                else if OpLeft (gms, curPl, curOp) then
                begin
                        if left then
                                if up then //можем сходить вниз влево
                                begin
                                        MoveDraught (gms, 1, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, 1, curPl)
                                end
                                else if down then //можем сходить вверх вправо
                                begin
                                        MoveDraught (gms, -1, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, 1, curPl)
                                end
                                else //можем сходить и туда и туда
                                begin
                                        MoveDraught (gms, 1, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, 1, curPl);

                                        MoveDraught (gms, -1, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, 1, curPl)
                                end
                        else //можем сходить на 2 клетки вправо
                        begin
                                MoveDraught (gms, 0, -2, curPl);
                                Turn (gms, turncnt + 1);
                                MoveDraught (gms, 0, 2, curPl)
                        end;

                        with gms.field[curPl[1], curPl[2]] do
                        begin
                                if not right then //вправо
                                begin
                                        MoveDraught (gms, 0, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 0, -1, curPl)
                                end;

                                if not down then //вниз
                                begin
                                        MoveDraught (gms, 1, 0, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, 0, curPl)
                                end;

                                if not up then //вверх
                                begin
                                        MoveDraught (gms, -1, 0, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, 0, curPl)
                                end
                        end
                end
        else
                with gms.field[curPl[1], curPl[2]] do
                        begin
                                if not left then //влево
                                begin
                                        MoveDraught (gms, 0, -1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 0, 1, curPl)
                                end;

                                if not right then //вправо
                                begin
                                        MoveDraught (gms, 0, 1, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 0, -1, curPl)
                                end;

                                if not down then //вниз
                                begin
                                        MoveDraught (gms, 1, 0, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, -1, 0, curPl)
                                end;

                                if not up then //вверх
                                begin
                                        MoveDraught (gms, -1, 0, curPl);
                                        Turn (gms, turncnt + 1);
                                        MoveDraught (gms, 1, 0, curPl)
                                end
                        end
end;

procedure BestMove (var max: Real; var move, maxmove: TMove);

begin
        if cost > max then
        begin
                max := cost;
                maxmove := move;
        end;
end;

procedure MoveDraughtGM (var gms: TGameState; var turncnt: Integer; var max: Real; down, up: Integer; var move, maxmove: TMove);

begin
        MoveDraught (gms, down, up, gms.me);
        ChangeMove(move, DRAUGHT, gms.me[1], gms.me[2], 0, 0);
        Turn (gms, turncnt);
        BestMove (max, move, maxmove);

        down := -1 * down;
        up := -1 * up;

        MoveDraught (gms, down, up, gms.me)
end;

procedure GetMove (gms: TGameState; var move: TMove);

var
        maxmove: TMove;
        turncnt, i, j, k: Integer;
        max: Real;

begin
        turncnt := 1;
        max := -1000; { -infinity}

        Bfs (gms, mest, opst);

        for i := 1 to 5 do
                move[i] := 0;

        for i := 1 to SIZE - 1 do
                for j := 1 to SIZE - 1 do
                begin
                        if (PerpAmount > 0) and noPerp (gms, i, j) and SmartPlace (gms, i, j, 1) then //HOR
                                begin
                                        InitWall(gms, i, j, 1, TRUE, PerpAmount);
                                        ChangeMove(move, PARTITION, i, j, i + 1, j);
                                        Turn (gms, turncnt);
                                        BestMove (max, move, maxmove);

                                        InitWall(gms, i, j, 1, FALSE, PerpAmount);
                                        RedoWalls(gms)
                                end;

                        if (PerpAmount > 0) and noPerp (gms, i, j) and SmartPlace (gms, i, j, 2) then //VERT
                                begin
                                        InitWall(gms, i, j, 2, TRUE, PerpAmount);

                                        ChangeMove(move, PARTITION, i, j, i, j + 1);
                                        Turn (gms, turncnt);
                                        BestMove (max, move, maxmove);

                                        InitWall(gms, i, j, 2, FALSE, PerpAmount);
                                        RedoWalls(gms)
                                end
                end;

        with gms.field[gms.op[1], gms.op[2]] do
                if OpUp (gms, gms.me, gms.op) then
                begin
                        if up then
                                if left then
                                begin
                                        if not right then
                                                MoveDraughtGM (gms, turncnt, max, -1, 1, move, maxmove) //вверх вправо
                                end
                                else if right then
                                begin
                                        if not left then
                                                MoveDraughtGM (gms, turncnt, max, -1, -1, move, maxmove) //вверх влево
                                end
                                else
                                begin
                                        MoveDraughtGM (gms, turncnt, max, -1, 1, move, maxmove); //вверх вправо
                                        MoveDraughtGM (gms, turncnt, max, -1, -1, move, maxmove) //вверх влево
                                end
                        else
                                MoveDraughtGM (gms, turncnt, max, -2, 0, move, maxmove); //2 клетки вверх

                        with gms.field[gms.me[1], gms.me[2]] do
                        begin
                                if not left then
                                        MoveDraughtGM (gms, turncnt, max, 0, -1, move, maxmove); //влево

                                if not right then
                                        MoveDraughtGM (gms, turncnt, max, 0, 1, move, maxmove); //вправо

                                if not down then
                                        MoveDraughtGM (gms, turncnt, max, 1, 0, move, maxmove); //вниз
                        end
                end
                else if OpDown (gms, gms.me, gms.op) then
                begin
                        if down then
                                if left then
                                begin
                                        if not right then
                                                MoveDraughtGM (gms, turncnt, max, 1, 1, move, maxmove) //вниз вправо
                                end
                                else if right then
                                begin
                                        if not left then
                                                MoveDraughtGM (gms, turncnt, max, 1, -1, move, maxmove) //вниз влево
                                end
                                else
                                begin
                                        MoveDraughtGM (gms, turncnt, max, 1, 1, move, maxmove); //вниз вправо
                                        MoveDraughtGM (gms, turncnt, max, 1, -1, move, maxmove) //вниз влево
                                end
                        else
                                MoveDraughtGM (gms, turncnt, max, 2, 0, move, maxmove); //2 клетки вниз

                        with gms.field[gms.me[1], gms.me[2]] do
                        begin
                                if not left then
                                        MoveDraughtGM (gms, turncnt, max, 0, -1, move, maxmove); //влево

                                if not right then
                                        MoveDraughtGM (gms, turncnt, max, 0, 1, move, maxmove); //вправо

                                if not up then
                                        MoveDraughtGM (gms, turncnt, max, -1, 0, move, maxmove) //вправо
                        end
                end
                else if OpRight (gms, gms.me, gms.op) then
                begin
                        if right then
                                if up then
                                begin
                                        if not down then
                                                MoveDraughtGM (gms, turncnt, max, 1, 1, move, maxmove) //вниз вправо
                                end
                                else if down then
                                begin
                                        if not up then
                                                MoveDraughtGM (gms, turncnt, max, -1, 1, move, maxmove) //вверх вправо
                                end
                                else
                                begin
                                        MoveDraughtGM (gms, turncnt, max, 1, 1, move, maxmove); //вниз вправо
                                        MoveDraughtGM (gms, turncnt, max, -1, 1, move, maxmove) //вверх вправо
                                end
                        else
                                MoveDraughtGM (gms, turncnt, max, 0, 2, move, maxmove); //2 клетки вправо

                        with gms.field[gms.me[1], gms.me[2]] do
                        begin
                                if not right then
                                        MoveDraughtGM (gms, turncnt, max, 0, 1, move, maxmove); //вправо

                                if not down then
                                        MoveDraughtGM (gms, turncnt, max, 1, 0, move, maxmove); //вниз

                                if not up then
                                        MoveDraughtGM (gms, turncnt, max, -1, 0, move, maxmove) //вверх
                        end
                end
                else if OpLeft (gms, gms.me, gms.op) then
                begin
                        if left then
                                if up then
                                begin
                                        if not down then
                                                MoveDraughtGM (gms, turncnt, max, 1, -1, move, maxmove) //вниз влево
                                end
                                else if down then
                                begin
                                        if not up then
                                                MoveDraughtGM (gms, turncnt, max, -1, -1, move, maxmove) //вверх вправо
                                end
                                else
                                begin
                                        MoveDraughtGM (gms, turncnt, max, 1, -1, move, maxmove); //вниз влево
                                        MoveDraughtGM (gms, turncnt, max, -1, -1, move, maxmove) //вверх вправо
                                end
                        else
                                MoveDraughtGM (gms, turncnt, max, 0, -2, move, maxmove); //2 клетки влево

                        with gms.field[gms.me[1], gms.me[2]] do
                        begin
                                if not right then
                                        MoveDraughtGM (gms, turncnt, max, 0, 1, move, maxmove); //вправо

                                if not down then
                                        MoveDraughtGM (gms, turncnt, max, 1, 0, move, maxmove); //вниз

                                if not up then
                                        MoveDraughtGM (gms, turncnt, max, -1, 0, move, maxmove) //вверх
                        end
                end
        else
                with gms.field[gms.me[1], gms.me[2]] do
                        begin
                                if not left then
                                        MoveDraughtGM (gms, turncnt, max, 0, -1, move, maxmove); //влево

                                if not right then
                                        MoveDraughtGM (gms, turncnt, max, 0, 1, move, maxmove); //вправо

                                if not down then
                                        MoveDraughtGM (gms, turncnt, max, 1, 0, move, maxmove); //вниз

                                if not up then
                                        MoveDraughtGM (gms, turncnt, max, -1, 0, move, maxmove) //вверх
                        end;

        move := maxmove
end;
