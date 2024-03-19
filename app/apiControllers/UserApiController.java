package apiControllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import play.libs.Json;
import play.mvc.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import models.DataAdapter;

public class UserApiController extends Controller {

    private final DataAdapter da = new DataAdapter();

    public Result isValidUser(Http.Request request) {
        JsonNode json = request.body().asJson();

        if (json == null || !json.has("username") || !json.has("password")) {
            return badRequest("Invalid JSON data");
        }

        String username = json.get("username").asText();
        String password = json.get("password").asText();

        try (Connection conn = da.getDataSource().getConnection()) {
            String sqlQuery = "SELECT Username, Password FROM UserAccount WHERE Username = ? AND Password = ?";
            try (PreparedStatement statement = conn.prepareStatement(sqlQuery)) {
                statement.setString(1, username);
                statement.setString(2, password);

                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        return ok("true");
                    } else {
                        return ok("false");
                    }
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return internalServerError("Internal Server Error");
        }
    }
}
