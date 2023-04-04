using UnityEngine;
using MongoDB.Driver;

public class ScoreManager : MonoBehaviour
{
    public int currentScore = 0;
    public int highestScore = 0;
    public string playerName = "Player1"; // Replace with the actual player name

    // Connect to MongoDB
    MongoClient client;
    IMongoDatabase db;

    void Start()
    {
        client = new MongoClient("mongodb://localhost:27017");
        db = client.GetDatabase("mydb"); // Replace with the actual database name
    }

    void Update()
    {
        // Update current score
        currentScore += 1; // Replace with the actual scoring logic

        // Update highest score if current score surpasses it
        if (currentScore > highestScore)
        {
            highestScore = currentScore;

            // Upload highest score to MongoDB
            var collection = db.GetCollection<BsonDocument>("scores"); // Replace with the actual collection name
            var document = new BsonDocument
            {
                { "playerName", playerName },
                { "score", highestScore }
            };
            collection.InsertOne(document);
        }
    }
}

public class DataRecorder : MonoBehaviour
{
    // Define the data to be recorded
    public float playerX;
    public float playerY;
    public int score;
    public string eventType;

    // Connect to MongoDB
    MongoClient client;
    IMongoDatabase db;

    void Start()
    {
        client = new MongoClient("mongodb://localhost:27017");
        db = client.GetDatabase("mydb"); // Replace with the actual database name
    }

    void Update()
    {
        // Record the data
        playerX = transform.position.x;
        playerY = transform.position.y;
        score = ScoreManager.currentScore; // Assuming ScoreManager is a script that manages the player's score
        eventType = "PlayerMoved"; // Replace with the actual event type

        // Upload the data to MongoDB
        var collection = db.GetCollection<BsonDocument>("gameData"); // Replace with the actual collection name
        var document = new BsonDocument
        {
            { "playerX", playerX },
            { "playerY", playerY },
            { "score", score },
            { "eventType", eventType },
            { "timestamp", DateTime.UtcNow }
        };
        collection.InsertOne(document);
    }
}
