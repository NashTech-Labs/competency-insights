# Feed Service
The Feeds Service processes an Excel file containing Nasher information, such as OKR own contribution and team contribution, from the UI. It then saves this data to the firestore and Pub-Sub topic ~~Snowflake RAW table~~. This service manages the import of Nasher-related data from an Excel file, handling the extraction and storage process in the designated Snowflake table.

### Excel File Acceptable Headers And Orders
Please ensure that the Excel file includes the following headers and maintains the specified order.

```
1-Employee Number | 2-Full Name | 3-Email | 4-Jop Title | 5-Reporting Manager | 6-GitHub User

```

### Swagger UI for Test Rest-Endpoint
Test with Swagger: Run feed-service, and access the swagger UI at http://localhost:8082/swagger-ui.html. You’ll see the /upload endpoint, where you can test file uploads.