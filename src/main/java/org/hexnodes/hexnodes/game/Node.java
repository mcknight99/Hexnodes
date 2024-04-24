package org.hexnodes.hexnodes.game;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// Node class definition
public class Node extends AbsNode {
    // Default constructor
    public Node() {
        this.nodeAspect = null;
        this.nodeConstructs = new ArrayList<>();
    }

    public Node(AspectEnum aspect) {
        this.nodeAspect = aspect;
        this.nodeConstructs = new ArrayList<>();
    }

    // Constructor with ArrayList and AspectEnum
    public Node(AspectEnum aspect, ArrayList<AspectEnum> constructs) {
        this.nodeConstructs = constructs;
        this.nodeAspect = aspect;
    }

    // Constructor with array and AspectEnum
    public Node(AspectEnum aspect, AspectEnum[] constructs) {
        this.nodeConstructs = new ArrayList<>(Arrays.asList(constructs));
        this.nodeAspect = aspect;
    }
    
    public List<AspectEnum> getNodeConstructs() {
        return nodeConstructs;
    }

    
    public AspectEnum getNodeAspect() {
        return nodeAspect;
    }

    
    public void setNodeConstructs(AspectEnum[] constructs) {
        this.nodeConstructs = new ArrayList<>(Arrays.asList(constructs));
    }

    
    public void setNodeConstructs(ArrayList<AspectEnum> constructs) {
        this.nodeConstructs = constructs;
    }

    
    public void setNodeAspect(AspectEnum aspect) {
        this.nodeAspect = aspect;
    }
}

