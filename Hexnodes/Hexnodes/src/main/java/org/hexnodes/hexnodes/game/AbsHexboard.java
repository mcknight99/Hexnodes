package org.hexnodes.hexnodes.game;

import java.util.Map;

public abstract class AbsHexboard implements IHexboard{
    //private final int numRows;
    //private final int numCols;
    protected Map<Hexboard.Point, Node> board;
    @Override
    public String toString() {
        return board.toString();
    }
};