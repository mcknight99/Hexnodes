package org.hexnodes.hexnodes.controllers;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import org.hexnodes.hexnodes.Main;

import java.io.IOException;

public class MainController {
    @FXML
    private AnchorPane helloAnchorPane;

    @FXML
    private Button tab1button;

    @FXML
    public void handleButtonAction() throws IOException {
        System.out.println("yippee");
        FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("puzzle-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 640, 480);
    }

}