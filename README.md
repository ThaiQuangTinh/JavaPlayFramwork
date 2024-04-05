# Demo installation guide.

1. Download stb buid tool at [link](https://www.scala-sbt.org/download/)
1. Create database use databasescript.sql file in public/databasescript.
1. Setup SQL Server according to the following video instruction [video](https://www.youtube.com/watch?v=RF-_vchtV58).
1. Edit the parameters in the models/DataAdapter.java file according to the SQL Server settings in the above step.
1. Open Terminal and run command: sbt run
1. Open browser an enter URL http://localhost:9000
1. See results
