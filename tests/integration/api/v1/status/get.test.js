test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  // console.log(JSON.stringify(responseBody, null, 2));

  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdateAt);

  const responseDatabase = responseBody.dependencies.database;

  const databaseVersion = responseDatabase.version;
  expect(responseDatabase.version).toBeDefined();
  expect(responseDatabase.version).toEqual(databaseVersion);

  const dbMaxConnections = parseInt(responseDatabase.max_connections);
  expect(responseDatabase.max_connections).toBeDefined();
  expect(responseDatabase.max_connections).toEqual(dbMaxConnections);

  const dbConnectionsUsed = parseInt(responseDatabase.opened_connections);
  expect(responseDatabase.opened_connections).toBeDefined();
  expect(responseDatabase.opened_connections).toEqual(dbConnectionsUsed);
});
