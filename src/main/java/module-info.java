module org.hexnodes.hexnodes {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.web;

    requires org.controlsfx.controls;
    requires org.kordamp.ikonli.javafx;
    requires eu.hansolo.tilesfx;
    requires com.almasb.fxgl.all;

    opens org.hexnodes.hexnodes to javafx.fxml;
    exports org.hexnodes.hexnodes;
    exports org.hexnodes.hexnodes.controllers;
    opens org.hexnodes.hexnodes.controllers to javafx.fxml;
    exports org.hexnodes.hexnodes.game;
    opens org.hexnodes.hexnodes.game to javafx.fxml;
}