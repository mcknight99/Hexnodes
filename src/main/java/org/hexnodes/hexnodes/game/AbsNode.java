package org.hexnodes.hexnodes.game;

import java.util.ArrayList;

public class AbsNode implements INode {
    protected AspectEnum nodeAspect;
    protected ArrayList<AspectEnum> nodeConstructs;
    @Override
    public String toString() {
        return "Aspect " + nodeAspect + " is made of Constructs " + nodeConstructs;
    }
}
