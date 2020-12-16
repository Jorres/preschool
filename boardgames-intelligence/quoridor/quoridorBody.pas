program Quoridor;

const
        SIZE = 9;
        EMPTY = -1;
        MOVEOVER = 160;
        FIRST = 0;
        SECOND = 1;
        LETTER = 64;
        DIGIT = 48;
        DRAUGHT = 0; //шашка
        PARTITION = 1; //перегородка
        BOTTOM = 5;

type
        TGameField = array [1..SIZE, 1..SIZE] of record
                up: Boolean;
                down: Boolean;
                left: Boolean;
                right: Boolean;
        end;

        TMove = array [1..5] of Integer;

        TPos = array [1..2] of Integer;

        TGameState = record
                field: TGameField;

                move: TMove; //move [type, row1, col1, row2, col2]
                me: TPos;
                op: TPos;

                player: Integer;
                curplayer: Integer;
                movecnt: Integer;
        end;

var
        PerpAmount, EnemyPerpAmount, mest, opst: Integer;
        cntturns: LongInt;
        cost: Real;

procedure RedoWalls (var gms: TGameState);
var
        i: Integer;
begin
        with gms do
        for i := 1 to SIZE do
        begin
                field[1, i].down := TRUE;
                field[9, i].up := TRUE;
                field[i, 1].left := TRUE;
                field[i, 9].right := TRUE;
        end
end;

procedure Init (var gms: TGameState); //работает

var
        t, i, j: Integer;

begin
        PerpAmount := 10;
        EnemyPerpAmount := 10;

        with gms do begin
                FillChar(field, SizeOf(field), FALSE);
                cntturns := 0;

                RedoWalls(gms);

                ReadLn (player);

                if player = FIRST then
                begin
                        op[1] := 9;
                        op[2] := 5;

                        me[1] := 1;
                        me[2] := 5;
                end
                else
                begin
                        me[1] := 9;
                        me[2] := 5;

                        op[1] := 1;
                        op[2] := 5;
                end;

                curplayer := FIRST;
                movecnt := 0;
        end
end;



function someoneWins (const gms: TGameState): Boolean; //работает
var
        i: Integer;
begin
        someoneWins := TRUE;

        with gms do
                if player = FIRST then
                begin
                        if (op[1] = 1) or (me[1] = 9) then
                                Exit
                end
                else if (op[1] = 9) or (me[1] = 1) then
                                Exit;

        someoneWins := FALSE
end;

function isGameOver (const gms: TGameState): Boolean; //работает
begin
        isGameOver := someoneWins (gms) or (gms.movecnt > MOVEOVER)
end;

{$i getmove5SP.inc}

function isMyMove (const gms: TGameState): Boolean;
begin
        isMyMove := gms.curplayer = gms.player
end;

procedure WriteMove (const gms: TGameState); //работает
var
        res: string;
begin
        res := '     ';
        res[1] := Chr(gms.move[3] + LETTER);
        res[2] := Chr(gms.move[2] + DIGIT);
        if  gms.move[1] = 1 then begin
                res[3] := '-';
                res[4] := Chr(gms.move[5] + LETTER);
                res[5] := Chr(gms.move[4] + DIGIT)
        end;

        WriteLn (res);
        WriteLn (cntturns);
        Flush (output)
end;

procedure ReadMove (var gms: TGameState); //работает
var
        CharMove: string;
begin
        with gms do
        begin
                ReadLn (CharMove);

                move[1] := DRAUGHT;
                move[3] := Ord (CharMove[1]) - LETTER;
                move[2] := Ord (CharMove[2]) - DIGIT;

                if Length (CharMove) = 5 then
                begin
                        move[1] := PARTITION;
                        move[5] := Ord (CharMove[4]) - LETTER;
                        move[4] := Ord (CharMove[5]) - DIGIT;
                end
        end

end;

procedure MakeMove (var gms: TGameState); //работает
begin
        with gms do
        begin
                if move[1] = DRAUGHT then
                        if isMyMove (gms) then
                        begin
                                me[1] := move[2];
                                me[2] := move[3];
                        end
                        else
                        begin
                                op[1] := move[2];
                                op[2] := move[3];
                        end
                else
                begin
                        if move[2] = move[4] then // row
                        begin
                                field[move[2], move[3]].up := TRUE;
                                field[move[2], move[5]].up := TRUE;
                                field[move[2] + 1, move[3]].down := TRUE;
                                field[move[2] + 1, move[5]].down := TRUE
                        end
                        else
                        begin
                                field[move[2], move[3]].right := TRUE;
                                field[move[4], move[3]].right := TRUE;
                                field[move[2], move[3] + 1].left := TRUE;
                                field[move[4], move[3] + 1].left := TRUE;
                        end;
                        Dec (PerpAmount)
                end;

                curplayer := 1 - curplayer;
                Inc (movecnt);

                //WriteLn(' ME: ', me[1], ' ', me[2]); // КООРДИНАТЫ ПОШАГОВО
                //WriteLn(' OP: ', op[1], ' ', op[2])
        end
end;

procedure ShowField (const gms: TGameState); //работает
var
        i, j: Integer;
begin
        for i := 9 downto 1 do
        begin
                Write (i, ' ');

                for j := 1 to 9 do
                with gms do
                begin
                        if field[i, j].up then
                                Write('^')
                        else if (i = me[1]) and (j = me[2]) then
                                Write('1')
                        else if (i = op[1]) and (j = op[2]) then
                                Write('2')
                        else
                                Write('.');

                        if field[i, j].right then
                                Write('#')
                        else
                                Write (' ')
                end;
                WriteLn
        end;

        WriteLn ('  A B C D E F G H I')
end;



procedure Game (var gms: TGameState); //работает

var
        i: Integer;

begin
        while not isGameOver (gms) do begin
                if isMyMove (gms) then begin
                        GetMove (gms, gms.move);
                        WriteMove (gms);
                end
                else
                        ReadMove (gms);

                MakeMove (gms);
                ShowField (gms)
        end
end;

var
        gms: TGameState;
begin
        Init (gms);
        ShowField (gms);
        Game (gms)
end.
