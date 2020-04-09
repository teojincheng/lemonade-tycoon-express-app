# Lemonade Tycoon NodeJS Backend

Provides game data to the Lemonade Tycoon front end. 

### API routes: 

```
{
  GET /customers : retrieves an array of customer images
  POST /supplies : inserts qty of supply items into database
  DELETE /supplies : deletes all records of supply items in the database
  GET /statistics : retrieves the aggregated profit of the two game days. 
  POST /statistics : inserts the data of selling price and cost price of each cup of lemonade into the database.
  DELETE /statistics : deletes all records of statistics from the database. 
}
```

### npm packages used: 

axios version 0.19.2  
cors version 2.8.5  
dotenv version 8.2.0  
express version 4.17.1  
mongoose version 5.9.1
