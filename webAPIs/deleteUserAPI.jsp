<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates StringData Object with all fields "" (empty string, no nulls)
    StringData sd = new StringData(); // we really only need the errorMsg property of object sd... 

    String idToDelete = request.getParameter("deleteId");
    if (idToDelete == null) {
        sd.errorMsg = "Cannot delete - need URL parameter 'deleteId'";
    } else {

        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (sd.errorMsg.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call delete method");
            sd.errorMsg = DbMods.delete(idToDelete, dbc);
        } else {
            sd.errorMsg = "The database is currently unavailable. Please try later or contact support.";
        }
        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.

    }

    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(sd));
%>