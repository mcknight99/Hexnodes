package org.hexnodes.hexnodes.game;

import java.util.Map;

// Hexboard interface definition
public interface IHexboard {
    Map<Hexboard.Point, Node> getBoard();

    Node getNodeAtPosition(Hexboard.Point position);

    Map<Hexboard.Point, Node> scanSurroundingNodes(Hexboard.Point position);

    void setNodeAtPosition(Hexboard.Point position, Node node);
}