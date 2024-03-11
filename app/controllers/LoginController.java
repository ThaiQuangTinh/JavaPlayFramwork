package controllers;

import play.mvc.*;

import java.util.Map;

public class LoginController extends Controller {
    public Result loginForm() {
        return ok(views.html.login.render());
    }

    public Result helloUserForm(Http.Request request) {
        return ok(views.html.helloUser.render(request));
    }
    
    public Result submit(Http.Request request) {
        Map<String, String[]> formParams = request.body().asFormUrlEncoded();

        String username = formParams.get("username")[0];
        String password = formParams.get("password")[0];

        // Set session
        Http.Session usernameSession = request.session().adding("username", username);

        return redirect("/helloUser").withSession(usernameSession);
    }


}
