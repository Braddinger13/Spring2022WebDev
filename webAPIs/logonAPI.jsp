<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData webUserObj = new StringData();
    String email = request.getParameter("userEmail");
    String password = request.getParameter("userPassword");
    if ((email == null) || (password == null)) {
        webUserObj.errorMsg = "Cannot search for user - 'userEmail' and 'userPassword' must be supplied";
    } else {
        DbConn dbc = new DbConn();
        webUserObj.errorMsg = dbc.getErr();
        if (webUserObj.errorMsg.length() == 0) {
            System.out.println("*** Ready to call DbMods.findEmailAndPass");
            webUserObj = DbMods.findEmailAndPass(dbc, email, password);

            if (webUserObj.errorMsg.length() == 0) {
                //write to session
                session.setAttribute("loggedOnUser", webUserObj);
            } else {
                session.invalidate();
            }
        }
        dbc.close();
    }
    Gson gson = new Gson();
    out.print(gson.toJson(webUserObj).trim());
%>
