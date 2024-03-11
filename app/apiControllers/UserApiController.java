package apiControllers;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import play.mvc.*;

import java.sql.*;

import models.DataAdapter;

public class UserApiController extends Controller {

    private final DataAdapter da = new DataAdapter();

    public Result isValidUser(Http.Request request) {
        String username = request.getQueryString("username");
        String password = request.getQueryString("password");
        SQLServerDataSource ds = da.getConnnection();

        try (Connection conn = ds.getConnection()) {
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
            throw new RuntimeException(e);
        }
    }

}
