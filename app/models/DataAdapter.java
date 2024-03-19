package models;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

public class DataAdapter {
    public SQLServerDataSource getDataSource() {
        SQLServerDataSource ds = new SQLServerDataSource();

        ds.setUser("Liliana");
        ds.setPassword("123");
        ds.setServerName("DESKTOP-FR1QTFI\\SQLEXPRESS");
        ds.setPortNumber(1433);
        ds.setDatabaseName("JavaPlayLogin");
        ds.setTrustServerCertificate(true);

        return ds;
    }
}
