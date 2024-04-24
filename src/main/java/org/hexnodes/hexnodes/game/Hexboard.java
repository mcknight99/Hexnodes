package org.hexnodes.hexnodes.game;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

// HexboardHashMap class definition
public class Hexboard extends AbsHexboard {
    // Additional Point class definition
    public static class Point {
        public int x, y;

        public Point(int x, int y) {
            this.x = x;
            this.y = y;
        }


        public boolean equals(Object obj) {
            if (this == obj) {
                return true;
            }
            if (obj == null || getClass() != obj.getClass()) {
                return false;
            }
            Point other = (Point) obj;
            return x == other.x && y == other.y;
        }


        public int hashCode() {
            return Objects.hash(x, y);
        }
    }

    public Hexboard() {
        this.board = new HashMap<>();
    }

    @Override
    public Map<Hexboard.Point, Node> getBoard() {
        return new HashMap<>(board);
    }

    @Override
    public Node getNodeAtPosition(Hexboard.Point position) {
        return board.getOrDefault(position, null);
    }

    @Override
    public Map<Hexboard.Point, Node> scanSurroundingNodes(Hexboard.Point position) {
        // Implementation goes here
        return null;
    }

    @Override
    public void setNodeAtPosition(Hexboard.Point position, Node node) {
        board.put(position, node);
    }
}
