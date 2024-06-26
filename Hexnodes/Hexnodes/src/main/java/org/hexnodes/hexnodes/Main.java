package org.hexnodes.hexnodes;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;
import org.hexnodes.hexnodes.game.AspectEnum;
import org.hexnodes.hexnodes.game.Hexboard;
import org.hexnodes.hexnodes.game.Node;

import java.io.IOException;

public class Main extends Application {

    public static void main(String[] args) {
        Hexboard b = new Hexboard();

        System.out.println(b);
        b.setNodeAtPosition(new Hexboard.Point(3,3), new Node(AspectEnum.AER));
        System.out.println(b);
        b.setNodeAtPosition(new Hexboard.Point(4,4), new Node(AspectEnum.VACUOS, new AspectEnum[]{AspectEnum.AER, AspectEnum.PERFODIO}));
        System.out.println(b);
        b.setNodeAtPosition(new Hexboard.Point(3,3), new Node(AspectEnum.PERFODIO));
        System.out.println(b);
        System.out.println(b.getNodeAtPosition(new Hexboard.Point(3,3)));

        launch();
    }
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("main-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 640, 480);
        stage.setTitle("Hexnodes");
        stage.setScene(scene);
        stage.show();
    }
}