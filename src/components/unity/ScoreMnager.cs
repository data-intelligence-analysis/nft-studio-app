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
